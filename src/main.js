(function() {

var views = {};

var app = new routes();

app.get('/', function(req) {
  views.search();
});

app.get('/search', function(req) {
  views.search();
});


var qsDebug = /[\?&]debug=([\w\-]+)/i.exec(window.location.search);
qsDebug = qsDebug && qsDebug[1];
if (qsDebug) {
  window.location.href = 'debug.html';
}

function log() {
  console.log(Array.prototype.slice.call(arguments, 0).join(' '));
}

var methods = {
  'log': log,
  'loaded': run,
  'results': renderResults
};

var worker;

views.search = function searchView() {
  document.body.setAttribute('class', 'results');
  worker = new Worker('lib/worker.js');
  worker.addEventListener('message', function(e) {
    methods[e.data.type](e.data.data);
  });
  worker.postMessage({
    type: 'run',
    data: {
      url: '../data/app-processed-docs.json',
      fields: {
        app_url: {boost: 25},
        slug: {boost: 20},
        name: {boost: 20},
        html_title: {boost: 17},
        meta_keywords: {boost: 15},
        keywords: {boost: 14},
        category: {boost: 10},
        meta_description: {boost: 10}
      },
      ref: '_id'
    }
  });
}

function $(selector) {
  return document.querySelector(selector);
}

function Cache() {
  var _cache = {};
  function _key(value) {
    return encodeURIComponent(value);
  }
  return {
    get: function(key) {
      return _cache[_key(key)];
    },
    exists: function(key) {
      return _key(key) in _cache;
    },
    set: function(key, value) {
      return _cache[_key(key)] = value;
    }
  };
}
var cache = new Cache();

var q = $('[name=q]');
var qsSearch = /[\?&]q=([\w\-]+)/i.exec(window.location.search);
q.value = qsSearch ? qsSearch[1] : '';

function run() {
  var form = $('form');
  form.addEventListener('keyup', search, false);
  form.addEventListener('paste', search, false);
  form.addEventListener('search', search, false);
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  }, false);

  search();
}

var previousQuery = null;
var previousResults = null;

function search(e, query) {
  var timeStart = performance.now();
  query = query || q.value || '';

  if (previousQuery === query) {
    // Bail if the query hasn't changed.
    return;
  }
  previousQuery = query;

  console.log('Queueing search for "' + query + '"');

  if (cache.exists(query)) {
    log('Searching cache for "' + query + '"');
    var results = cache.get(query);
    results.timeStart = timeStart;
    methods.results(results);
  } else {
    worker.postMessage({
      type: 'search',
      data: {
        query: query,
        timeStart: timeStart
      }
    });
  }
}

var env = nunjucks.configure('src/templates', {autoescape: true});
var envGlobals = nunjucks.require('globals');
env.addFunction = function(name, func) {
  envGlobals[name] = func;
};

env.addFunction('pluralise', function(str, length, pluralStr) {
  // TODO: Add real ngettext (issue #2).
  pluralStr = pluralStr || (str + 's');
  return length === 1 ? str : pluralStr;
});

function render(name, ctx, cb) {
  return env.render(name + '.html', ctx, function(err, res) {
    if (err) {
      return console.error(err);
    }
    cb(res);
  });
}

function eq(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function renderResults(data) {
  console.log('Rendering results');

  data.timing = performance.now() - data.timeStart;

  render('header', {data: data}, function(res) {
    $('main header').innerHTML = res;
  });

  var current = data.results.map(function(x) {
    return x.doc._id;
  });

  var previous = previousResults ? previousResults.results.map(function(x) {
    return x.doc._id;
  }) : [];

  if (!eq(current, previous)) {
    // Only re-render results if results have changed.
    render('results', {data: data}, function(res) {
      $('main ol').innerHTML = res;
    });
  } else {
  }

  if (!cache.exists(data.query)) {
    console.log('Caching "' + data.query + '"');
    cache.set(data.query, data);
  }

  previousResults = data;
}

})();
