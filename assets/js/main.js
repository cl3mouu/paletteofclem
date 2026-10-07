// Filtres du fil d'accueil (type + rubrique) et bouton Partager.
(function () {
  var chips = document.querySelectorAll('.chip[data-filter]');
  var cards = document.querySelectorAll('.card');
  var empty = document.querySelector('.empty');
  var banner = document.querySelector('.cat-banner');
  var catNames = { 'beaute': 'Beauté', 'lifestyle': 'Lifestyle', 'daily-life': 'Daily life' };
  var cat = new URLSearchParams(location.search).get('cat');
  var type = 'all';

  function apply() {
    var shown = 0;
    cards.forEach(function (c) {
      var ok = (type === 'all' || c.dataset.type === type) && (!cat || c.dataset.cat === cat);
      c.hidden = !ok;
      if (ok) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      type = chip.dataset.filter;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      apply();
    });
  });

  if (cat && banner) {
    banner.hidden = false;
    banner.querySelector('span').textContent = 'Rubrique : ' + (catNames[cat] || cat) + '.';
  }
  if (cards.length) apply();

  var share = document.querySelector('[data-share]');
  if (share) {
    share.addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({ title: document.title, url: location.href }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(function () {
          share.querySelector('span').textContent = 'Lien copié !';
        });
      }
    });
  }
})();
