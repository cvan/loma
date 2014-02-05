define('utils', [], function() {
  function defaults(obj) {
    // Fill in a given object with default properties.
    Array.prototype.slice.call(arguments, 1).forEach(function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  };

  function encodeURIComponent(uri) {
    return window.encodeURIComponent(uri).replace(/%20/g, '+');
  }

  function decodeURIComponent(uri) {
    return window.decodeURIComponent(uri.replace(/\+/g, ' '));
  }

  var formatRe = /\{([^}]+)\}/g;
  function format(s, args) {
    if (!s) {
      throw new Error('Format string is empty');
    }
    if (!args) {
      return;
    }
    if (!(args instanceof Array || args instanceof Object)) {
      args = Array.prototype.slice.call(arguments, 1);
    }
    return s.replace(formatRe, function(_, match) {
      return args[match];
    });
  }

  function parseLink(url) {
    var a = document.createElement('a');
    a.href = url;
    return a;
  }

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
    return qs.join('&') || null;
  }

  return {
    defaults: defaults,
    encodeURIComponent: encodeURIComponent,
    decodeURIComponent: decodeURIComponent,
    format: format,
    parseLink: parseLink,
    parseQueryString: parseQueryString,
    serialize: serialize
  };
});
