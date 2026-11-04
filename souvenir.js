// Wedding souvenir maker: puts a guest's photo into a themed frame on a canvas,
// then lets them download or share it. Everything happens on the guest's phone,
// nothing is uploaded anywhere.
(function () {
  'use strict';

  var section = document.getElementById('souvenir-section');
  if (!section) return;

  var canvas = document.getElementById('souvenir-canvas');
  var ctx = canvas.getContext('2d');
  var fileInputs = section.querySelectorAll('input[type="file"]');
  var nameInput = document.getElementById('souvenir-name');
  var zoomInput = document.getElementById('souvenir-zoom');
  var zoomWrap = document.getElementById('souvenir-zoom-wrap');
  var downloadBtn = document.getElementById('souvenir-download');
  var shareBtn = document.getElementById('souvenir-share');

  var W = canvas.width;   // 1080
  var H = canvas.height;  // 1350
  var BOX = { x: 130, y: 235, w: 820, h: 700 }; // arched photo window
  var NAMES = section.getAttribute('data-names');
  var DATE_LINE = section.getAttribute('data-date');
  var FILE_NAME = section.getAttribute('data-file') || 'Wedding_Souvenir.jpg';

  var state = { img: null, zoom: 1, ox: 0, oy: 0 };

  function tr(s, v) { return window.T ? window.T(s, v) : s; }
  function isHi() { return window.getLang && window.getLang() === 'hi'; }
  function toast(msg) { if (typeof window.showToast === 'function') window.showToast(msg); }

  function serif(size, weight) { return (weight || 600) + ' ' + size + 'px ' + (isHi() ? '"Noto Serif Devanagari"' : '"Cinzel"') + ', serif'; }

  function goldGradient(x0, y0, x1, y1) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, '#99731C');
    g.addColorStop(0.35, '#F5E084');
    g.addColorStop(0.65, '#D4AF37');
    g.addColorStop(1, '#99731C');
    return g;
  }

  function archPath(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x, y + w / 2);
    ctx.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.closePath();
  }

  function fitText(text, maxW, size, weightFn) {
    ctx.font = weightFn(size);
    while (ctx.measureText(text).width > maxW && size > 20) {
      size -= 2;
      ctx.font = weightFn(size);
    }
    return size;
  }

  function drawBackground() {
    var bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#3A0710');
    bg.addColorStop(0.5, '#4A0E17');
    bg.addColorStop(1, '#2C060B');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // soft glow behind the photo
    var glow = ctx.createRadialGradient(W / 2, 560, 80, W / 2, 560, 620);
    glow.addColorStop(0, 'rgba(212,175,55,0.22)');
    glow.addColorStop(1, 'rgba(212,175,55,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // double gold border
    ctx.strokeStyle = goldGradient(0, 0, W, H);
    ctx.lineWidth = 8;
    ctx.strokeRect(26, 26, W - 52, H - 52);
    ctx.lineWidth = 2;
    ctx.strokeRect(46, 46, W - 92, H - 92);

    // corner flourishes
    [[46, 46, 1, 1], [W - 46, 46, -1, 1], [46, H - 46, 1, -1], [W - 46, H - 46, -1, -1]].forEach(function (c) {
      ctx.save();
      ctx.translate(c[0], c[1]);
      ctx.scale(c[2], c[3]);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(0, 0, 70, 0, Math.PI / 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, 48, 0, Math.PI / 2); ctx.stroke();
      ctx.fillStyle = '#F5E084';
      ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(30, 30); ctx.lineTo(20, 40); ctx.lineTo(10, 30); ctx.closePath(); ctx.fill();
      ctx.restore();
    });
  }

  function drawGarland() {
    var swags = 5, n = 70, x0 = 100, x1 = W - 100, baseY = 86, depth = 40;
    var pts = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n;
      var u = (t * swags) % 1;
      if (i === n) u = 1;
      pts.push({ x: x0 + t * (x1 - x0), y: baseY + depth * Math.sin(Math.PI * u) });
    }
    ctx.strokeStyle = '#99731C';
    ctx.lineWidth = 3;
    ctx.beginPath();
    pts.forEach(function (p, i) { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
    ctx.stroke();
    var colours = ['#FF9F1C', '#FFC93C', '#FF7A1C'];
    pts.forEach(function (p, i) {
      ctx.fillStyle = colours[i % 3];
      ctx.beginPath(); ctx.arc(p.x, p.y + 8, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.beginPath(); ctx.arc(p.x - 3, p.y + 5, 4, 0, Math.PI * 2); ctx.fill();
    });
  }

  function drawPhotoWindow() {
    // frame behind the photo
    archPath(BOX.x - 14, BOX.y - 14, BOX.w + 28, BOX.h + 28, 30);
    ctx.fillStyle = goldGradient(BOX.x, BOX.y, BOX.x + BOX.w, BOX.y + BOX.h);
    ctx.fill();
    archPath(BOX.x - 4, BOX.y - 4, BOX.w + 8, BOX.h + 8, 26);
    ctx.fillStyle = '#2C060B';
    ctx.fill();

    ctx.save();
    archPath(BOX.x, BOX.y, BOX.w, BOX.h, 24);
    ctx.clip();
    if (state.img) {
      var img = state.img;
      var base = Math.max(BOX.w / img.width, BOX.h / img.height);
      var s = base * state.zoom;
      var dw = img.width * s, dh = img.height * s;
      var maxX = (dw - BOX.w) / 2, maxY = (dh - BOX.h) / 2;
      state.ox = Math.max(-maxX, Math.min(maxX, state.ox));
      state.oy = Math.max(-maxY, Math.min(maxY, state.oy));
      ctx.drawImage(img, BOX.x + BOX.w / 2 + state.ox - dw / 2, BOX.y + BOX.h / 2 + state.oy - dh / 2, dw, dh);
    } else {
      var g = ctx.createLinearGradient(0, BOX.y, 0, BOX.y + BOX.h);
      g.addColorStop(0, '#5A0F1C');
      g.addColorStop(1, '#2C060B');
      ctx.fillStyle = g;
      ctx.fillRect(BOX.x, BOX.y, BOX.w, BOX.h);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(245,224,132,0.55)';
      ctx.font = '700 260px "Noto Serif Devanagari", serif';
      ctx.fillText('ॐ', W / 2, BOX.y + BOX.h / 2 + 70);
      ctx.fillStyle = 'rgba(255,249,230,0.8)';
      ctx.font = serif(34, 600);
      ctx.fillText(tr('Your photo here'), W / 2, BOX.y + BOX.h / 2 + 150);
    }
    ctx.restore();
  }

  function drawDiya(cx, cy) {
    ctx.fillStyle = '#B8791F';
    ctx.beginPath();
    ctx.moveTo(cx - 20, cy);
    ctx.quadraticCurveTo(cx, cy + 26, cx + 20, cy);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#FF9F1C';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 30);
    ctx.quadraticCurveTo(cx + 14, cy - 12, cx, cy - 2);
    ctx.quadraticCurveTo(cx - 14, cy - 12, cx, cy - 30);
    ctx.fill();
    ctx.fillStyle = '#FFF1B0';
    ctx.beginPath(); ctx.arc(cx, cy - 10, 4, 0, Math.PI * 2); ctx.fill();
  }

  function drawText() {
    ctx.textAlign = 'center';

    ctx.fillStyle = '#F5E084';
    ctx.font = '600 34px "Noto Serif Devanagari", serif';
    ctx.fillText('॥ श्री गणेशाय नमः ॥', W / 2, 192);

    // couple names
    var names = tr(NAMES);
    var nameFont = function (sz) { return isHi() ? '700 ' + sz + 'px "Noto Serif Devanagari", serif' : sz + 'px "Alex Brush", cursive'; };
    var size = fitText(names, 860, isHi() ? 92 : 130, nameFont);
    ctx.font = nameFont(size);
    ctx.fillStyle = goldGradient(200, 960, 880, 1060);
    ctx.fillText(names, W / 2, 1050);

    // divider
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(250, 1090); ctx.lineTo(500, 1090); ctx.moveTo(580, 1090); ctx.lineTo(830, 1090); ctx.stroke();
    ctx.fillStyle = '#F5E084';
    ctx.beginPath(); ctx.moveTo(540, 1076); ctx.lineTo(554, 1090); ctx.lineTo(540, 1104); ctx.lineTo(526, 1090); ctx.closePath(); ctx.fill();

    // date and place
    ctx.fillStyle = '#FFF9E6';
    var dateText = tr(DATE_LINE);
    var dsize = fitText(dateText, 860, 32, function (sz) { return serif(sz, 600); });
    ctx.font = serif(dsize, 600);
    ctx.fillText(dateText, W / 2, 1150);

    // optional guest line
    var guest = (nameInput.value || '').trim();
    if (guest) {
      ctx.fillStyle = '#F5E084';
      var line = tr('With love, {name}', { name: guest });
      var gsize = fitText(line, 820, 36, function (sz) { return serif(sz, 600); });
      ctx.font = serif(gsize, 600);
      ctx.fillText(line, W / 2, 1218);
    }

    for (var i = 0; i < 5; i++) drawDiya(W / 2 + (i - 2) * 90, 1298);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawBackground();
    drawGarland();
    drawPhotoWindow();
    drawText();
  }

  function setReady(ready) {
    downloadBtn.disabled = !ready;
    shareBtn.disabled = !ready;
    zoomWrap.classList.toggle('hidden', !ready);
    canvas.style.touchAction = ready ? 'none' : 'auto';
    canvas.style.cursor = ready ? 'grab' : 'default';
  }

  function loadFile(file) {
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast(tr('Please choose an image file.')); return; }
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      state.img = img;
      state.zoom = 1;
      state.ox = 0;
      state.oy = 0;
      zoomInput.value = 1;
      setReady(true);
      draw();
      URL.revokeObjectURL(url);
    };
    img.onerror = function () { toast(tr('Please choose an image file.')); URL.revokeObjectURL(url); };
    img.src = url;
  }

  fileInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      loadFile(input.files && input.files[0]);
      input.value = '';
    });
  });

  nameInput.addEventListener('input', draw);
  zoomInput.addEventListener('input', function () {
    state.zoom = parseFloat(zoomInput.value) || 1;
    draw();
  });

  // drag the photo inside the frame
  var drag = null;
  canvas.addEventListener('pointerdown', function (e) {
    if (!state.img) return;
    var rect = canvas.getBoundingClientRect();
    var k = W / rect.width;
    var x = (e.clientX - rect.left) * k, y = (e.clientY - rect.top) * k;
    if (x < BOX.x || x > BOX.x + BOX.w || y < BOX.y || y > BOX.y + BOX.h) return;
    drag = { x: e.clientX, y: e.clientY, ox: state.ox, oy: state.oy, k: k };
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointermove', function (e) {
    if (!drag) return;
    state.ox = drag.ox + (e.clientX - drag.x) * drag.k;
    state.oy = drag.oy + (e.clientY - drag.y) * drag.k;
    draw();
  });
  function endDrag() { drag = null; if (state.img) canvas.style.cursor = 'grab'; }
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  function toBlob() {
    return new Promise(function (resolve) { canvas.toBlob(resolve, 'image/jpeg', 0.92); });
  }

  downloadBtn.addEventListener('click', function () {
    toBlob().then(function (blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = FILE_NAME;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
      toast(tr('Souvenir saved! Check your downloads.'));
    });
  });

  var canShareFiles = false;
  try {
    var probe = new File([new Blob(['x'])], 'x.jpg', { type: 'image/jpeg' });
    canShareFiles = !!(navigator.share && navigator.canShare && navigator.canShare({ files: [probe] }));
  } catch (e) {}
  if (!canShareFiles) shareBtn.classList.add('hidden');

  shareBtn.addEventListener('click', function () {
    toBlob().then(function (blob) {
      var file = new File([blob], FILE_NAME, { type: 'image/jpeg' });
      return navigator.share({ files: [file], title: tr(NAMES) });
    }).catch(function () { /* the guest closed the share sheet */ });
  });

  // prefill the name from a personal link (?to=Name)
  try {
    var to = (new URLSearchParams(window.location.search).get('to') || '').trim().slice(0, 30);
    if (to) nameInput.value = to;
  } catch (e) {}

  document.addEventListener('langchange', draw);

  setReady(false);
  draw();
  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('130px "Alex Brush"', 'Vikas'),
      document.fonts.load('600 32px "Cinzel"', 'Kaithal'),
      document.fonts.load('700 40px "Noto Serif Devanagari"', 'विकास ॐ')
    ]).then(draw, draw);
  }
})();
