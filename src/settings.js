define('settings', ['settings_local', 'utils'], function(settings_local, utils) {
    var settingsBase = JSON.parse(document.body.getAttribute('data-settings') || '{}');
    settingsBase = utils.defaults(settingsBase, settings_local);

    return utils.defaults(settingsBase, {
      appName: 'loma',
      apiURL: 'http://' + window.location.hostname,  // No trailing slash, please./

      // The version number for `localStorage` data. Bump when the schema for
      // storing data in `localStorage` changes.
      storageVersion: '0',

      // The string to suffix page titles with. Used by `pages.js`.
      titleSuffix: 'loma'
  });
});
