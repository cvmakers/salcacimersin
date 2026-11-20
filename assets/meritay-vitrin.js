/* Meritay Botanik storefront v4: interactive search, categories, and accessible mobile menu. */
(()=>{
'use strict';
const searchForm=document.querySelector('#product-search');
const searchInput=document.querySelector('#search-input');
const cards=[...document.querySelectorAll('.product-card')];
const status=document.querySelector('#search-result-msg');
const searchLookup={'gul':'gül','gul buketi':'gül buketi','kirmizi':'kırmızı','orkideler':'orkide','cicek':'çiçek','buket':'buket'};
function fold(s){return String(s||'').toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');}
function searchProducts(query,scroll=true){
 const q=fold(query.trim());let hits=0;
 cards.forEach(card=>{let ok=!q||fold(card.dataset.product).includes(q);card.hidden=!ok;if(ok)hits++});
 if(status){if(q&&!hits){status.hidden=false;status.textContent='“'+query+'” için ürün bulunamadı. WhatsApp üzerinden diğer çiçek seçeneklerini sorabilirsiniz.';}else if(q){status.hidden=false;status.textContent=hits+' çiçek seçeneği görüntüleniyor.';}else{status.hidden=true;status.textContent='';}}
 if(scroll)document.querySelector('#urunler')?.scrollIntoView({behavior:'smooth',block:'start'});
}
searchForm?.addEventListener('submit',e=>{e.preventDefault();searchProducts(searchInput?.value||'');});
const categories=document.querySelectorAll('.category-item[data-category]');
const filterMap={gul:'gul',pembe:'pembe',orkide:'orkide',mevsim:'mevsim',ozel:'pembe',celenk:''};
for(const link of categories){link.addEventListener('click',e=>{
 e.preventDefault();const k=link.dataset.category;categories.forEach(a=>a.classList.toggle('is-active',a===link));
 if(k==='celenk') {searchInput.value='';searchProducts('',false);location.hash='urunler';status.hidden=false;status.textContent='Çelenk seçenekleri için WhatsApp üzerinden mağazayla iletişime geçebilirsiniz.';document.querySelector('#urunler')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 const q=filterMap[k]||'';cards.forEach(card=>{card.hidden=!(card.dataset.kind===q)});status.hidden=true;if(searchInput)searchInput.value='';document.querySelector('#urunler')?.scrollIntoView({behavior:'smooth',block:'start'});
});}
const menuBtn=document.querySelector('.menu-trigger');const menuClose=document.querySelector('.menu-close');const menu=document.querySelector('#main-menu');const backdrop=document.querySelector('#mobile-menu-backdrop');
function toggleMenu(open){document.body.classList.toggle('menu-open',open);backdrop.hidden=!open;menu?.setAttribute('aria-hidden',String(!open));menuBtn?.setAttribute('aria-expanded',String(open));if(open){menuClose?.focus();}else{menuBtn?.focus();}}
menuBtn?.addEventListener('click',()=>toggleMenu(true));menuClose?.addEventListener('click',()=>toggleMenu(false));backdrop?.addEventListener('click',()=>toggleMenu(false));menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open'))toggleMenu(false);});
const date=document.querySelector('#date-choice');if(date){let d=new Date(),local=new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);date.min=local;}
})();
