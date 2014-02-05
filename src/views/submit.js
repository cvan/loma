define('views/submit',
       ['dom', 'views/search', 'templating'],
       function($, search, templating) {

  function init() {
    search.reset();
    document.body.setAttribute('class', 'submit');
    templating.render('submit', function(res) {
      $('main').innerHTML = res;
    });
  }

  return {
    init: init
  };
});
