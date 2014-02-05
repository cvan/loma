define('views/search',
       ['cache', 'dom', 'pages', 'templating', 'utils', 'worker'],
       function(cache, $, pages, templating, utils, worker) {
  cache = new cache();
  var GET;
  var indexed = index();
  var q;
  var previousQuery = null;
  var previousResults = null;
  var timeStart;

  if (document.body.classList.contains('results')) {
    search();
  }

  function eq(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function index() {
    var promise = new Promise(function(resolve, reject) {
      worker.addEventListener('message', function(e) {
        switch (e.data.type) {
          case 'indexed':
            return resolve();
          case 'results':
            return renderResults(e.data.data);
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

  function search() {
    timeStart = performance.now();

    var query = q.value || '';

    if (previousQuery === query) {
      // Bail if the query hasn't changed.
      return;
    }
    previousQuery = query;

    console.log('Queueing search for "' + query + '"');

    if (cache.exists(query)) {
      console.log('Searching cache for "' + query + '"');
      var results = cache.get(query);
      results.timeStart = timeStart;
      renderResults(results);
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

  function reset() {
    if (!q) {
      q = $('input[name=q');
    }
    q.value = previousQuery = previousResults = null;
  }

  function renderResults(data) {
    console.log('Rendering results');

    data.timing = performance.now() - data.timeStart;

    q = $('input[name=q');

    // Update location bar based on search term.
    GET = utils.parseQueryString();
    GET.q = q.value || '';
    var serialized = utils.serialize(GET);
    var dest = serialized ? ('/?' + serialized) : '/';
    if (window.location.href !== dest) {
      window.history.replaceState({}, pages.getTitle('/'), dest);
    }

    templating.render('results-header', {data: data}, function(res) {
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
      templating.render('results', {data: data}, function(res) {
        $('main ol').innerHTML = res;
      });
    }

    if (!cache.exists(data.query)) {
      console.log('Caching "' + data.query + '"');
      cache.set(data.query, data);
    }

    previousResults = data;
  }

  function init() {
    GET = utils.parseQueryString();
    reset();
    if (GET.q) {
      q.value = GET.q;
    }

    if (document.body.classList.contains('results')) {
      search();
    }
    templating.render('browse', function(res) {
      $('main').innerHTML = res;
      indexed.then(function() {
        document.body.setAttribute('class', 'results');
        search();
      });
    });
  }

  $.delegate('input', 'input[name=q]', function() {
    search();
  }, false);
  $.delegate('submit', '.form-search', function(e) {
    e.preventDefault();
    search();
  });

  return {
    index: index,
    init: init,
    renderResults: renderResults,
    reset: reset
  };
});
