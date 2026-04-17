/* ═══════════════════════════════════════════
   EMAILJS INIT
═══════════════════════════════════════════ */
(function(){ emailjs.init("t5V8Jgt0na69vaVW7"); })();

/* ═══════════════════════════════════════════
   BOOT SEQUENCE
═══════════════════════════════════════════ */
(function(){
  const boot = document.getElementById('boot');
  const lines = document.querySelectorAll('.boot-line');
  const bar = document.querySelector('.boot-bar');
  const fill = document.querySelector('.boot-fill');
  const finalEl = document.querySelector('.boot-final');

  lines.forEach(line => {
    const delay = parseInt(line.dataset.delay || 0);
    setTimeout(() => line.classList.add('show'), delay);
  });

  setTimeout(() => { bar.classList.add('show'); fill.classList.add('go'); }, 1600);
  setTimeout(() => finalEl.classList.add('show'), 2100);
  setTimeout(() => boot.classList.add('done'), 2900);
})();

/* ═══════════════════════════════════════════
   MOBILE NAV (HAMBURGER)
═══════════════════════════════════════════ */
const hamburger    = document.getElementById('hamburger');
const mobNav       = document.getElementById('mob-nav');
const mobOverlay   = document.getElementById('mob-nav-overlay');
const mobNavClose  = document.getElementById('mob-nav-close');

function openMobNav() {
  hamburger.classList.add('open');
  mobNav.classList.add('open');
  mobOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobNav() {
  hamburger.classList.remove('open');
  mobNav.classList.remove('open');
  mobOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (mobNav.classList.contains('open')) closeMobNav();
  else openMobNav();
});

mobNavClose.addEventListener('click', closeMobNav);
mobOverlay.addEventListener('click', closeMobNav);

// Close on nav link click (links already have onclick="closeMobNav()")
// Expose closeMobNav globally for the inline onclick attributes
window.closeMobNav = closeMobNav;

/* ═══════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════ */
const cdot  = document.getElementById('c-dot');
const cring = document.getElementById('c-ring');
const ctrail= document.getElementById('c-trail');
let mx=0,my=0,rx=0,ry=0,tx=0,ty=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function cursorLoop(){
  rx += (mx-rx)*.18;
  ry += (my-ry)*.18;
  tx += (mx-tx)*.05;
  ty += (my-ty)*.05;
  cdot.style.left  = mx+'px'; cdot.style.top  = my+'px';
  cring.style.left = rx+'px'; cring.style.top = ry+'px';
  ctrail.style.left= tx+'px'; ctrail.style.top= ty+'px';
  requestAnimationFrame(cursorLoop);
})();

/* ═══════════════════════════════════════════
   NAV SCROLL
═══════════════════════════════════════════ */
const nav  = document.getElementById('nav');
const npFill = document.getElementById('np-fill');
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const t = document.documentElement.scrollHeight - window.innerHeight;
  npFill.style.width = (s/t*100)+'%';
  nav.classList.toggle('solid', s > 50);
});

/* ═══════════════════════════════════════════
   DATA STREAM (hero sidebar)
═══════════════════════════════════════════ */
(function(){
  const el = document.getElementById('datastream');
  if (!el) return;
  const lines = [
    'NEURAL_LOAD: 94%', 'MEMORY_BANKS: OK', 'GROQ_API: LINKED',
    'FLUTTER: ACTIVE', 'FIREBASE: SYNC', 'NODE_PROC: RUN',
    'AI_CORE: ONLINE', 'REACT: RENDER', 'SQL_DB: READY',
    'DEPLOY: VERCEL', 'GIT: PUSH OK', 'BUILD: SUCCESS'
  ];
  let i = 0;
  function next(){
    const d = document.createElement('div');
    d.textContent = lines[i % lines.length];
    d.style.cssText = 'opacity:0;transition:opacity .4s,transform .4s;transform:translateX(10px)';
    el.appendChild(d);
    setTimeout(()=>{ d.style.opacity='1'; d.style.transform='none'; },20);
    setTimeout(()=>{ d.style.opacity='0'; setTimeout(()=>el.removeChild(d),400); },2400);
    if(el.children.length > 6) el.removeChild(el.children[0]);
    i++;
  }
  setInterval(next, 800);
  next();
})();

/* ═══════════════════════════════════════════
   WARP TUNNEL (Three.js)
═══════════════════════════════════════════ */
(function(){
  const canvas = document.getElementById('warp-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, .1, 200);
  cam.position.z = 0;

  const count = 1200;
  const positions = new Float32Array(count*3);
  const speeds    = new Float32Array(count);
  const colors    = new Float32Array(count*3);
  const baseColors = [
    [0, 0.96, 1],
    [0.47, 0, 1],
    [1, 0, 0.24],
  ];

  for(let i=0; i<count; i++){
    const angle = Math.random()*Math.PI*2;
    const radius = 2 + Math.random()*6;
    positions[i*3]   = Math.cos(angle)*radius + (Math.random()-.5)*1.5;
    positions[i*3+1] = Math.sin(angle)*radius + (Math.random()-.5)*1.5;
    positions[i*3+2] = (Math.random()-0.5)*120;
    speeds[i] = .2 + Math.random()*.5;
    const c = baseColors[Math.floor(Math.random()*baseColors.length)];
    colors[i*3]   = c[0];
    colors[i*3+1] = c[1];
    colors[i*3+2] = c[2];
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: .06, vertexColors: true,
    transparent: true, opacity: .7,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  for(let r=0; r<8; r++){
    const geo2 = new THREE.TorusGeometry(3+r*.8, .005, 4, 60);
    const m2 = new THREE.Mesh(geo2, new THREE.MeshBasicMaterial({
      color: r%2===0 ? 0x00f5ff : 0x7700ff,
      transparent: true, opacity: .06+r*.008
    }));
    m2.position.z = -r*12;
    scene.add(m2);
  }

  const addFloat = (geo, col, x, y, z) => {
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color:col, wireframe:true, transparent:true, opacity:.05
    }));
    m.position.set(x,y,z);
    scene.add(m);
    return m;
  };

  const geo3 = addFloat(new THREE.IcosahedronGeometry(1.8,1), 0x00f5ff, 5,2,-20);
  const geo4 = addFloat(new THREE.OctahedronGeometry(1.4,0),  0xff003c,-5,-2,-35);
  const geo5 = addFloat(new THREE.TetrahedronGeometry(1.2,0), 0x7700ff, 0,4,-50);

  let scrollSpeed = 0;
  let lastScroll = window.scrollY;
  window.addEventListener('scroll', ()=>{
    scrollSpeed += (window.scrollY - lastScroll) * .01;
    lastScroll = window.scrollY;
  });

  let tmx=0, tmy=0;
  document.addEventListener('mousemove', e=>{
    tmx = (e.clientX/innerWidth-.5)*2;
    tmy = -(e.clientY/innerHeight-.5)*1.5;
  });

  function tick(){
    scrollSpeed *= .92;
    const warpSpeed = .04 + Math.abs(scrollSpeed);
    const pos = geo.attributes.position.array;

    for(let i=0; i<count; i++){
      pos[i*3+2] += warpSpeed * speeds[i];
      if(pos[i*3+2] > 5){
        const angle = Math.random()*Math.PI*2;
        const radius = 2 + Math.random()*6;
        pos[i*3]   = Math.cos(angle)*radius + (Math.random()-.5)*1.5;
        pos[i*3+1] = Math.sin(angle)*radius + (Math.random()-.5)*1.5;
        pos[i*3+2] = -120 + Math.random()*10;
      }
    }
    geo.attributes.position.needsUpdate = true;
    mat.size = .06 + Math.abs(scrollSpeed)*0.08;

    geo3.rotation.x += .003; geo3.rotation.y += .007;
    geo4.rotation.y -= .005; geo4.rotation.z += .003;
    geo5.rotation.x += .008; geo5.rotation.z -= .004;

    cam.position.x += (tmx*.3 - cam.position.x)*.03;
    cam.position.y += (tmy*.3 - cam.position.y)*.03;
    cam.lookAt(0,0,-10);

    renderer.render(scene, cam);
    requestAnimationFrame(tick);
  }
  tick();

  window.addEventListener('resize', ()=>{
    cam.aspect = innerWidth/innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
})();

/* ═══════════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════════ */
const roles = ['FLUTTER ENGINEER', 'AI BUILDER', 'FULL-STACK DEV', 'PROBLEM SOLVER'];
let ri=0,ci=0,del=false,td=100;
const typedEl = document.getElementById('typed');
function type(){
  const c = roles[ri];
  typedEl.textContent = del ? c.substring(0,ci--) : c.substring(0,++ci);
  if(!del && ci===c.length){ td=1800; del=true; }
  else if(del && ci===0){ del=false; ri=(ri+1)%roles.length; td=400; }
  else td = del ? 55 : 100;
  setTimeout(type, td);
}
type();

/* ═══════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════ */
const rvObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); rvObs.unobserve(e.target); } });
},{threshold:.1});
document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el=>rvObs.observe(el));

/* ═══════════════════════════════════════════
   SKILL BAR ANIMATE
═══════════════════════════════════════════ */
const barObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skf-fill').forEach(fill=>{
        fill.style.width = fill.dataset.pct+'%';
      });
      barObs.unobserve(e.target);
    }
  });
},{threshold:.3});
document.querySelectorAll('.sk-holo').forEach(el=>barObs.observe(el));

/* ═══════════════════════════════════════════
   COUNT UP
═══════════════════════════════════════════ */
document.querySelectorAll('[data-count]').forEach(el=>{
  const n = parseInt(el.getAttribute('data-count'));
  const obs = new IntersectionObserver(([e])=>{
    if(e.isIntersecting){
      let c=0; const step=Math.ceil(n/40);
      const iv=setInterval(()=>{ c=Math.min(c+step,n); el.textContent=c+'+'; if(c>=n)clearInterval(iv); },35);
      obs.unobserve(el);
    }
  },{threshold:.5});
  obs.observe(el);
});

/* ═══════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════ */
document.getElementById('cform').addEventListener('submit', function(e){
  e.preventDefault();
  const st = document.getElementById('fst');
  st.textContent = '▶ TRANSMITTING...';
  st.style.color = 'var(--muted)';
  emailjs.send("service_zypq8jp","template_vbzcz38",{
    first_name: document.getElementById('fn').value,
    last_name:  document.getElementById('ln').value,
    email:      document.getElementById('em').value,
    phone:      document.getElementById('ph').value,
    message:    document.getElementById('msg').value
  })
  .then(()=>{
    st.textContent = '✓ TRANSMISSION SUCCESSFUL';
    st.style.color = 'var(--c4)';
    this.reset();
  })
  .catch(()=>{
    st.textContent = '✗ TRANSMISSION FAILED';
    st.style.color = 'var(--c2)';
  });
});

/* ═══════════════════════════════════════════
   HOLOGRAPHIC CARD TILT
═══════════════════════════════════════════ */
document.querySelectorAll('.sk-holo').forEach(card=>{
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    card.querySelector('.sk-front').style.cssText += `
      box-shadow: ${x*20}px ${y*20}px 40px rgba(0,245,255,.08),
                  inset ${-x*5}px ${-y*5}px 20px rgba(0,245,255,.04);
    `;
    card.querySelector('.sk-glow-ring').style.opacity = '1';
  });
  card.addEventListener('mouseleave', ()=>{
    card.querySelector('.sk-front').style.boxShadow = '';
    card.querySelector('.sk-glow-ring').style.opacity = '';
  });
});

/* ═══════════════════════════════════════════
   GLITCH INTERVAL (random)
═══════════════════════════════════════════ */
(function(){
  function doGlitch(){
    document.querySelectorAll('.hn-glitch').forEach(el=>{
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    });
    setTimeout(()=>{
      document.querySelectorAll('.hn-glitch').forEach(el=>el.style.animation='');
    },300);
  }
  setInterval(doGlitch, 6000 + Math.random()*4000);
})();