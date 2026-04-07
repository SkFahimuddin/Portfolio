/* ═══════════════════════════════════
   EMAILJS INIT
═══════════════════════════════════ */
(function () { emailjs.init("t5V8Jgt0na69vaVW7"); })();

/* ═══════════════════════════════════
   LOADER
═══════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 2400);
});

/* ═══════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════ */
const cur = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
(function cursorLoop() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  cur.style.left = mouseX + 'px';
  cur.style.top = mouseY + 'px';
  cur2.style.left = trailX + 'px';
  cur2.style.top = trailY + 'px';
  requestAnimationFrame(cursorLoop);
})();

/* ═══════════════════════════════════
   NAV SCROLL PROGRESS
═══════════════════════════════════ */
const nbi = document.getElementById('nbi');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  nbi.style.width = (scrolled / total * 100) + '%';
  document.getElementById('mainnav').classList.toggle('solid', scrolled > 60);
});

/* ═══════════════════════════════════
   BACKGROUND THREE.JS SCENE
═══════════════════════════════════ */
(function () {
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, .1, 1000);
  cam.position.z = 6;

  const addWire = (geo, color, opacity, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity }));
    m.position.set(x, y, z);
    scene.add(m);
    return m;
  };

  const ico1 = addWire(new THREE.IcosahedronGeometry(2.2, 1), 0x00e5ff, .06);
  const ico2 = addWire(new THREE.IcosahedronGeometry(1.5, 1), 0x7000ff, .05);
  const ico3 = addWire(new THREE.IcosahedronGeometry(1.0, 1), 0xff2d78, .07, 3.5, 1.5, -1);
  const tk = new THREE.Mesh(new THREE.TorusKnotGeometry(1.1, .28, 130, 14), new THREE.MeshBasicMaterial({ color: 0x7000ff, wireframe: true, transparent: true, opacity: .05 }));
  tk.position.set(-4.5, -1, 0);
  scene.add(tk);
  const oct = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), new THREE.MeshBasicMaterial({ color: 0xff2d78, wireframe: true, transparent: true, opacity: .08 }));
  oct.position.set(4.5, 2, 0);
  scene.add(oct);

  const positions = [];
  for (let i = 0; i < 800; i++) positions.push((Math.random() - .5) * 24, (Math.random() - .5) * 24, (Math.random() - .5) * 10);
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x00e5ff, size: .018, transparent: true, opacity: .4 }));
  scene.add(pts);

  const gridGeo = new THREE.PlaneGeometry(30, 30, 30, 30);
  const grid = new THREE.Mesh(gridGeo, new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: .02 }));
  grid.rotation.x = -Math.PI / 2.4; grid.position.y = -3;
  scene.add(grid);

  let tmx = 0, tmy = 0, t = 0;
  document.addEventListener('mousemove', e => {
    tmx = (e.clientX / innerWidth - .5) * 1.6;
    tmy = -(e.clientY / innerHeight - .5) * 1.0;
  });

  function tick() {
    t += .004;
    ico1.rotation.x += .002; ico1.rotation.y += .004;
    ico2.rotation.x -= .003; ico2.rotation.y -= .002;
    ico3.rotation.y += .006; ico3.rotation.z += .003;
    tk.rotation.x += .004; tk.rotation.y += .007;
    oct.rotation.x += .005; oct.rotation.z += .003;
    pts.rotation.y += .0006;
    grid.position.z = Math.sin(t) * .15;
    cam.position.x += (tmx - cam.position.x) * .03;
    cam.position.y += (tmy - cam.position.y) * .03;
    cam.lookAt(scene.position);
    renderer.render(scene, cam);
    requestAnimationFrame(tick);
  }
  tick();

  window.addEventListener('resize', () => {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
})();

/* ═══════════════════════════════════
   3D ROBOT COMPANION (Three.js)
═══════════════════════════════════ */
(function () {
  const canvas = document.getElementById('robot-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(200, 300);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, 200 / 300, .1, 100);
  cam.position.set(0, 0, 7);
  cam.lookAt(0, 0, 0);

  // Lighting
  const amb = new THREE.AmbientLight(0x002244, 1.5);
  scene.add(amb);
  const pt1 = new THREE.PointLight(0x00e5ff, 3, 20);
  pt1.position.set(3, 5, 5);
  scene.add(pt1);
  const pt2 = new THREE.PointLight(0xff2d78, 2, 20);
  pt2.position.set(-3, -2, 3);
  scene.add(pt2);
  const pt3 = new THREE.PointLight(0x7000ff, 1.5, 15);
  pt3.position.set(0, -5, 2);
  scene.add(pt3);

  // Materials
  const bodyMat = new THREE.MeshPhongMaterial({
    color: 0x0a0a1a, emissive: 0x001122, specular: 0x00e5ff, shininess: 120
  });
  const accentMat = new THREE.MeshPhongMaterial({
    color: 0x00e5ff, emissive: 0x004466, specular: 0xffffff, shininess: 200
  });
  const redMat = new THREE.MeshPhongMaterial({
    color: 0xff2d78, emissive: 0x330011, specular: 0xffffff, shininess: 200
  });
  const darkMat = new THREE.MeshPhongMaterial({
    color: 0x050514, emissive: 0x000011, specular: 0x333366, shininess: 60
  });

  const robot = new THREE.Group();
  scene.add(robot);

  // --- HEAD ---
  const headGroup = new THREE.Group();
  robot.add(headGroup);

  const headGeo = new THREE.BoxGeometry(.85, .75, .75);
  const head = new THREE.Mesh(headGeo, bodyMat);
  headGroup.add(head);

  // Head antenna
  const antBase = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, .18, 8), darkMat);
  antBase.position.set(0, .46, 0);
  headGroup.add(antBase);
  const antTop = new THREE.Mesh(new THREE.SphereGeometry(.07, 8, 8), accentMat);
  antTop.position.set(0, .62, 0);
  headGroup.add(antTop);

  // Eyes
  const eyeGeo = new THREE.BoxGeometry(.16, .1, .06);
  const leftEye = new THREE.Mesh(eyeGeo, accentMat);
  leftEye.position.set(-.2, .08, .38);
  headGroup.add(leftEye);
  const rightEye = new THREE.Mesh(eyeGeo, accentMat);
  rightEye.position.set(.2, .08, .38);
  headGroup.add(rightEye);

  // Eye glow spheres
  const eyeGlowL = new THREE.Mesh(new THREE.SphereGeometry(.05, 6, 6), new THREE.MeshBasicMaterial({ color: 0x00e5ff }));
  eyeGlowL.position.copy(leftEye.position); eyeGlowL.position.z += .04;
  headGroup.add(eyeGlowL);
  const eyeGlowR = new THREE.Mesh(new THREE.SphereGeometry(.05, 6, 6), new THREE.MeshBasicMaterial({ color: 0x00e5ff }));
  eyeGlowR.position.copy(rightEye.position); eyeGlowR.position.z += .04;
  headGroup.add(eyeGlowR);

  // Mouth strip
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(.35, .06, .05), redMat);
  mouth.position.set(0, -.14, .38);
  headGroup.add(mouth);

  // Head details
  const headAccent = new THREE.Mesh(new THREE.BoxGeometry(.85, .06, .06), accentMat);
  headAccent.position.set(0, .28, .38);
  headGroup.add(headAccent);

  headGroup.position.set(0, 1.18, 0);

  // --- NECK ---
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.12, .15, .18, 8), darkMat);
  neck.position.set(0, .96, 0);
  robot.add(neck);

  // --- TORSO ---
  const torsoGroup = new THREE.Group();
  robot.add(torsoGroup);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.0, .7), bodyMat);
  torsoGroup.add(torso);

  // Chest panel
  const chestPanel = new THREE.Mesh(new THREE.BoxGeometry(.7, .5, .05), darkMat);
  chestPanel.position.set(0, .1, .37);
  torsoGroup.add(chestPanel);

  // Chest arc reactor
  const reactor = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, .04, 12), accentMat);
  reactor.rotation.x = Math.PI / 2;
  reactor.position.set(0, .1, .42);
  torsoGroup.add(reactor);
  const reactorGlow = new THREE.Mesh(new THREE.SphereGeometry(.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0x00e5ff }));
  reactorGlow.position.set(0, .1, .42);
  torsoGroup.add(reactorGlow);

  // Shoulder details
  const shoulderL = new THREE.Mesh(new THREE.SphereGeometry(.22, 10, 10), darkMat);
  shoulderL.position.set(-.65, .38, 0);
  torsoGroup.add(shoulderL);
  const shoulderR = new THREE.Mesh(new THREE.SphereGeometry(.22, 10, 10), darkMat);
  shoulderR.position.set(.65, .38, 0);
  torsoGroup.add(shoulderR);

  // Torso side accents
  const sideL = new THREE.Mesh(new THREE.BoxGeometry(.06, .6, .5), accentMat);
  sideL.position.set(-.56, 0, 0);
  torsoGroup.add(sideL);
  const sideR = new THREE.Mesh(new THREE.BoxGeometry(.06, .6, .5), accentMat);
  sideR.position.set(.56, 0, 0);
  torsoGroup.add(sideR);

  // Belt
  const belt = new THREE.Mesh(new THREE.BoxGeometry(1.1, .1, .72), accentMat);
  belt.position.set(0, -.5, 0);
  torsoGroup.add(belt);

  torsoGroup.position.set(0, .32, 0);

  // --- ARMS ---
  const makeArm = (side) => {
    const armG = new THREE.Group();

    const upper = new THREE.Mesh(new THREE.BoxGeometry(.24, .6, .24), bodyMat);
    upper.position.set(0, -.3, 0);
    armG.add(upper);

    const elbow = new THREE.Mesh(new THREE.SphereGeometry(.13, 8, 8), darkMat);
    elbow.position.set(0, -.62, 0);
    armG.add(elbow);

    const lower = new THREE.Mesh(new THREE.BoxGeometry(.2, .5, .2), bodyMat);
    lower.position.set(0, -.95, 0);
    armG.add(lower);

    const hand = new THREE.Mesh(new THREE.BoxGeometry(.22, .24, .22), darkMat);
    hand.position.set(0, -1.25, 0);
    armG.add(hand);

    const cuff = new THREE.Mesh(new THREE.TorusGeometry(.12, .03, 6, 12), accentMat);
    cuff.rotation.x = Math.PI / 2;
    cuff.position.set(0, -1.12, 0);
    armG.add(cuff);

    armG.position.set(side * .76, .66, 0);
    return armG;
  };

  const leftArm = makeArm(-1);
  const rightArm = makeArm(1);
  robot.add(leftArm);
  robot.add(rightArm);

  // --- WAIST ---
  const waist = new THREE.Mesh(new THREE.BoxGeometry(.8, .22, .6), darkMat);
  waist.position.set(0, -.25, 0);
  robot.add(waist);

  // --- LEGS ---
  const makeLeg = (side) => {
    const legG = new THREE.Group();

    const hip = new THREE.Mesh(new THREE.SphereGeometry(.18, 8, 8), darkMat);
    hip.position.set(0, 0, 0);
    legG.add(hip);

    const upper = new THREE.Mesh(new THREE.BoxGeometry(.28, .65, .28), bodyMat);
    upper.position.set(0, -.42, 0);
    legG.add(upper);

    const knee = new THREE.Mesh(new THREE.SphereGeometry(.15, 8, 8), accentMat);
    knee.position.set(0, -.78, 0);
    legG.add(knee);

    const lower = new THREE.Mesh(new THREE.BoxGeometry(.24, .6, .24), bodyMat);
    lower.position.set(0, -1.1, 0);
    legG.add(lower);

    const foot = new THREE.Mesh(new THREE.BoxGeometry(.32, .14, .42), darkMat);
    foot.position.set(side * .04, -1.47, .07);
    legG.add(foot);

    const calf = new THREE.Mesh(new THREE.BoxGeometry(.06, .4, .06), accentMat);
    calf.position.set(side * .1, -1.1, -.1);
    legG.add(calf);

    legG.position.set(side * .3, -.56, 0);
    return legG;
  };

  const leftLeg = makeLeg(-1);
  const rightLeg = makeLeg(1);
  robot.add(leftLeg);
  robot.add(rightLeg);

  // Center robot
  robot.position.set(0, .3, 0);

  // ── Robot State ──
  let robotState = 'idle'; // idle | walk | wave | think | dance
  let walkT = 0;
  let animT = 0;
  let targetRotY = 0;
  let targetPosX = 0;
  let idleT = 0;
  let reactorPulse = 0;
  let eyeBlinkT = 0;
  let eyeBlinkCooldown = Math.random() * 200 + 100;

  const sections = ['hero', 'skills', 'projects', 'about', 'contact'];
  const robotMessages = {
    hero: "Hello! I'm Fahim's robot buddy 🤖",
    skills: "These skills are no joke!",
    projects: "Some fire projects here 🔥",
    about: "That's my human! 👆",
    contact: "Let's connect!",
  };

  let lastSection = '';
  let msgTimeout = null;

  function showRobotMsg(section) {
    if (section === lastSection) return;
    lastSection = section;
    const el = document.getElementById('robot-msg');
    el.textContent = robotMessages[section] || '';
    el.classList.add('show');
    clearTimeout(msgTimeout);
    msgTimeout = setTimeout(() => el.classList.remove('show'), 3500);
  }

  // Scroll-based section detection
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY + window.innerHeight * .5;
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop;
      const bot = top + el.offsetHeight;
      if (scroll >= top && scroll < bot) {
        const newState = id === 'hero' ? 'idle' :
          id === 'skills' ? 'think' :
            id === 'projects' ? 'walk' :
              id === 'about' ? 'wave' :
                id === 'contact' ? 'dance' : 'idle';
        if (newState !== robotState) {
          robotState = newState;
          animT = 0;
        }
        showRobotMsg(id);
      }
    });
  });

  // ── Animation Loop ──
  function robotTick() {
    animT += .025;
    idleT += .02;
    reactorPulse += .08;
    eyeBlinkT++;

    // Reactor glow pulse
    const rp = (Math.sin(reactorPulse) * .5 + .5);
    reactorGlow.scale.setScalar(.8 + rp * .5);
    antTop.scale.setScalar(.8 + Math.sin(reactorPulse * 1.3) * .3);

    // Eye blink
    if (eyeBlinkT >= eyeBlinkCooldown) {
      eyeBlinkT = 0;
      eyeBlinkCooldown = Math.random() * 200 + 100;
      const blinkScale = { y: 0.1 };
      eyeGlowL.scale.y = .1;
      eyeGlowR.scale.y = .1;
      setTimeout(() => {
        eyeGlowL.scale.y = 1;
        eyeGlowR.scale.y = 1;
      }, 120);
    }

    // Pt1 orbit
    pt1.position.x = Math.sin(idleT * .7) * 4;
    pt1.position.y = Math.cos(idleT * .5) * 3;

    // States
    if (robotState === 'idle') {
      // Gentle bobbing
      robot.position.y = .3 + Math.sin(idleT) * .06;
      headGroup.rotation.y = Math.sin(idleT * .7) * .18;
      headGroup.rotation.z = Math.sin(idleT * .5) * .06;
      leftArm.rotation.z = -Math.sin(idleT * .8) * .12 - .15;
      rightArm.rotation.z = Math.sin(idleT * .8) * .12 + .15;
      leftLeg.rotation.x = 0;
      rightLeg.rotation.x = 0;
      robot.rotation.y += (0 - robot.rotation.y) * .05;

    } else if (robotState === 'walk') {
      walkT += .12;
      // Walking
      robot.position.y = .3 + Math.abs(Math.sin(walkT)) * .1;
      leftLeg.rotation.x = Math.sin(walkT) * .55;
      rightLeg.rotation.x = -Math.sin(walkT) * .55;
      leftArm.rotation.x = -Math.sin(walkT) * .45;
      rightArm.rotation.x = Math.sin(walkT) * .45;
      leftArm.rotation.z = -.15;
      rightArm.rotation.z = .15;
      headGroup.rotation.y = Math.sin(walkT * .5) * .1;
      robot.rotation.y = Math.sin(idleT * .3) * .25;

    } else if (robotState === 'wave') {
      robot.position.y = .3 + Math.sin(idleT) * .04;
      leftLeg.rotation.x = 0;
      rightLeg.rotation.x = 0;
      // Right arm waving
      rightArm.rotation.z = .15 + Math.sin(animT * 2.5) * .6;
      rightArm.rotation.x = -Math.sin(animT * 2.5) * .3 - .3;
      leftArm.rotation.z = -.15;
      leftArm.rotation.x = 0;
      headGroup.rotation.y = Math.sin(idleT) * .2 + .2;
      headGroup.rotation.z = Math.sin(idleT * 1.5) * .08;
      robot.rotation.y = -.2 + Math.sin(idleT * .5) * .1;

    } else if (robotState === 'think') {
      robot.position.y = .3 + Math.sin(idleT * .6) * .04;
      leftLeg.rotation.x = 0;
      rightLeg.rotation.x = 0;
      // Chin scratch pose
      rightArm.rotation.z = .7;
      rightArm.rotation.x = -.85;
      leftArm.rotation.z = -.2;
      leftArm.rotation.x = 0;
      headGroup.rotation.z = Math.sin(idleT * .4) * .12 + .12;
      headGroup.rotation.y = .3 + Math.sin(idleT * .5) * .1;
      // Antenna wiggle
      antTop.position.y = .62 + Math.sin(idleT * 3) * .04;
      robot.rotation.y = Math.sin(idleT * .3) * .15;

    } else if (robotState === 'dance') {
      // Hype dance
      robot.position.y = .3 + Math.abs(Math.sin(animT * 3)) * .15;
      robot.rotation.y = Math.sin(animT * 2) * .4;
      leftLeg.rotation.x = Math.sin(animT * 3) * .5;
      rightLeg.rotation.x = -Math.sin(animT * 3) * .5;
      leftArm.rotation.z = -(.2 + Math.sin(animT * 3 + 1) * .7);
      rightArm.rotation.z = .2 + Math.sin(animT * 3) * .7;
      leftArm.rotation.x = Math.cos(animT * 3) * .4;
      rightArm.rotation.x = -Math.cos(animT * 3) * .4;
      headGroup.rotation.y = Math.sin(animT * 4) * .3;
      headGroup.rotation.z = Math.cos(animT * 3) * .15;
      torsoGroup.rotation.z = Math.sin(animT * 3) * .08;
    }

    renderer.render(scene, cam);
    requestAnimationFrame(robotTick);
  }
  robotTick();

  window.addEventListener('resize', () => {
    const w = document.getElementById('robot-wrap').offsetWidth;
    const h = document.getElementById('robot-wrap').offsetHeight;
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();

/* ═══════════════════════════════════
   TYPEWRITER
═══════════════════════════════════ */
const roles = ['Flutter Engineer', 'AI Builder', 'Full-Stack Dev', 'Problem Solver'];
let ri = 0, ci = 0, deleting = false, td = 150;
const typedEl = document.getElementById('typed');
function type() {
  const c = roles[ri];
  typedEl.textContent = deleting ? c.substring(0, ci--) : c.substring(0, ++ci);
  if (!deleting && ci === c.length) { td = 1500; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; td = 400; }
  else td = deleting ? 70 : 140;
  setTimeout(type, td);
}
type();

/* ═══════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════ */
const rvEls = document.querySelectorAll('.rv, .rv-l, .rv-r');
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      rvObs.unobserve(e.target);
    }
  });
}, { threshold: .12 });
rvEls.forEach(el => rvObs.observe(el));

/* ═══════════════════════════════════
   COUNT UP
═══════════════════════════════════ */
document.querySelectorAll('[data-count]').forEach(el => {
  const n = parseInt(el.getAttribute('data-count'));
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      let c = 0;
      const step = Math.ceil(n / 30);
      const iv = setInterval(() => {
        c = Math.min(c + step, n);
        el.textContent = c + '+';
        if (c >= n) clearInterval(iv);
      }, 40);
      obs.unobserve(el);
    }
  }, { threshold: .5 });
  obs.observe(el);
});

/* ═══════════════════════════════════
   SKILL CARD GLOW
═══════════════════════════════════ */
document.querySelectorAll('.sk-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.querySelector('.sk-glow').style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.querySelector('.sk-glow').style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

/* ═══════════════════════════════════
   CONTACT FORM
═══════════════════════════════════ */
document.getElementById('cform').addEventListener('submit', function (e) {
  e.preventDefault();
  const st = document.getElementById('fst');
  st.textContent = 'Sending...';
  st.style.color = 'var(--muted2)';
  emailjs.send("service_zypq8jp", "template_vbzcz38", {
    first_name: document.getElementById('fn').value,
    last_name: document.getElementById('ln').value,
    email: document.getElementById('em').value,
    phone: document.getElementById('ph').value,
    message: document.getElementById('msg').value
  })
    .then(() => {
      st.textContent = '✓ Message sent!';
      st.style.color = 'var(--c1)';
      this.reset();
    })
    .catch(() => {
      st.textContent = '✗ Failed to send.';
      st.style.color = 'var(--c2)';
    });
});

/* ═══════════════════════════════════
   ROBOT GLOW - Follow cursor slightly
═══════════════════════════════════ */
const robotWrap = document.getElementById('robot-wrap');
document.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2;
  const x = (e.clientX - cx) / cx;
  robotWrap.style.transform = `translateX(${x * -8}px)`;
});