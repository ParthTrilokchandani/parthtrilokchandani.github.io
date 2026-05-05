/* ── CURSOR ── */
const cursor=document.getElementById('cursor'),cursorDot=document.getElementById('cursorDot');
document.addEventListener('mousemove',e=>{
  cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
  cursorDot.style.left=e.clientX+'px';cursorDot.style.top=e.clientY+'px';
});
document.querySelectorAll('a,button,input').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.style.transform='translate(-50%,-50%) scale(2)');
  el.addEventListener('mouseleave',()=>cursor.style.transform='translate(-50%,-50%) scale(1)');
});

/* ── MATRIX RAIN ── */
const canvas=document.getElementById('matrix-canvas'),ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight});
const chars='01アイウエカキサシスABCDEFGHIJ';
const cols=Math.floor(canvas.width/20),drops=Array(cols).fill(1);
function drawMatrix(){
  ctx.fillStyle='rgba(4,8,15,0.05)';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#00f0ff';ctx.font='13px "Share Tech Mono",monospace';
  for(let i=0;i<drops.length;i++){
    ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*20,drops[i]*20);
    if(drops[i]*20>canvas.height&&Math.random()>0.975)drops[i]=0;
    drops[i]++;
  }
}
setInterval(drawMatrix,65);

/* ── SCROLL REVEAL ── */
const revealEls=document.querySelectorAll('.reveal');
new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('visible'),i*65)});
},{threshold:0.08}).observe&&revealEls.forEach(el=>{
  new IntersectionObserver(([e])=>{if(e.isIntersecting){e.target.classList.add('visible');}},{threshold:0.08}).observe(el);
});

/* ── SKILL BARS ── */
const fills=document.querySelectorAll('.skill-bar-fill');
const fillObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){setTimeout(()=>e.target.style.width=e.target.dataset.width+'%',200);fillObs.unobserve(e.target);}
  });
},{threshold:0.3});
fills.forEach(f=>fillObs.observe(f));

/* ── ACTIVE NAV ── */
const sections=document.querySelectorAll('section[id]'),navAs=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-80)cur=s.id;});
  navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

/* ── INTERACTIVE TERMINAL ── */
(function(){
  const output=document.getElementById('termOutput');
  const input=document.getElementById('termInput');
  if(!output||!input)return;

  const commands={
    help:{
      run:()=>[
        {cls:'t-cyan',txt:'  Available commands:'},
        {cls:'t-out', txt:'  whoami      — profile overview'},
        {cls:'t-out', txt:'  skills      — technical skills list'},
        {cls:'t-out', txt:'  certs       — certifications'},
        {cls:'t-out', txt:'  experience  — work history'},
        {cls:'t-out', txt:'  projects    — key projects'},
        {cls:'t-out', txt:'  ctf         — CTF achievements'},
        {cls:'t-out', txt:'  contact     — get in touch'},
        {cls:'t-out', txt:'  clear       — clear terminal'},
      ]
    },
    whoami:{
      run:()=>[
        {cls:'t-bright',txt:'  Cyber Security Specialist'},
        {cls:'t-out',   txt:'  Role    : Associate Information Security Officer'},
        {cls:'t-out',   txt:'  Company : DigiTruce'},
        {cls:'t-out',   txt:'  Degree  : MSc Cyber Security & Digital Forensics'},
        {cls:'t-out',   txt:'  Uni     : Rashtriya Raksha University'},
        {cls:'t-cyan',  txt:'  Cert    : CEH V12 — EC-Council'},
        {cls:'t-grn',   txt:'  Status  : Open to Work'},
      ]
    },
    skills:{
      run:()=>[
        {cls:'t-cyan',  txt:'  Technical Skills:'},
        {cls:'t-out',   txt:'  [90%] Memory Forensics (Volatility 3)'},
        {cls:'t-out',   txt:'  [92%] OSINT & Reconnaissance'},
        {cls:'t-out',   txt:'  [88%] Penetration Testing / VAPT'},
        {cls:'t-out',   txt:'  [88%] Dark Web / Tor Investigation'},
        {cls:'t-out',   txt:'  [88%] Python'},
        {cls:'t-out',   txt:'  [85%] Threat Intelligence'},
        {cls:'t-out',   txt:'  [82%] ISO 27001 Auditing'},
        {cls:'t-out',   txt:'  [80%] Bash / Shell Scripting'},
      ]
    },
    certs:{
      run:()=>[
        {cls:'t-cyan',  txt:'  Certifications:'},
        {cls:'t-grn',   txt:'  [✓] Certified Ethical Hacker V12 — EC-Council'},
        {cls:'t-grn',   txt:'  [✓] Certified Linux Investigator — Linux Academy'},
        {cls:'t-grn',   txt:'  [✓] Belkasoft Android Forensics — Intl Level 2024'},
        {cls:'t-grn',   txt:'  [✓] Cyber Threat Intelligence 101 — arcX'},
        {cls:'t-grn',   txt:'  [✓] Ethical Hacking & Pentesting — C-DAC (Govt)'},
        {cls:'t-grn',   txt:'  [✓] Cloud Computing (Intro) — EC-Council'},
        {cls:'t-grn',   txt:'  [✓] Cybersecurity Essentials — Cisco'},
        {cls:'t-cyan',  txt:'  [~] CRTA — CyberWarFare Labs (Pursuing)'},
        {cls:'t-cyan',  txt:'  [~] ISO 27001 Lead Auditor (Pursuing)'},
        {cls:'t-yellow',txt:'  [ ] CompTIA Security+ (Planned)'},
      ]
    },
    experience:{
      run:()=>[
        {cls:'t-cyan',  txt:'  Work History:'},
        {cls:'t-grn',   txt:'  [Current] Associate Information Security Officer'},
        {cls:'t-out',   txt:'            DigiTruce · Dec 2025 – Present'},
        {cls:'t-out',   txt:'  [Past]    Cyber Security Trainer'},
        {cls:'t-out',   txt:'            Tech Defence Solutions · Nov 2024 – Nov 2025'},
        {cls:'t-out',   txt:'  [Past]    Cyber Security Solution Architect'},
        {cls:'t-out',   txt:'            Raamaya Technologies · May 2024 – Nov 2024'},
        {cls:'t-out',   txt:'  [Past]    Cyber Range & VAPT — MCTE · Feb–May 2024'},
        {cls:'t-out',   txt:'  [Past]    Cyber Security Intern'},
        {cls:'t-out',   txt:'            Cyber Secured India · Nov 2022 – Feb 2023'},
      ]
    },
    projects:{
      run:()=>[
        {cls:'t-cyan',  txt:'  Key Projects:'},
        {cls:'t-bright',txt:'  [1] Dark Web Investigation & Volatility Plugin'},
        {cls:'t-out',   txt:'      Python · Volatility 3 · Tor Forensics · DFIR'},
        {cls:'t-bright',txt:'  [2] Cyber Range Platform'},
        {cls:'t-out',   txt:'      Military-grade Cyber Range'},
        {cls:'t-bright',txt:'  [3] CTF Challenge Design Suite'},
        {cls:'t-out',   txt:'      National-level competition CTF framework'},
        {cls:'t-bright',txt:'  [4] Custom Port Scanner'},
        {cls:'t-out',   txt:'      Python · Banner grabbing · Recon tool'},
      ]
    },
    ctf:{
      run:()=>[
        {cls:'t-cyan',  txt:'  CTF & Competition Achievements:'},
        {cls:'t-yellow',txt:'  🥇 4th — STANDOFF CTF (International Level)'},
        {cls:'t-yellow',txt:'  🎯 TryHackMe — Top 2% Globally'},
        {cls:'t-yellow',txt:'  🏅 8th — 1337 CTF, Rashtriya Raksha University'},
        {cls:'t-yellow',txt:'  🥈 2nd — Coddies TECHAEON (National)'},
        {cls:'t-out',   txt:'  Also: CTF Designer @ MCTE military training'},
      ]
    },
    contact:{
      run:()=>[
        {cls:'t-cyan',  txt:'  Get in touch:'},
        {cls:'t-bright',txt:'  Email   : parthtrilokchandani@gmail.com'},
        {cls:'t-bright',txt:'  GitHub  : github.com/ParthTrilokchandani'},
        {cls:'t-bright',txt:'  LinkedIn: linkedin.com/in/parth-trilokchandani'},
        {cls:'t-bright',txt:'  THM     : tryhackme.com/p/AgentP2026'},
        {cls:'t-grn',   txt:'  Status  : Open to Opportunities'},
      ]
    },
    clear:{
      run:()=>null
    }
  };

  function addLine(cls,txt){
    const span=document.createElement('span');
    span.className='t-line '+cls;
    span.textContent=txt;
    output.appendChild(span);
  }

  function addGap(){
    const g=document.createElement('span');
    g.className='t-gap';
    output.appendChild(g);
  }

  function scrollBottom(){
    output.scrollTop=output.scrollHeight;
  }

  input.addEventListener('keydown',function(e){
    if(e.key!=='Enter')return;
    const raw=input.value.trim().toLowerCase();
    input.value='';
    if(!raw)return;

    // echo the typed command
    addGap();
    const cmdLine=document.createElement('span');
    cmdLine.className='t-line';
    cmdLine.innerHTML=`<span class="t-prompt">kali@cyberops</span>:~$ <span class="t-cmd">${raw}</span>`;
    output.appendChild(cmdLine);

    const cmd=commands[raw];
    if(!cmd){
      addLine('t-red','  bash: '+raw+': command not found');
      addLine('t-out','  Type "help" to see available commands.');
    } else if(raw==='clear'){
      output.innerHTML='';
      addLine('t-out','  Terminal cleared. Type "help" for commands.');
    } else {
      const lines=cmd.run();
      if(lines){lines.forEach(l=>addLine(l.cls,l.txt));}
    }

    addGap();
    scrollBottom();
  });

  // Focus terminal input when clicking terminal area
  document.querySelector('.hero-terminal').addEventListener('click',()=>input.focus());
})();

/* ── HAMBURGER MENU ── */
(function(){
  const hamburger=document.getElementById('navHamburger');
  const mobileNav=document.getElementById('mobileNav');
  if(!hamburger||!mobileNav)return;
  hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',()=>{
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
  // Close on outside click
  document.addEventListener('click',e=>{
    if(!hamburger.contains(e.target)&&!mobileNav.contains(e.target)){
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });
})();
