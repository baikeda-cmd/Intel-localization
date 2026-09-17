(function () {
  var rtlLanguages = [
    'ar', 'arc', 'dv', 'fa', 'ha', 'he', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi'
  ];
  var bootstrapStylesheet = document.getElementById('bootstrap-stylesheet');
  var bootstrapCss = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/';

  function isRtlLanguage(language) {
    var baseLanguage = (language || '').toLowerCase().split('-')[0];
    return rtlLanguages.indexOf(baseLanguage) !== -1;
  }

  function applyLanguageDirection() {
    var isRtl = isRtlLanguage(document.documentElement.getAttribute('lang'));

    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    bootstrapStylesheet.href = bootstrapCss + (isRtl ? 'bootstrap.rtl.min.css' : 'bootstrap.min.css');
  }

  applyLanguageDirection();

  new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i += 1) {
      if (mutations[i].attributeName === 'lang') {
        applyLanguageDirection();
        break;
      }
    }
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  document.querySelectorAll('.learn-more').forEach(function (button) {
    button.addEventListener('click', function () {
      var card = button.closest('.timeline-card');
      var isExpanded = card.classList.toggle('is-expanded');
      button.setAttribute('aria-expanded', isExpanded);
    });
    button.setAttribute('aria-expanded', 'false');
  });
})();