define('views/submit',
       ['dom', 'settings', 'templating', 'views/search', 'url', 'user'],
       function($, settings, templating, search, url, user) {
  function reload() {
    templating.render('submit', function(res) {
      $('main').innerHTML = res;
    });
  }

  $.delegate('login logout', 'body.submit', function() {
    reload();
  });

  $.delegate('submit', '.submit-form', function(e) {
    e.preventDefault();
    var data = {
      app_url: $('[name=app_url]').value,
      name: $('[name=name]').value
    };
    $.post(url('submit'), data, {'Token': user.getToken()}).then(function(res, xhr) {
      console.success('Successfully submitted site:', data);
    }, function(res, xhr) {
      console.error('Could not submit site:', xhr.statusText, res);
    });
  });

  $.delegate('focusin', 'input[type=url]', function(e) {
    var t = e.target;
    if (!t.value) {
      // This `setTimeout` is so we set the value *after* the field has
      // been focussed; otherwise, the text will be highlighted upon focus.
      setTimeout(function() {
        t.value = 'http://';
      }, 0);
    }
  });

  $.delegate('focusout', 'input[type=url]', function(e) {
    var t = e.target;
    if (t.value === 'http://') {
      t.value = '';
    }
  });

  function init() {
    search.reset();
    document.body.setAttribute('class', 'submit');
    reload();
  }

  return {
    init: init
  };
});
