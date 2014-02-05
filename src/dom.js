define('dom', [], function() {
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

  return $;
});
