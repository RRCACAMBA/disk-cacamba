(() => {
  'use strict';
  const cfg = window.DISK_CONFIG || {};
  const params = new URLSearchParams(location.search);
  const trackedKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid'];
  const tracked = new URLSearchParams();
  trackedKeys.forEach(k => { if (params.get(k)) tracked.set(k, params.get(k)); });

  const sendEvent = (event, extra={}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event, ...extra});
  };
  const waUrl = message => `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(message || cfg.whatsappMessage || 'Olá!')}`;
  const checkoutUrl = size => {
    const url = new URL(cfg.checkoutUrl, location.href);
    tracked.forEach((v,k)=>url.searchParams.set(k,v));
    if(size) url.searchParams.set('cacamba',size);
    return url.toString();
  };
  document.querySelectorAll('.wa-link').forEach(a => {
    a.href = waUrl(); a.target='_blank'; a.rel='noopener';
    a.addEventListener('click',()=>sendEvent('whatsapp_click',{location:a.closest('section,header,footer')?.id||'page'}));
  });
  document.querySelectorAll('.checkout-link').forEach(a => {
    a.href = checkoutUrl();
    a.addEventListener('click',()=>sendEvent('checkout_click',{location:a.closest('section,header,footer')?.id||'page'}));
  });
  document.getElementById('ctaPhone').textContent = cfg.phoneDisplay || 'WhatsApp';
  document.getElementById('footerPhone').textContent = cfg.phoneDisplay || '';
  document.getElementById('addressText').textContent = cfg.address || '';
  document.getElementById('footerAddress').textContent = cfg.address || '';

  const sizes = [
    {size:'3 m³',dims:['1,80 m comp.','1,20 m larg.','1,10 m alt.'],use:'Pequenas limpezas e reformas.',tag:'Compacta'},
    {size:'4 m³',dims:['2,10 m comp.','1,50 m larg.','1,10 m alt.'],use:'Reformas residenciais e limpeza.',tag:'Versátil'},
    {size:'5 m³',dims:['2,40 m comp.','1,70 m larg.','1,20 m alt.'],use:'Reformas em geral e maior volume.',tag:'Mais pedida',featured:true},
    {size:'7 m³',dims:['2,90 m comp.','1,90 m larg.','1,20 m alt.'],use:'Obras médias e grandes reformas.',tag:'Maior volume'},
    {size:'10 m³',dims:['2,50 m comp.','1,90 m larg.','1,40 m alt.'],use:'Grandes obras e construções.',tag:'Obras grandes'},
    {size:'16 m³',dims:['4,10 m comp.','2,90 m larg.','1,60 m alt.'],use:'Grandes volumes e demolições.',tag:'Sob consulta',consult:true}
  ];
  const grid = document.getElementById('dumpsterGrid');
  grid.innerHTML = sizes.map(s => `<article class="dumpster-card ${s.featured?'featured':''}">${s.featured?'<span class="popular-tag">MAIS PEDIDA</span>':''}<div class="dumpster-visual"><img src="cacamba.webp?v=20" width="380" height="230" loading="lazy" alt="Caçamba amarela Disk Caçamba ${s.size}"></div><div class="dumpster-body"><div class="dumpster-title"><h3>${s.size}</h3><span>${s.tag}</span></div><div class="dimensions">${s.dims.map(d=>`<span>${d}</span>`).join('')}</div><p>${s.use}</p><a class="button button-book size-checkout" data-size="${s.size}" href="#"><span>${s.consult?'Consultar':'Reservar esta caçamba'}</span><small>${s.consult?'Via WhatsApp':'Ir para o checkout'}</small></a></div></article>`).join('');
  document.querySelectorAll('.size-checkout').forEach(a=>{
    const size=a.dataset.size;
    if(size==='16 m³'){a.href=waUrl(`Olá! Gostaria de consultar a caçamba de ${size}. Meu bairro/CEP é: `);a.target='_blank'}else{a.href=checkoutUrl(size)}
    a.addEventListener('click',()=>sendEvent(size==='16 m³'?'whatsapp_size_click':'checkout_size_click',{size}));
  });

  const subprefs=['Aricanduva/Formosa','Butantã','Campo Limpo','Capela do Socorro','Casa Verde/Cachoeirinha','Cidade Ademar','Cidade Tiradentes','Ermelino Matarazzo','Freguesia/Brasilândia','Guaianases','Ipiranga','Itaim Paulista','Itaquera','Jabaquara','Jaçanã/Tremembé','Lapa','M’Boi Mirim','Mooca','Parelheiros','Penha','Perus/Anhanguera','Pinheiros','Pirituba/Jaraguá','Santana/Tucuruvi','Santo Amaro','São Mateus','São Miguel Paulista','Sapopemba','Sé','Vila Maria/Vila Guilherme','Vila Mariana','Vila Prudente'];
  document.getElementById('subprefList').innerHTML=subprefs.map(x=>`<span>${x}</span>`).join('');

  const faqs=[
    ['Qual é o prazo de entrega?','O prazo depende da região, do trânsito e da disponibilidade operacional. A equipe confirma a previsão antes da contratação.'],
    ['Posso colocar a caçamba na rua?','A possibilidade depende das regras locais e das condições do endereço. Informe o local para receber a orientação adequada.'],
    ['Quais materiais posso descartar?','Informe o tipo de resíduo antes da reserva. Materiais perigosos, líquidos e itens com destinação especial podem não ser permitidos.'],
    ['Quanto tempo posso ficar com a caçamba?','O período é informado no orçamento e pode variar de acordo com o serviço escolhido.'],
    ['Como funciona o pagamento?','As formas disponíveis são apresentadas no checkout ou informadas pela equipe antes da confirmação.'],
    ['A retirada é automática?','A retirada segue o prazo combinado. Quando necessário, confirme com a equipe pelo WhatsApp.'],
    ['Atendem condomínios e empresas?','Sim, mediante consulta do endereço, acesso e necessidade do serviço.'],
    ['As medidas são exatas?','São medidas aproximadas. O formato pode variar conforme o equipamento disponibilizado.']
  ];
  document.getElementById('faqList').innerHTML=faqs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');

  const menuBtn=document.querySelector('.menu-toggle'), menu=document.querySelector('.mobile-menu');
  menuBtn.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));

  document.getElementById('leadForm').addEventListener('submit',e=>{
    e.preventDefault(); const fd=new FormData(e.currentTarget);
    const msg=`Olá! Vim pelo site da Disk Caçamba.\nNome: ${fd.get('name')}\nBairro/CEP: ${fd.get('location')}\nTamanho: ${fd.get('size')}\nGostaria de consultar disponibilidade.`;
    sendEvent('lead_form_submit',{size:fd.get('size')}); window.open(waUrl(msg),'_blank','noopener');
  });

  const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const back=document.querySelector('.back-top');
  addEventListener('scroll',()=>back.classList.toggle('show',scrollY>700),{passive:true});
  back.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  const schema={"@context":"https://schema.org","@type":"LocalBusiness","name":cfg.companyName,"telephone":cfg.phoneDisplay,"address":{"@type":"PostalAddress","streetAddress":"R. Teodureto de Camargo, 28","addressLocality":"São Paulo","addressRegion":"SP","postalCode":"02543-130","addressCountry":"BR"},"areaServed":cfg.serviceArea,"url":location.origin};
  document.getElementById('schemaJson').textContent=JSON.stringify(schema);
})();
