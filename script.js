const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
menuToggle?.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const eventDate=new Date("2026-11-05T10:00:00+05:30").getTime();
function updateCountdown(){
  const now=Date.now(), diff=eventDate-now;
  const d=document.getElementById("days"),h=document.getElementById("hours"),m=document.getElementById("minutes"),s=document.getElementById("seconds");
  if(diff<=0){d.textContent="000";h.textContent="00";m.textContent="00";s.textContent="00";return}
  d.textContent=String(Math.floor(diff/86400000)).padStart(3,"0");
  h.textContent=String(Math.floor(diff%86400000/3600000)).padStart(2,"0");
  m.textContent=String(Math.floor(diff%3600000/60000)).padStart(2,"0");
  s.textContent=String(Math.floor(diff%60000/1000)).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const progress=document.getElementById("progressBar");
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?(window.scrollY/max)*100:0)+"%";
},{passive:true});
