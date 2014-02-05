define('utils', [], function() {
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
    return qs.join('&');
  }

  return {
    format: format,
    parseLink: parseLink,
    parseQueryString: parseQueryString,
    serialize: serialize
  };
});
