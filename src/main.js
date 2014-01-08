(function() {

var qsDebug = /[\?&]debug=([\w\-]+)/i.exec(window.location.search);
qsDebug = (qsDebug ? qsDebug[1] : '').toLowerCase();
if (qsDebug) {
  window.location.href = 'debug.html';
}

_.templateSettings.imports = {};
_.templateSettings.variable = 'data';

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
    url: '/src/data/app-processed-docs.json'
  }
});

$ = function(selector) {
  return document.querySelector(selector);
};

var form = $('form');
var q = $('[name=q]');
var results = $('.results');
var resultsHeading = $('.results h1');
var resultsList = $('.results ol');

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

function search(e, query) {
  query = query || q.value || '';
  console.log('Queueing search for "' + query + '"');
  worker.postMessage({
    type: 'search',
    data: {
      query: query,
      timeStart: performance.now()
    }
  });
  // TODO: Use `replaceState` to update `q` querystring parameter.
}

function renderResults(data) {
  console.log('Rendering results');
  var html = '';
  data.results.forEach(function(result) {
    html += '<li><pre><code>' + JSON.stringify(result.doc, null, 2) +
            '</code></pre>';
    if (result.score) {
      html += '<div class="score">Score: ' + result.score.toFixed(8) +
              '</div>';
    }
    html += '</li>';
  });
  resultsHeading.innerHTML = data.results.length + ' result' +
                             (data.results.length === 1 ? '' : 's');
  if (data.query) {
    resultsHeading.innerHTML += ' for &ldquo;' + data.query + '&rdquo;';
  }
  var time = (performance.now() - data.timeStart);
  resultsHeading.innerHTML += ' <span class="speed">(took ' +
                              (time / 1000).toFixed(8) +
                              's)</span>';
  resultsList.innerHTML = html;
}

})();
