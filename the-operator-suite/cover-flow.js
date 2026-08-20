/* Cover-first flow for Inside */
(function () {
  var KEY = 'SUITE-K7N-47';
  if (localStorage.getItem('operator-suite-access') !== KEY) return;

  var shelf = document.getElementById('shelf');
  if (!shelf) return;

  var front = document.querySelector('[data-open="front-door"]');
  if (front) front.remove();

  var title = shelf.querySelector('h1');
  if (title) title.textContent = 'Pick a path';
  var gold = shelf.querySelector('.gold');
  if (gold && /INSIDE|21/.test(gold.textContent)) gold.textContent = 'THE 20 STREAMS';

  var home = document.createElement('section');
  home.id = 'home';
  home.innerHTML = '<div class="stage" style="text-align:center;width:min(420px,100%);margin:48px auto;padding:20px">'
    + '<p class="gold">INSIDE</p>'
    + '<button type="button" id="open-book" style="display:block;width:100%;cursor:pointer;background:none;border:0;padding:0">'
    + '<img src="product-cover.jpg" alt="The Operator Suite master cover" style="width:100%;border:1px solid rgba(164,132,78,.45);box-shadow:0 18px 50px rgba(12,11,10,.18)"/>'
    + '</button>'
    + '<h1 class="serif" style="font-size:clamp(32px,6vw,46px);margin:22px 0 8px">The Operator Suite</h1>'
    + '<p class="gold" style="margin-top:8px">CLICK THE COVER</p>'
    + '<p class="soft" style="margin-top:10px">The master book opens. Twenty income streams wait on the next page.</p>'
    + '<p style="margin-top:22px"><button class="btn" type="button" id="open-book-btn">Open the 20 streams</button></p>'
    + '<p style="margin-top:10px"><button class="btn" type="button" id="ask-op-cover" style="background:transparent;border:1px solid rgba(164,132,78,.5)">Ask the Operator which stream</button></p>'
    + '</div>';
  shelf.parentNode.insertBefore(home, shelf);

  function showHome() {
    home.hidden = false;
    shelf.hidden = true;
    document.querySelectorAll('.panel').forEach(function (p) { p.hidden = true; });
    var back = document.getElementById('back');
    if (back) back.hidden = true;
    window.scrollTo(0, 0);
  }
  function showShelf() {
    home.hidden = true;
    shelf.hidden = false;
    document.querySelectorAll('.panel').forEach(function (p) { p.hidden = true; });
    var back = document.getElementById('back');
    if (back) { back.hidden = false; back.textContent = '\u2190 Cover'; }
    window.scrollTo(0, 0);
  }

  document.getElementById('open-book').onclick = showShelf;
  document.getElementById('open-book-btn').onclick = showShelf;
  var ask = document.getElementById('ask-op-cover');
  if (ask) ask.onclick = function () { if (window.operatorCoachOpen) window.operatorCoachOpen(); };
  var brand = document.getElementById('to-shelf');
  if (brand) brand.onclick = function (e) { e.preventDefault(); e.stopPropagation(); showHome(); };

  var hash = location.hash.replace('#', '');
  if (hash === 'streams') showShelf();
  else if (!hash) { shelf.hidden = true; showHome(); }
})();
