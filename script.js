(() => {
  const cfg = window.DISK_CONFIG || {};
  const whatsapp = String(cfg.whatsappNumber || '5511926336542').replace(/\D/g, '');
  const checkout = cfg.checkoutUrl || 'https://disk-cacamba-production.up.railway.app/';
  const params = new URLSearchParams(location.search);
  const trackingKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid'];
  const tracking = {}; trackingKeys.forEach(k=>{if(params.get(k)) tracking[k]=params.get(k)});
  try{ if(Object.keys(tracking).length) localStorage.setItem('disk_tracking', JSON.stringify(tracking)); }catch(e){}
  function savedTracking(){ try{return {...JSON.parse(localStorage.getItem('disk_tracking')||'{}'),...tracking}}catch(e){return tracking} }
  function track(event, extra={}){ window.dataLayer=window.dataLayer||[]; window.dataLayer.push({event,...extra}); }
  document.querySelectorAll('.track-whatsapp').forEach(el=>el.addEventListener('click',ev=>{
    ev.preventDefault(); const msg=el.dataset.message||'Olá! Quero um orçamento para caçamba.';
    track('whatsapp_click',{placement:el.textContent.trim()});
    location.href=`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
  }));
  function checkoutUrl(size){ const u=new URL(checkout); Object.entries(savedTracking()).forEach(([k,v])=>u.searchParams.set(k,v)); if(size)u.searchParams.set('tamanho',size); return u.toString(); }
  document.querySelectorAll('.track-checkout').forEach(el=>el.addEventListener('click',ev=>{ev.preventDefault();track('checkout_click',{placement:el.textContent.trim()});location.href=checkoutUrl();}));
  document.querySelectorAll('.card-action').forEach(el=>el.addEventListener('click',()=>{const size=el.dataset.size;track('checkout_size_click',{size});location.href=checkoutUrl(size);}));
  const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();