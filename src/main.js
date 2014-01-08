(function() {

var qsDebug = /[\?&]debug=([\w\-]+)/i.exec(window.location.search);
qsDebug = (qsDebug ? qsDebug[1] : '').toLowerCase();
if (qsDebug) {
  window.location.href = 'debug.html';
}

_.templateSettings = {
  evaluate: /\{%([\s\S]+?)%\}/g,
  interpolate: /\{\{([\s\S]+?)\}\}/g,
  escape: /\{\{-([\s\S]+?)\}\}/g,
  imports: {
    pluralise: function(str, length, pluralStr) {
      pluralStr = pluralStr || (str + 's');
      return length === 1 ? str : pluralStr;
    }
  },
  variable: 'data'
};

function log() {
  console.log(Array.prototype.slice.call(arguments, 0).join(' '));
}

var methods = {
  'log': log,
  'loaded': run,
  'results': renderResults
};

var worker = new Worker('lib/worker.js');
worker.addEventListener('message', function(e) {
  methods[e.data.type](e.data.data);
});
worker.postMessage({
  type: 'run',
  data: {
    url: '/src/data/app-processed-docs.json',
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

$ = function(selector) {
  return document.querySelector(selector);
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

var form = $('form');
var q = $('[name=q]');

form.addEventListener('keyup', search, false);
form.addEventListener('paste', search, false);
form.addEventListener('search', search, false);
form.addEventListener('submit', function(e) {
  e.preventDefault();
}, false);

function run() {
  var qsSearch = /[\?&]search=([\w\-]+)/i.exec(window.location.search);
  q.value = (qsSearch ? qsSearch[1] : '').toLowerCase();
  search();
}

var previousQuery = null;

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

var templatesCache = new Cache();

function render(name, data) {
  if (templatesCache.exists(name)) {
    var html = templatesCache.get(name);
  } else {
    var html = $('#template-' + name).innerHTML;
    templatesCache.set(name, html);
  }
  return _.template(html, data);
}

function renderResults(data) {
  if (!cache.exists(data.query)) {
    console.log('Caching "' + data.query + '"');
    cache.set(data.query, data);
  }

  console.log('Rendering results');

  data.timing = performance.now() - data.timeStart;
  $('.results h1').innerHTML = render('heading', data);

  var resultsHTML = '';
  data.results.forEach(function(item) {
    resultsHTML += render('result', item);
  });
  $('.results ol').innerHTML = resultsHTML;
}

})();
