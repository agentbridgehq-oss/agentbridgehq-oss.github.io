/* The Operator — stream picker for members. */
(function () {
  var KEY = 'SUITE-K7N-47';
  if (localStorage.getItem('operator-suite-access') !== KEY) return;

  var PATHS = {
    'ai-playbook': { n: '01', title: 'Sell an AI playbook', week: 'Write the one job you already do. One file. One $29 price. Send it to ten people who already know you.' },
    'skill-pack': { n: '02', title: 'Ship a Claude or ChatGPT skill pack', week: 'Name one recurring job. Write the instructions. Test it on your own chat. Sell the install, not a course.' },
    'prompt-stacks': { n: '03', title: 'Niche prompt stacks', week: 'Pick one niche. Ten prompts that finish a real task. One page of how to paste them. Price the stack, not the prompts one by one.' },
    'short-form': { n: '04', title: 'AI-assisted short-form', week: 'Record or write five pieces in one sitting. Same hook shape. Post on one platform only.' },
    'newsletter': { n: '05', title: 'A weekly AI letter', week: 'Write issue one today. Same day, same length, every week. Ask for replies, not applause.' },
    'templates': { n: '06', title: 'AI templates and SOPs', week: 'Turn one messy job into a checklist plus a filled example. Sell the pair.' },
    'productized-service': { n: '07', title: 'Productized AI service', week: 'One sentence offer. One price. One delivery window. Ask three people who already pay for that job.' },
    'affiliate': { n: '08', title: 'Affiliate the tools you actually use', week: 'Pick the one tool you already open this week. Write a 400-word how-I-use-it page. Link only that.' },
    'printables': { n: '09', title: 'AI printables and small files', week: 'Make one two-page sheet a tired person can print. Sell it as a file, not a brand.' },
    'creator-ads': { n: '10', title: 'Creator ads with AI scripts', week: 'Write three ad scripts for one offer you already have. Test the worst-looking one first.' },
    'long-form': { n: '11', title: 'Long-form explainers', week: 'Outline one 1,200-word piece that answers a search a buyer already types. Publish it on one site.' },
    'local-ai': { n: '12', title: 'Local businesses + AI', week: 'Walk into or message three nearby owners you can name. Offer one 10-day job at a fixed price.' },
    'design-stock': { n: '13', title: 'AI design and stock', week: 'Ship one tight set: same style, one use case, ten files. List it. Do not invent a marketplace.' },
    'membership': { n: '14', title: 'A small AI membership', week: 'Do not open a membership this week. Write four weeks of the thing members would get. Then ask eight people.' },
    'operator-group': { n: '15', title: 'A quiet operator group', week: 'Do not launch a group this week. Invite three people to a working thread. Run one week. Then decide.' },
    'freelance-productize': { n: '16', title: 'Freelance, then productize', week: 'Sell one done-for-you job this week at a price you can say out loud. Write the steps while you do it.' },
    'live-drops': { n: '17', title: 'Live drops of AI packs', week: 'Announce one drop date. Make the pack before you announce. Ten people is enough.' },
    'research-briefs': { n: '18', title: 'Research and brief service', week: 'Write one sample brief on a topic you already know. Send it to two people who pay for decisions.' },
    'automations': { n: '19', title: 'Automation setups', week: 'Map one boring weekly job. Build the smallest version. Sell the setup, not a retainer.' },
    'custom-projects': { n: '20', title: 'Custom Claude or ChatGPT projects', week: 'Configure one project for a person who already pays for the model. Charge for the setup. They keep the project.' }
  };

  var QUESTIONS = [
    { id: 'hours', q: 'How many honest hours a week can you give this?', hint: 'If you lie here, I will pick the wrong path.', opts: [{ id: 'low', label: 'Under 4' }, { id: 'mid', label: '4 to 8' }, { id: 'high', label: '8 or more' }] },
    { id: 'asset', q: 'What do you already have that a stranger would pay for?', hint: 'Pick the truest one. Not the one that sounds impressive.', opts: [{ id: 'none', label: 'Not much yet — I need a first file' }, { id: 'skill', label: 'A job I can already do' }, { id: 'audience', label: 'People who already read or watch me' }, { id: 'local', label: 'Local owners I can name' }] },
    { id: 'pay', q: 'How do you want the first money to arrive?', hint: 'This is taste, not morality.', opts: [{ id: 'files', label: 'A file they buy' }, { id: 'content', label: 'A letter, video, or post that compounds' }, { id: 'service', label: 'I do the work, they pay' }, { id: 'room', label: 'A small paid room later' }] },
    { id: 'talk', q: 'Will you talk to people this week?', hint: 'Email and DMs count. A webinar does not have to.', opts: [{ id: 'yes', label: 'Yes. I can ask.' }, { id: 'no', label: 'No. I want the work to speak.' }] },
    { id: 'speed', q: 'What does working mean right now?', hint: 'Pick the deadline you will actually keep.', opts: [{ id: 'week', label: 'Cash this week' }, { id: 'month', label: 'A first sale this month' }, { id: 'system', label: 'A system I can rerun' }] }
  ];

  function score(a) {
    var s = {};
    Object.keys(PATHS).forEach(function (k) { s[k] = 0; });
    if (a.hours === 'low') { s['printables'] += 3; s['prompt-stacks'] += 3; s['templates'] += 2; s['ai-playbook'] += 2; s['affiliate'] += 2; s['design-stock'] += 1; }
    else if (a.hours === 'mid') { s['ai-playbook'] += 3; s['templates'] += 3; s['skill-pack'] += 2; s['newsletter'] += 2; s['research-briefs'] += 2; s['custom-projects'] += 2; }
    else { s['productized-service'] += 3; s['freelance-productize'] += 3; s['local-ai'] += 2; s['automations'] += 2; s['long-form'] += 2; s['newsletter'] += 1; }
    if (a.asset === 'none') { s['printables'] += 4; s['prompt-stacks'] += 3; s['templates'] += 3; s['ai-playbook'] += 2; s['affiliate'] += 1; s['membership'] -= 8; s['operator-group'] -= 8; s['live-drops'] -= 3; }
    else if (a.asset === 'skill') { s['ai-playbook'] += 5; s['templates'] += 4; s['skill-pack'] += 3; s['productized-service'] += 3; s['freelance-productize'] += 3; s['custom-projects'] += 2; s['research-briefs'] += 2; }
    else if (a.asset === 'audience') { s['newsletter'] += 5; s['short-form'] += 4; s['live-drops'] += 4; s['long-form'] += 3; s['creator-ads'] += 3; s['affiliate'] += 2; s['membership'] += 1; }
    else if (a.asset === 'local') { s['local-ai'] += 6; s['productized-service'] += 4; s['freelance-productize'] += 3; s['automations'] += 3; s['custom-projects'] += 2; }
    if (a.pay === 'files') { s['ai-playbook'] += 4; s['templates'] += 4; s['printables'] += 3; s['prompt-stacks'] += 3; s['skill-pack'] += 3; s['design-stock'] += 3; }
    else if (a.pay === 'content') { s['newsletter'] += 4; s['short-form'] += 4; s['long-form'] += 3; s['creator-ads'] += 2; s['affiliate'] += 1; }
    else if (a.pay === 'service') { s['productized-service'] += 5; s['freelance-productize'] += 4; s['local-ai'] += 4; s['research-briefs'] += 3; s['automations'] += 3; s['custom-projects'] += 3; }
    else if (a.pay === 'room') { s['operator-group'] += 2; s['membership'] += 2; s['newsletter'] += 3; if (a.speed === 'week') { s['operator-group'] -= 6; s['membership'] -= 6; } }
    if (a.talk === 'yes') { s['local-ai'] += 3; s['productized-service'] += 3; s['freelance-productize'] += 3; s['research-briefs'] += 2; s['live-drops'] += 1; }
    else { s['printables'] += 2; s['prompt-stacks'] += 2; s['design-stock'] += 2; s['ai-playbook'] += 1; s['templates'] += 1; s['local-ai'] -= 2; }
    if (a.speed === 'week') { s['printables'] += 3; s['prompt-stacks'] += 2; s['local-ai'] += 2; s['freelance-productize'] += 2; s['ai-playbook'] += 1; s['membership'] -= 10; s['operator-group'] -= 10; s['creator-ads'] -= 3; }
    else if (a.speed === 'month') { s['ai-playbook'] += 2; s['templates'] += 2; s['newsletter'] += 2; s['productized-service'] += 2; }
    else { s['newsletter'] += 3; s['automations'] += 3; s['skill-pack'] += 2; s['custom-projects'] += 2; s['long-form'] += 1; }
    var ranked = Object.keys(s).sort(function (x, y) { return s[y] - s[x]; });
    return { primary: ranked[0], backup: ranked[1], scores: s };
  }

  function why(slug, a) {
    var bits = [];
    if (a.asset === 'none') bits.push('You do not have a room yet, so we start with a small file you can finish.');
    if (a.asset === 'skill') bits.push('You already know a job. That is the product.');
    if (a.asset === 'audience') bits.push('You already have attention. Spend it on one repeating format.');
    if (a.asset === 'local') bits.push('You can name owners. Walk toward them before you build a funnel.');
    if (a.hours === 'low') bits.push('Hours are tight, so the path has to ship in short sittings.');
    if (a.talk === 'no') bits.push('You asked not to sell face to face, so the work has to be the ask.');
    if (a.speed === 'week') bits.push('You want movement this week. A membership would be a stall.');
    if (a.pay === 'service') bits.push('You would rather get paid for the job than for a PDF. Fine — still write the steps down.');
    if (slug === 'membership' || slug === 'operator-group') bits.push('A room is later. Read the guide so you do not open one empty.');
    return bits.slice(0, 3).join(' ');
  }

  function css() {
    if (document.getElementById('op-coach-css')) return;
    var s = document.createElement('style');
    s.id = 'op-coach-css';
    s.textContent = '#op-coach-btn{position:fixed;right:18px;bottom:18px;z-index:40;min-height:48px;padding:10px 16px;background:#a4844e;color:#171512;font:600 13px/1 "Source Sans 3",system-ui,sans-serif;letter-spacing:.06em;border:0;cursor:pointer;box-shadow:0 10px 30px rgba(12,11,10,.18)}#op-coach{position:fixed;inset:0;z-index:50;background:rgba(12,11,10,.45);display:none;align-items:flex-end;justify-content:center}#op-coach.open{display:flex}#op-coach .card{width:min(520px,100%);max-height:min(92vh,760px);overflow:auto;background:#fbf8f2;color:#171512;padding:28px 24px 32px;border-top:1px solid rgba(164,132,78,.45)}#op-coach .kicker{color:#a4844e;letter-spacing:.22em;font-size:11px;margin-bottom:8px}#op-coach h2{font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:32px;line-height:1.15;margin:0 0 10px}#op-coach .soft{color:#7a746b}#op-coach .opts{display:grid;gap:8px;margin:18px 0 8px}#op-coach .opts button{width:100%;text-align:left;padding:12px 14px;border:1px solid #d9cfc0;background:#fff;cursor:pointer;font:500 15px/1.4 "Source Sans 3",system-ui,sans-serif}#op-coach .opts button:hover{border-color:#a4844e}#op-coach .row{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}#op-coach a.btn,#op-coach button.go{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:8px 16px;background:#a4844e;color:#171512;text-decoration:none;font-weight:600;border:0;cursor:pointer}#op-coach button.ghost{background:transparent;border:1px solid rgba(164,132,78,.5);min-height:44px;padding:8px 16px;cursor:pointer}#op-coach .close{float:right;letter-spacing:.14em;font-size:11px;color:#a4844e;background:none;border:0;cursor:pointer}#op-coach .week{margin-top:14px;padding:12px 14px;background:#f4efe6;border:1px solid #d9cfc0}@media(min-width:700px){#op-coach{align-items:center}#op-coach .card{border:1px solid rgba(164,132,78,.45);box-shadow:0 18px 50px rgba(12,11,10,.18)}}';
    document.head.appendChild(s);
  }

  var answers = {};
  var step = 0;

  function openGuide(slug) {
    close();
    if (typeof window.showGuide === 'function' && document.getElementById('guide-' + slug)) {
      window.showGuide(slug);
      return;
    }
    location.href = 'inside.html#' + slug;
  }

  function render() {
    var card = document.querySelector('#op-coach .card');
    if (!card) return;
    if (step >= QUESTIONS.length) {
      var pick = score(answers);
      var p = PATHS[pick.primary];
      var b = PATHS[pick.backup];
      card.innerHTML = '<button type="button" class="close" id="op-x">CLOSE</button><p class="kicker">THE OPERATOR</p><h2>Start with Path ' + p.n + '.</h2><p><strong>' + p.title + '</strong></p><p class="soft" style="margin-top:10px">' + why(pick.primary, answers) + '</p><div class="week"><p class="kicker">THIS WEEK</p><p style="margin-top:6px">' + p.week + '</p></div><p class="soft" style="margin-top:16px">Backup if that path is a bad fit: Path ' + b.n + ' — ' + b.title + '.</p><div class="row"><button type="button" class="go" id="op-open">Open Path ' + p.n + '</button><button type="button" class="ghost" id="op-backup">Open the backup</button><button type="button" class="ghost" id="op-again">Ask again</button></div>';
      document.getElementById('op-x').onclick = close;
      document.getElementById('op-open').onclick = function () { openGuide(pick.primary); };
      document.getElementById('op-backup').onclick = function () { openGuide(pick.backup); };
      document.getElementById('op-again').onclick = function () { answers = {}; step = 0; render(); };
      return;
    }
    var q = QUESTIONS[step];
    card.innerHTML = '<button type="button" class="close" id="op-x">CLOSE</button><p class="kicker">THE OPERATOR · ' + (step + 1) + ' OF ' + QUESTIONS.length + '</p><h2>' + q.q + '</h2><p class="soft">' + q.hint + '</p><div class="opts"></div>';
    document.getElementById('op-x').onclick = close;
    var box = card.querySelector('.opts');
    q.opts.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = opt.label;
      btn.onclick = function () { answers[q.id] = opt.id; step += 1; render(); };
      box.appendChild(btn);
    });
  }

  function open() {
    css();
    var wrap = document.getElementById('op-coach');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'op-coach';
      wrap.innerHTML = '<div class="card"></div>';
      wrap.addEventListener('click', function (e) { if (e.target === wrap) close(); });
      document.body.appendChild(wrap);
    }
    answers = {};
    step = 0;
    wrap.classList.add('open');
    render();
  }

  function close() {
    var wrap = document.getElementById('op-coach');
    if (wrap) wrap.classList.remove('open');
  }

  function mount() {
    css();
    if (!document.getElementById('op-coach-btn')) {
      var btn = document.createElement('button');
      btn.id = 'op-coach-btn';
      btn.type = 'button';
      btn.textContent = 'ASK THE OPERATOR';
      btn.onclick = open;
      document.body.appendChild(btn);
    }
    var home = document.getElementById('home');
    if (home && !document.getElementById('op-coach-home')) {
      var p = document.createElement('p');
      p.style.marginTop = '14px';
      p.innerHTML = '<button type="button" id="op-coach-home" class="btn" style="background:transparent;border:1px solid rgba(164,132,78,.5);color:#171512">Ask the Operator which stream</button>';
      if (home.querySelector('.stage')) home.querySelector('.stage').appendChild(p);
      var h = document.getElementById('op-coach-home');
      if (h) h.onclick = open;
    }
  }

  window.operatorCoachOpen = open;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
