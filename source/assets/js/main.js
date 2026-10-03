/* Gurukrupa Export — Rose Gold Edition · site interactions */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- preloader ---------- */
  const pre = $('.preloader');
  const hidePre = () => pre && pre.classList.add('done');
  window.addEventListener('load', () => setTimeout(hidePre, 600));
  setTimeout(hidePre, 2600);

  /* ---------- image fallback (keeps the layout elegant if a photo fails) ---------- */
  $$('img').forEach((img) => {
    const box = img.closest('.media, .brand, .cert, .logo-chip');
    if (!box) return;
    const fail = () => box.classList.add('noimg');
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fail();
  });

  /* ---------- header ---------- */
  const header = $('.site-header');
  const onScroll = () => header && header.classList.toggle('solid', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const burger = $('.burger');
  const mm = $('.mobile-menu');
  if (burger && mm) {
    burger.addEventListener('click', () => {
      const open = !mm.classList.contains('on');
      mm.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', mm).forEach((a) => a.addEventListener('click', () => {
      mm.classList.remove('on'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = '';
    }));
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => el.classList.add('in'));

  /* ---------- count-up numbers ---------- */
  const counters = $$('[data-count]');
  const runCount = (el) => {
    const end = parseFloat(el.dataset.count);
    const suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = end.toLocaleString('en-IN') + suf; return; }
    const t0 = performance.now(), dur = 1800;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e).toLocaleString('en-IN') + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach((c) => co.observe(c));
  } else counters.forEach(runCount);

  /* ---------- seamless marquees ---------- */
  $$('.marquee-track').forEach((t) => { t.innerHTML += t.innerHTML; });

  /* ---------- hero slider ---------- */
  const slides = $$('.hero .slide');
  if (slides.length > 1) {
    const dots = $$('.hero-dots button');
    const cap = $('.hero-caption');
    let i = 0, timer;
    const show = (n) => {
      slides[i].classList.remove('on'); dots[i] && dots[i].classList.remove('on');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('on'); dots[i] && dots[i].classList.add('on');
      if (cap) cap.textContent = slides[i].dataset.caption || '';
    };
    const play = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => show(i + 1), 6500); };
    dots.forEach((d, n) => d.addEventListener('click', () => { show(n); play(); }));
    play();
  }

  /* ---------- tabs (audience) ---------- */
  $$('[data-tabs]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    tabs.forEach((tab) => tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.setAttribute('aria-selected', 'false'); const p = document.getElementById(t.getAttribute('aria-controls')); p && p.classList.remove('on'); });
      tab.setAttribute('aria-selected', 'true');
      const p = document.getElementById(tab.getAttribute('aria-controls')); p && p.classList.add('on');
    }));
  });

  /* ---------- legacy timeline ---------- */
  const tl = $('#timeline');
  if (tl) {
    const data = [
      { y: '1962', k: 'Foundation', t: 'Foundation of Excellence', d: 'Shri Nagjibhai Ramani begins his diamond sourcing journey — mastering the art and science of sourcing, processing and finishing diamonds.' },
      { y: '1997', k: 'Established', t: 'Gurukrupa Established', d: 'The Ramani family ventures into diamond jewellery manufacturing.' },
      { y: '2002', k: 'Bangalore', t: 'South India Expansion', d: 'Bangalore marks Gurukrupa Export’s entry into Karnataka.' },
      { y: '2007', k: 'Coimbatore', t: 'Southern Reach', d: 'Coimbatore branch established, expanding our reach across Tamil Nadu.' },
      { y: '2010', k: 'Chennai', t: 'Tamil Nadu Growth', d: 'Chennai expands Gurukrupa Export’s growing presence across the South.' },
      { y: '2014', k: 'Temples', t: 'Temple Milestone', d: 'Commissioned for Palani Murugan and Swaminarayan Temple jewellery (2014–15).' },
      { y: '2016', k: 'Heritage', t: 'Cultural Craftsmanship', d: 'Commissioned for Kalikambal Temple jewellery (2016–17).' },
      { y: '2018', k: 'Hyderabad', t: 'Global Footprint', d: 'Hyderabad branch opens, marking a new chapter alongside the Guruvayur Krishna Temple project.' },
      { y: '2022', k: 'Presence', t: 'Strategic Presence', d: 'Vijayawada and Thrissur branches, and participation in major exhibitions.' },
      { y: '2024', k: 'Evolution', t: 'Brand Evolution', d: 'Introduction of our new logo. Mumbai corporate office and experience centre launched.' },
      { y: '2025', k: 'Recognition', t: 'National Recognition', d: 'Awarded by the Government of India and NASSCOM for advanced technology adoption.' }
    ];
    const tabsEl = $('.tl-tabs', tl), body = $('.tl-content', tl);
    let cur = 0;
    tabsEl.innerHTML = data.map((m, n) => `<button class="tl-tab" role="tab" aria-selected="${n === 0}" data-n="${n}"><b>${m.y}</b><small>${m.k}</small></button>`).join('');
    const render = () => {
      const m = data[cur];
      body.innerHTML = `<div class="tl-anim"><div class="tl-year shine">${m.y}</div><h3 class="h-md" style="margin:18px 0 14px">${m.t}</h3><p class="lead">${m.d}</p></div>`;
      $$('.tl-tab', tabsEl).forEach((b, n) => b.setAttribute('aria-selected', n === cur));
    };
    tabsEl.addEventListener('click', (e) => { const b = e.target.closest('.tl-tab'); if (b) { cur = +b.dataset.n; render(); } });
    $('.tl-prev', tl).addEventListener('click', () => { cur = (cur + data.length - 1) % data.length; render(); });
    $('.tl-next', tl).addEventListener('click', () => { cur = (cur + 1) % data.length; render(); });
    render();
  }

  /* ---------- collection filters + shortlist ---------- */
  const filterBar = $('[data-filter]');
  if (filterBar) {
    const cards = $$('.col-card');
    const count = $('.filter-count');
    filterBar.addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      $$('.chip', filterBar).forEach((c) => c.setAttribute('aria-pressed', c === b));
      const f = b.dataset.f;
      let n = 0;
      cards.forEach((c) => { const show = f === 'all' || (c.dataset.tags || '').includes(f); c.classList.toggle('hide', !show); if (show) n++; });
      if (count) count.textContent = n + (n === 1 ? ' design' : ' designs');
    });
  }
  const bar = $('.shortbar');
  if (bar) {
    const label = $('.short-count', bar);
    const picks = new Set();
    const update = () => {
      bar.classList.toggle('on', picks.size > 0);
      document.body.classList.toggle('has-bar', picks.size > 0);
      label.textContent = picks.size + (picks.size === 1 ? ' piece' : ' pieces');
      try { sessionStorage.setItem('gk-shortlist', JSON.stringify([...picks])); } catch (e) {}
    };
    $$('.save').forEach((btn) => btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id, on = !picks.has(id);
      on ? picks.add(id) : picks.delete(id);
      btn.setAttribute('aria-pressed', on);
      btn.setAttribute('aria-label', (on ? 'Remove ' : 'Add ') + id + (on ? ' from' : ' to') + ' shortlist');
      update();
    }));
    $('.short-clear', bar).addEventListener('click', () => {
      picks.clear(); $$('.save').forEach((b) => b.setAttribute('aria-pressed', 'false')); update();
    });
  }

  /* ---------- enquiry forms ---------- */
  $$('.chips .chip').forEach((c) => c.addEventListener('click', () => c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true')));
  let saved = [];
  try { saved = JSON.parse(sessionStorage.getItem('gk-shortlist') || '[]'); } catch (e) {}
  const msg = $('#msg');
  if (msg && saved.length && location.hash === '#enquire') msg.value = 'I would like a quote for: ' + saved.join(', ');
  $$('form.form').forEach((form) => form.addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: connect to your CRM / email service (e.g. Formspree, HubSpot or your ERP endpoint)
    const chosen = $$('.chip[aria-pressed="true"]', form).map((c) => c.textContent.trim());
    const thanks = form.parentElement.querySelector('.thanks');
    if (thanks) {
      const s = thanks.querySelector('.sum');
      if (s) s.textContent = chosen.length ? chosen.join(', ') : 'our collections';
      form.style.display = 'none'; thanks.classList.add('on');
    }
  }));
  $$('.thanks .again').forEach((b) => b.addEventListener('click', () => {
    const t = b.closest('.thanks'), f = t.parentElement.querySelector('form.form');
    t.classList.remove('on'); f.reset(); f.style.display = '';
  }));

  /* ---------- footer year ---------- */
  $$('.year').forEach((y) => (y.textContent = new Date().getFullYear()));
})();
