define('user',
       ['capabilities', 'log', 'storage', 'utils'],
       function(capabilities, log, storage, utils) {

  var console = log('user');

  var token;
  var settings = {};
  var permissions = {};

  var persist = !capabilities.phantom;

  if (persist) {
    token = storage.getItem('user');
    log.unmention(token);
    settings = JSON.parse(storage.getItem('settings') || '{}');
    permissions = JSON.parse(storage.getItem('permissions') || '{}');
    saveSettings();
  }

  function clearSettings() {
    settings = {};
  }

  function clearToken() {
    console.log('Clearing user token');

    storage.removeItem('user');
    if ('email' in settings) {
      delete settings.email;
      saveSettings();
      permissions = {};
      savePermissions();
    }
    token = null;
  }

  function getSetting(setting, default_) {
    setting = settings[setting];
    if (typeof setting === 'undefined') {
      return default_;
    }
    return setting;
  }

  function getPermission(setting) {
    return permissions[setting] || false;
  }

  function getSettings() {
    return settings;
  }

  function setToken(newToken, newSettings) {
    console.log('Setting new user token');
    if (!newToken) {
      return;
    }
    token = newToken;
    // Make sure that we don't ever log the user token.
    log.unmention(newToken);

    // If we're allowed to save to localStorage, do that now.
    if (persist) {
      storage.setItem('user', token);
    }

    // Update the user's settings with the ones that are in the
    // login API response.
    updateSettings(newSettings);
  }

  function saveSettings() {
    if (persist) {
      console.log('Saving settings to localStorage');
      storage.setItem('settings', JSON.stringify(settings));
    } else {
      console.log('Settings not saved to localStorage');
    }
  }

  function updateSettings(data) {
    if (!data) {
      return;
    }
    console.log('Updating user settings', data);
    settings = utils.defaults(settings, data);
    saveSettings();
  }

  function savePermissions() {
    if (persist) {
      console.log('Saving permissions to localStorage');
      storage.setItem('permissions', JSON.stringify(permissions));
    } else {
      console.log('Permissions not saved to localStorage');
    }
  }

  function updatePermissions(data) {
    if (!data) {
      return;
    }
    console.log('Updating user permissions', data);
    permissions = data;
    savePermissions();
  }

  return {
    clearSettings: clearSettings,
    clearToken: clearToken,
    getSetting: getSetting,
    getPermission: getPermission,
    getSettings: getSettings,
    getToken: function() { return token; },
    loggedIn: function() { return !!token; },
    setToken: setToken,
    updateSettings: updateSettings,
    updatePermissions: updatePermissions
  };
});
