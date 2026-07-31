(()=>{
const c=window.DISK_CONFIG;
const sizes=[
{m:'3',dims:['1,80 m','1,20 m','1,10 m'],use:'Pequenas limpezas e reformas.'},
{m:'4',dims:['2,10 m','1,50 m','1,10 m'],use:'Reformas residenciais.'},
{m:'5',dims:['2,40 m','1,70 m','1,20 m'],use:'Reformas em geral.',popular:true},
{m:'7',dims:['2,90 m','1,90 m','1,20 m'],use:'Obras médias e grandes.'},
{m:'10',dims:['3,50 m','2,00 m','1,45 m'],use:'Grandes obras e construções.'},
{m:'16',dims:['4,10 m','2,30 m','1,60 m'],use:'Grandes volumes e demolições.',consult:true}
];
const subprefs=['Aricanduva/Formosa','Butantã','Campo Limpo','Capela do Socorro','Casa Verde/Cachoeirinha','Cidade Ademar','Cidade Tiradentes','Ermelino Matarazzo','Freguesia/Brasilândia','Guaianases','Ipiranga','Itaim Paulista','Itaquera','Jabaquara','Jaçanã/Tremembé','Lapa','M’Boi Mirim','Mooca','Parelheiros','Penha','Perus','Pinheiros','Pirituba/Jaraguá','Santana/Tucuruvi','Santo Amaro','São Mateus','São Miguel Paulista','Sapopemba','Sé','Vila Maria/Vila Guilherme','Vila Mariana','Vila Prudente'];
const cards=document.getElementById('sizeCards');
cards.innerHTML=sizes.map(s=>`<article class="card ${s.popular?'popular':''}">${s.popular?'<span class="badge">MAIS PEDIDA</span>':''}<div class="card-visual"><img src="cacamba.webp?v=10" alt="Caçamba de ${s.m} metros cúbicos" width="760" height="460"></div><div class="card-body"><h3>${s.m} m³</h3><div class="dims"><span>${s.dims[0]}<br>compr.</span><span>${s.dims[1]}<br>larg.</span><span>${s.dims[2]}<br>alt.</span></div><p>${s.use}</p><a class="btn ${s.consult?'wa-size':'checkout-size'}" data-size="${s.m}" href="#">${s.consult?'CONSULTAR':'RESERVAR'}</a></div></article>`).join('');
document.getElementById('subprefs').innerHTML=subprefs.map(x=>`<span>${x}</span>`).join('');
const query=new URLSearchParams(location.search);const tracked=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid'];const keep=new URLSearchParams();tracked.forEach(k=>query.get(k)&&keep.set(k,query.get(k)));
const wa=(msg=c.defaultMessage)=>`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(msg)}`;
document.querySelectorAll('.wa-link').forEach(a=>a.href=wa());
document.querySelectorAll('.checkout-link').forEach(a=>{const u=new URL(c.checkout);keep.forEach((v,k)=>u.searchParams.set(k,v));a.href=u});
document.querySelectorAll('.checkout-size').forEach(a=>{const u=new URL(c.checkout);u.searchParams.set('tamanho',a.dataset.size);keep.forEach((v,k)=>u.searchParams.set(k,v));a.href=u});
document.querySelectorAll('.wa-size').forEach(a=>a.href=wa(`Olá! Gostaria de consultar uma caçamba de ${a.dataset.size} m³.`));
document.getElementById('phone').textContent=c.whatsappDisplay;document.getElementById('address').textContent=c.address;document.getElementById('footerAddress').textContent=c.address;
const btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open))});document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
})();
