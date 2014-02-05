define('log', [], function() {
  function log() {
    console.log(Array.prototype.slice.call(arguments, 0).join(' '));
  }
  return {
    log: log
  };
});
