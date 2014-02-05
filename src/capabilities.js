define('capabilities', [], function() {
  if (!window.location.origin) {
    // For IE lol.
    window.location.origin = window.location.protocol + '//' + window.location.host;
  }

  var caps = {
    'firefoxAndroid': navigator.userAgent.indexOf('Firefox') !== -1 && navigator.userAgent.indexOf('Android') !== -1,
    'firefoxOS': navigator.mozApps && navigator.mozApps.installPackage &&
                 navigator.userAgent.indexOf('Android') === -1 &&
                 navigator.userAgent.indexOf('Mobile') !== -1,
    'persona': !!navigator.id,
    'phantom': navigator.userAgent.match(/Phantom/),  // Don't use this if you can help it.
    'userAgent': navigator.userAgent,
    'webactivities': !!(navigator.setMessageHandler || navigator.mozSetMessageHandler),
  };

  caps.persona = !!navigator.id && !caps.phantom;

  // True if the login should inherit mobile behaviors such as allowUnverified.
  // The _shimmed check is for B2G where identity is native (not shimmed).
  caps.mobileLogin = caps.persona && (!navigator.id._shimmed || caps.firefoxAndroid);

  return caps;
});
