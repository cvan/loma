define('login',
       ['capabilities', 'log', 'dom', 'templating', 'user'],
       function(capabilities, log, $, templating, user) {
  if (!capabilities.persona) {
    return;
  }

  var console = log('login');

  var $signIn = $('.sign-in');
  var $signOut = $('.sign-out');

  var loginOpts = {
    oncancel: function() {
      console.log('Persona login cancelled');
    }
  };

  $.delegate('click', '.sign-in', function() {
    console.log('Logging user in');
    navigator.id.request(loginOpts);
  });

  $.delegate('click', '.sign-out', function() {
    console.log('Logging user out');
    navigator.id.logout();
    user.clearToken();
    logoutUser();
  });

  navigator.id.watch({
    loggedInUser: localStorage.email,
    onlogin: gotVerifiedEmail,
    onlogout: logoutUser
  });

  function logoutUser() {
    $.body.dataset.auth = false;
    $.trigger($.body, 'logout');
  }

  function loginSuccess(data, xhr) {
    // Assertion successfully verified, so let's log the user in.
    if (!user.loggedIn()) {
      user.setToken(data.token, data.settings);
      user.updatePermissions(data.permissions);
      console.log('Login succeeded; preparing the app');

      $.body.dataset.auth = 'true';
      $.trigger($.body, 'login');

      templating.render('header', function(res) {
        $('.header').innerHTML = res;
      });
    } else {
      console.log('Reload on login aborted by current view');
    }
  }

  function loginError(data, xhr) {
    // TODO: Add error-handling notification (issue #39).
    console.warn('Assertion verification failed!', xhr.statusText, data);
    $.trigger($.body, 'login_fail');
  }

  function gotVerifiedEmail(assertion) {
    console.log('Got assertion from Persona');

    var data = {
        assertion: assertion,
        audience: window.location.origin,
        isMobile: capabilities.mobileLogin
    };

    $.post('http://localhost:5000/user/login', data).then(loginSuccess, loginError);
  }
});
