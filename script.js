
  // ============================================================
  // EDIT ME: party date/time (drives the countdown)
  // ============================================================
  const partyDateTime = new Date("2026-12-05T14:00:00");

  // Declared before use so clearInterval can never hit an uninitialised variable.
  let timer = null;

  function updateCountdown(){
    let diff = partyDateTime - new Date();
    const d = document.getElementById('cd-days');
    const h = document.getElementById('cd-hours');
    const m = document.getElementById('cd-mins');
    const s = document.getElementById('cd-secs');

    if (diff <= 0) {
      d.textContent = h.textContent = m.textContent = s.textContent = '0';
      document.getElementById('countdownDone').hidden = false;
      if (timer) clearInterval(timer);
      return;
    }
    const day = Math.floor(diff / 86400000); diff -= day * 86400000;
    const hr  = Math.floor(diff / 3600000);  diff -= hr * 3600000;
    const min = Math.floor(diff / 60000);    diff -= min * 60000;
    const sec = Math.floor(diff / 1000);
    d.textContent = day; h.textContent = hr; m.textContent = min; s.textContent = sec;
  }
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);

  // ============================================================
  // RSVP modal. EDIT ME: set rsvpEmail to your real address.
  // ============================================================
  const rsvpEmail = "rsvp@example.com";

  const overlay = document.getElementById('rsvpOverlay');
  const openBtn = document.getElementById('openRsvp');
  const closeBtn = document.getElementById('closeRsvp');
  const form = document.getElementById('rsvpForm');
  const successView = document.getElementById('rsvpSuccess');
  const successMsg = document.getElementById('rsvpSuccessMsg');

  function openModal(){
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    form.hidden = false;
    successView.hidden = true;
    form.reset();
    document.getElementById('guestName').focus();
  }
  function closeModal(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('guestName').value.trim();
    const attending = form.querySelector('input[name="attending"]:checked').value;
    const count = document.getElementById('guestCount').value;
    const notes = document.getElementById('guestNotes').value.trim();

    const subject = encodeURIComponent(`Baby shower RSVP: ${name} — ${attending === 'Yes' ? 'Attending' : 'Not attending'}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Attending: ${attending}`, `Number attending: ${count}`, `Notes: ${notes || '—'}`].join('\n')
    );
    window.location.href = `mailto:${rsvpEmail}?subject=${subject}&body=${body}`;

    const first = name.split(' ')[0] || 'friend';
    successMsg.textContent = attending === 'Yes'
      ? `Thank you, ${first} — we can't wait to celebrate with you!`
      : `Thanks for letting us know, ${first} — you'll be missed!`;
    form.hidden = true;
    successView.hidden = false;
  });

  // ============================================================
  // Cover: open on click / tap / Enter / Space
  // ============================================================
  const coverPage = document.getElementById('coverPage');
  const mainContent = document.getElementById('mainContent');
  document.documentElement.classList.add('locked');

  function openInvitation(){
    if (coverPage.classList.contains('closing')) return;
    coverPage.classList.add('closing');
    mainContent.classList.add('revealed');
    document.documentElement.classList.remove('locked');
    setTimeout(() => { coverPage.hidden = true; }, 800);
  }
  coverPage.addEventListener('click', openInvitation);
  coverPage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInvitation(); }
  });

