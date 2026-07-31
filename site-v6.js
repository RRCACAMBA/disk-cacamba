(function(){
  const cfg=window.DISK_CONFIG||{};
  const preserve=new URLSearchParams(location.search);
  const tracked=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','gbraid','wbraid'];
  function withTracking(raw){const u=new URL(raw,location.href);tracked.forEach(k=>{const v=preserve.get(k);if(v)u.searchParams.set(k,v)});return u.toString()}
  function waUrl(extra=''){const msg=[cfg.defaultMessage,extra].filter(Boolean).join(' ');return `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(msg)}`}
  document.querySelectorAll('.js-wa').forEach(a=>{a.href=waUrl();a.target='_blank';a.rel='noopener'});
  document.querySelectorAll('.js-checkout').forEach(a=>{const size=a.dataset.size;let url=withTracking(cfg.checkoutUrl);if(size){const u=new URL(url);u.searchParams.set('tamanho',size);url=u.toString()}a.href=url});
  document.querySelectorAll('.phone-text').forEach(el=>el.textContent=cfg.whatsappDisplay);
  document.querySelectorAll('.address-text').forEach(el=>el.textContent=cfg.address);
  const btn=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
  btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open))});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
})();
