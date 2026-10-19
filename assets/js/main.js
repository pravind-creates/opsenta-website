
document.addEventListener('DOMContentLoaded',()=>{
 const y=document.querySelectorAll('.year'); y.forEach(e=>e.textContent=new Date().getFullYear());
 const btn=document.querySelector('.menu-btn'), nav=document.querySelector('nav.main');
 if(btn&&nav){btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)})}
 // search
 const inputs=document.querySelectorAll('[data-search]');
 inputs.forEach(input=>{
   const box=input.parentElement.querySelector('.search-results');
   let idx=[];
   fetch('search-index.json').then(r=>r.json()).then(d=>idx=d).catch(()=>{});
   // also try relative from root pages (all at root)
   input.addEventListener('input',()=>{
     const q=input.value.trim().toLowerCase(); if(!box) return;
     if(q.length<2){box.style.display='none';box.innerHTML='';return}
     const hits=idx.filter(p=>(p.title+' '+p.description+' '+p.content).toLowerCase().includes(q)).slice(0,6);
     box.innerHTML=hits.length?hits.map(h=>`<a href="${h.url}"><strong>${h.title}</strong><br><small>${h.description}</small></a>`).join(''):'<a href="search.html">No quick match — try search page</a>';
     box.style.display='block';
   });
   input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();window.location.href='search.html?q='+encodeURIComponent(input.value)}});
   document.addEventListener('click',e=>{if(box&&!input.parentElement.contains(e.target)) box.style.display='none'});
 });
});
