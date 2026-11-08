// Мебелен конструктор — офлайн работа. Винаги първо мрежата (нова версия веднага), без интернет — последната свалена.
const C='mebeli-'+'a351941022';
const FILES=['./','index.html','manifest.webmanifest','libs/three.min.js','libs/OrbitControls.js','libs/jspdf.umd.min.js','icons/kraftplan-192.png','icons/kraftplan-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  const same=new URL(e.request.url).origin===location.origin;
  e.respondWith(fetch(e.request,same?{cache:'no-cache'}:{}).then(r=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))))});
