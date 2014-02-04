(function() {

function $(sel) {
  if (!sel) {
    return document.body;
  }
  var r = document.querySelectorAll(sel);
  return r.length == 1 ? r[0] : Array.prototype.slice.call(r);
}

$.matches = function(el, sel) {
  var matchesSelector = el.webkitMatchesSelector || el.mozMatchesSelector ||
                        el.oMatchesSelector || el.matchesSelector;
  return matchesSelector.call(el, sel);
};

$.delegate = function(type, sel, handler) {
  document.addEventListener(type, function(e) {
    var parent = e.target;
    while (parent && parent !== document) {
      if ($.matches(parent, sel)) {
        handler(e);
      }
      parent = parent.parentNode;
    }
  }, false);
};

function parseQueryString(qs) {
  if (!qs) {
    qs = window.location.search.substr(1);
  }
  var chunks;
  var result = {};
  qs.split('&').forEach(function(val) {
    chunks = val.split('=');
    if (chunks[0]) {
      result[chunks[0]] = decodeURIComponent(chunks[1] || '');
    }
  });
  return result;
}

function serialize(obj) {
  var qs = [];
  Object.keys(obj).forEach(function(key) {
    if (obj[key]) {
      qs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  });
  return qs.join('&');
}

var GET = parseQueryString();

var titles = {
  '/': 'Mobile sites',
  '/search': 'Search',
  '/submit': 'Submit'
};

var views = {};

var app = new routes();

app.load = function(url) {
  window.history.pushState(undefined, getTitle(url), url);

  // We must have the exact pathname (no querystring parameters, etc.).
  var path = getPath(url);
  if (url !== path) {
    url = path;
  }

  app.test(url);
};

app.get('/', function(req) {
  GET = parseQueryString();
  document.title = getTitle(req.url);
  views.search();
});

app.get('/submit', function(req) {
  document.title = getTitle(req.url);
  views.submit();
});

function parseLink(url) {
  var a = document.createElement('a');
  a.href = url;
  return a;
}

function getPath(url) {
  return parseLink(url).pathname;
}

function getTitle(pathname) {
  return (titles[pathname] || titles['/']) + ' | loma';
}

$.delegate('click', 'a[href^="/"]', function(e) {
  e.preventDefault();
  app.load(e.target.getAttribute('href'));
});

if (GET.debug) {
  window.location.href = 'debug.html';
}

function log() {
  console.log(Array.prototype.slice.call(arguments, 0).join(' '));
}

views.search = function searchView() {
  if (document.body.classList.contains('results')) {
    search();
  }

  render('browse', function(res) {
    $('main').innerHTML = res;
    indexed.then(function() {
      document.body.setAttribute('class', 'results');
      search();
    });
  });
};

views.submit = function submitView() {
  resetSearch();
  document.body.setAttribute('class', 'submit');
  render('submit', function(res) {
    $('main').innerHTML = res;
  });
};

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

var q = $('input[name=q]');
q.value = GET.q || '';
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
  if (typeof ctx === 'function') {
    cb = ctx;
    ctx = {};
  }
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

  // Update location bar based on search term.
  GET.q = q.value || '';
  var serialized = serialize(GET);
  var dest = serialized ? ('/?' + serialized) : '/';
  if (window.location.href !== dest) {
    window.history.replaceState({}, getTitle('/'), dest);
  }

  render('results-header', {data: data}, function(res) {
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
  }

  if (!cache.exists(data.query)) {
    console.log('Caching "' + data.query + '"');
    cache.set(data.query, data);
  }

  previousResults = data;
}

function resetSearch() {
  q.value = previousQuery = previousResults = null;
}

$.delegate('input', 'input[name=q]', function() {
  search();
}, false);
$.delegate('submit', '.form-search', function(e) {
  e.preventDefault();
  search();
});
$.delegate('keypress', 'body:not(.results) input[name=q]', function(e) {
  app.load('/');
});

var methods = {
  'log': log,
  'results': renderResults
};

var worker;

function index() {
  var promise = new Promise(function(resolve, reject) {
    worker = new Worker('lib/worker.js');
    worker.addEventListener('message', function(e) {
      if (e.data.type === 'indexed') {
        resolve();
      } else {
        methods[e.data.type](e.data.data);
      }
    });
    worker.postMessage({
      type: 'index',
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
  });
  return promise;
}

var indexed = index();

render('header', function(res) {
  $('.header').innerHTML = res;
  q = $('input[name=q]');
  q.value = GET.q || '';
});

})();
