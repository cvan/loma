define('views/submit',
       ['dom', 'main', 'notification', 'settings', 'templating', 'views/search', 'url', 'user'],
       function($, main, notification, settings, templating, search, url, user) {
  function rerender() {
    templating.render('submit', function(res) {
      $('main').innerHTML = res;
    });
  }

  $.delegate('login logout', 'body.submit', function() {
    rerender();
  });

  $.delegate('submit', '.submit-form', function(e) {
    e.preventDefault();
    var data = {
      app_url: $('[name=app_url]').value,
      name: $('[name=name]').value
    };
    $.post(url('submit'), data, {'Token': user.getToken()}).then(function(res, xhr) {
      notification.notification(
        templating._l('Site successfully submitted!', 'submitSuccess'));
      main.app.load('/');
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
    if (document.body.dataset.page === 'submit') {
      return;
    }
    search.reset();
    document.body.dataset.page = 'submit';
    document.body.setAttribute('class', 'submit');
    rerender();
  }

  return {
    init: init
  };
});
