define('views/submit',
       ['dom', 'main', 'settings', 'templating', 'views/search', 'url', 'user'],
       function($, main, settings, templating, search, url, user) {
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
      // TODO: Show notification message (issue #39).
      console.log('Successfully submitted site:', res);
      setTimeout(function() {
        // TODO: Be smarter and refresh search docs asynchronously upon
        // submission (issue #6).
        window.location.href = '/';
      }, 7000);
    }, function(res, xhr) {
      console.error('Could not submit site:', xhr.statusText, res);
    });
    main.app.load('/');
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
