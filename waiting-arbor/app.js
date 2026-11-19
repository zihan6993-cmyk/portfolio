const chapters = {
 research: [
 ['Site Analysis',[5,6],'Hospital surroundings and the relationship between urban context, everyday movement and the experience of waiting.'],
 ['Hospital Waiting Environments',[7,8,10,11],'An examination of existing waiting conditions and proposed changes to the hospital floor plan.'],
 ['User Behaviour',[9],'Different activities and needs suggest a range of spaces for privacy, quiet, movement and companionship.'],
 ['Emotional Research',[12,13],'Emotional experiences of waiting and a design scenario linking waiting time to crochet participation. The scenario is an estimate, not a measured outcome.'],
 ['Privacy Gradient',[14],'Changing material density and panel placement create different degrees of enclosure and visual connection.']
 ],
 making: [
 ['Nature-Inspired Design',[16],'Cactus logic informs ideas of protection, modular growth and adaptability.'],
 ['Form Evolution',[17,18],'Sketches and form studies translate natural inspiration into a family of spatial frames.'],
 ['Structure & Modules',[19,20],'Single, double and corner modules combine structural frames, perforated panels and crochet.'],
 ['Material Connections',[21],'Aluminium extrusion profiles and reusable connections support a flexible assembly system.'],
 ['Model Making',[22,23],'Physical prototyping tests frame construction, panel installation and material relationships.'],
 ['Rendering',[24,25,26],'Spatial views explore filtered light, textile enclosure and seating within the waiting environment.']
 ],
 stories: [
 ['Visual Storytelling',[28,29],'Drawing and moving-image studies examine the weight and emotional intensity of waiting.'],
 ['Site Observation',[30,31,32,33],'Hospital observations connect everyday gestures, institutional space and the passage of time.'],
 ['Time & Emotion',[34,35,36],'The Pressure of Time and The Elasticity of Waiting Time investigate how duration is experienced.'],
 ['Film Experimentation',[37,38],'Storyboards and sequences trace the seemingly simple act of moving from standing to sitting.'],
 ['From Object to Space',[39,40],'The rhythm of crochet-making develops into a spatial language of care and participation.']
 ]
};
const pageNames={1:'Portfolio cover',2:'Introduction',3:'Contents',4:'Part 1 / Context & Research',5:'Site Analysis',6:'Background',7:'Hospital Waiting Environment',8:'Hospital Waiting Environment',9:'User Behaviour',10:'Hospital Floor Plan / Before',11:'Hospital Floor Plan / After',12:'Emotions During Hospital Waiting',13:'Waiting Time × Crochet Participation',14:'Privacy Gradient',15:'Part 2 / Design Development & Making',16:'Cactus Logic',17:'Initial Form Evolution',18:'Form Exploration',19:'Structure Development',20:'Structure & Module',21:'Material & Connection Strategy',22:'Model Process',23:'Model Process',24:'Rendering',25:'Rendering',26:'Rendering',27:'Part 3 / Stories Through the Lens'};
for(let i=28;i<=40;i++)pageNames[i]='Stories Through the Lens';
Object.entries(chapters).forEach(([key,topics])=>{const host=document.getElementById(key+'-list');topics.forEach(([name,pages,description])=>{const detail=document.createElement('details');const summary=document.createElement('summary');const label=document.createElement('span');label.textContent=name;const range=document.createElement('span');range.className='summary-pages';range.textContent='p. '+pages.join(', ');summary.append(label,range);const body=document.createElement('div');body.className='study-body';const p=document.createElement('p');p.textContent=description;const grid=document.createElement('div');grid.className='source-grid';pages.forEach(n=>{const b=document.createElement('button');b.className='source-page';b.dataset.page=n;b.setAttribute('aria-label',`Open page ${n}: ${pageNames[n]}`);const img=document.createElement('img');img.src=`assets/p6-${n}.jpg`;img.alt=pageNames[n];img.loading='lazy';const caption=document.createElement('span');caption.textContent=`p. ${String(n).padStart(2,'0')} / ${pageNames[n]}`;b.append(img,caption);grid.append(b)});body.append(p,grid);detail.append(summary,body);host.append(detail)})});
const dialog=document.getElementById('reader'),image=document.getElementById('reader-image'),select=document.getElementById('page-select');let current=1,returnFocus;
for(let n=1;n<=40;n++){const op=document.createElement('option');op.value=n;op.textContent=n;select.append(op)}
function showPage(n){current=Math.max(1,Math.min(40,n));image.src=`assets/p6-${current}.jpg`;image.alt=`Portfolio page ${current}: ${pageNames[current]}`;select.value=current;document.getElementById('page-title').textContent=pageNames[current];document.getElementById('prev-page').disabled=current===1;document.getElementById('next-page').disabled=current===40;document.getElementById('image-error').hidden=true;}
document.addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(!b)return;returnFocus=b;showPage(Number(b.dataset.page));dialog.showModal();dialog.scrollTop=0;document.getElementById('close-reader').focus()});
document.getElementById('close-reader').onclick=()=>dialog.close();dialog.addEventListener('close',()=>returnFocus?.focus());document.getElementById('prev-page').onclick=()=>showPage(current-1);document.getElementById('next-page').onclick=()=>showPage(current+1);select.onchange=()=>showPage(Number(select.value));dialog.addEventListener('keydown',e=>{if(e.target.tagName==='SELECT')return;if(e.key==='ArrowRight'){e.preventDefault();showPage(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();showPage(current-1)}});image.onerror=()=>{document.getElementById('image-error').hidden=false};dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
const toggle=document.querySelector('.menu-toggle'),mobile=document.getElementById('mobile-nav');function closeMenu(){mobile.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu'}toggle.onclick=()=>{const open=toggle.getAttribute('aria-expanded')==='true';mobile.hidden=open;toggle.setAttribute('aria-expanded',String(!open));toggle.textContent=open?'Menu':'Close'};mobile.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('header nav a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}})},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('#index,#research,#making,#stories').forEach(el=>sectionObserver.observe(el));
