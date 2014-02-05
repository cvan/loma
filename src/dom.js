define('dom', ['utils'], function(utils) {
  function $(sel) {
    if (!sel) {
      return $.body;
    }
    var r = document.querySelectorAll(sel);
    return r.length == 1 ? r[0] : Array.prototype.slice.call(r);
  }

  $.doc = document;
  $.body = document.body;
  $.win = window;

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

  function reqResponse(xhr) {
    var data = xhr.responseText;
    if ((xhr.getResponseHeader('Content-Type') || '').split(';', 1)[0].indexOf('json') !== -1) {
      try {
        return JSON.parse(data);
      } catch(e) {
        // Oh well.
        return {};
      }
    }
    return data || null;
  }

  $.post = function(url, params) {
    return new Promise(function(resolve, reject) {
      params = utils.serialize(params || {});

      var xhr = new XMLHttpRequest();
      xhr.open('post', url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(params);

      xhr.addEventListener('load', function() {
        var res = reqResponse(xhr);

        var statusCode = xhr.status;
        if (statusCode < 200 || statusCode > 300) {
          return reject(res, xhr);
        }

        return resolve(res, xhr);
      }, false);
    });
  };

  if (!('CustomEvent' in window)) {
    // For IE 9/10 lol.
    function CustomEvent(eventName, params) {
      params = params || {bubbles: false, cancelable: false, detail: undefined};
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
      return e;
    }
    CustomEvent.prototype = window.CustomEvent.prototype;
    window.CustomEvent = CustomEvent;
  }

  $.trigger = function(el, eventName, params) {
    return el.dispatchEvent(new CustomEvent(eventName, params));
  };

  return $;
});
