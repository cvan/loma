define('worker', ['log'], function(log) {
  var methods = {
    'log': log.log
  };

  var worker = new Worker('lib/worker.js');
  worker.addEventListener('message', function(e) {
    if (e.data.type in methods) {
      methods[e.data.type](e.data.data);
    }
  });

  return worker;
});
