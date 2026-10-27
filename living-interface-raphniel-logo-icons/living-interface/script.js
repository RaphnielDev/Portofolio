document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('.nav'),toggle=document.querySelector('.menu-toggle');
 if(toggle&&nav)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰'});
 const here=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('.nav a').forEach(a=>{if(a.getAttribute('href')===here)a.classList.add('active')});
 document.querySelectorAll('a[data-transition]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(!href||href.startsWith('#')||e.metaKey||e.ctrlKey)return;e.preventDefault();document.body.style.transition='opacity .22s, transform .22s';document.body.style.opacity='0';document.body.style.transform='translateY(6px)';setTimeout(()=>location.href=href,220)}));
 const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
 const orb=document.querySelector('.cursor-orb');if(orb&&matchMedia('(pointer:fine)').matches){document.addEventListener('mousemove',e=>{orb.style.left=e.clientX+'px';orb.style.top=e.clientY+'px';orb.classList.add('active')});document.addEventListener('mouseout',e=>{if(!e.relatedTarget)orb.classList.remove('active')});document.querySelectorAll('a,button,.skill-chip').forEach(el=>{el.addEventListener('mouseenter',()=>orb.style.width='42px');el.addEventListener('mouseleave',()=>orb.style.width='16px')})}
 const top=document.querySelector('.back-top');if(top){window.addEventListener('scroll',()=>top.classList.toggle('show',window.scrollY>500),{passive:true});top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))}
 const counters=document.querySelectorAll('[data-count]');if(counters.length){const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.count)||0,start=performance.now(),duration=900;function tick(now){const progress=Math.min((now-start)/duration,1);el.textContent=String(Math.round(target*(1-Math.pow(1-progress,3))));if(progress<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);counterObserver.unobserve(el)}),{threshold:.6});counters.forEach(el=>counterObserver.observe(el))}
 const ratings=document.querySelectorAll('[data-rating]');if(ratings.length){const ratingObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.rating)||4.8,start=performance.now(),duration=1100;function tick(now){const progress=Math.min((now-start)/duration,1),value=target*(1-Math.pow(1-progress,3));el.textContent=value.toFixed(1);if(progress<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);ratingObserver.unobserve(el)}),{threshold:.6});ratings.forEach(el=>ratingObserver.observe(el))}
 const year=document.querySelectorAll('[data-year]');year.forEach(el=>el.textContent=new Date().getFullYear());
});
// Reactive ambient interface: the glow follows pointer movement, softly and cheaply.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let frame = 0, x = innerWidth * .7, y = innerHeight * .3;
  const move = (event) => { x = event.clientX; y = event.clientY; if (frame) return; frame = requestAnimationFrame(() => {
    document.documentElement.style.setProperty('--pointer-x', `${x}px`);
    document.documentElement.style.setProperty('--pointer-y', `${y}px`);
    frame = 0;
  }); };
  if (matchMedia('(pointer:fine)').matches) window.addEventListener('pointermove', move, {passive:true});
})();
