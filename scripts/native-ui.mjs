import {notificationGlyph} from '../notification-centre.js';
import {homeMarkup,homeMaterialMarkup} from '../native-home.js';
import {nativeText} from '../native-text.js';
import {calendarAge} from '../application-age.js';
export const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const icon=(name,size=20)=>{
 const paths={home:'M3 10 12 3l9 7v11h-6v-7H9v7H3Z',menu:'M3 5h18M3 12h18M3 19h18',external:'M8 4h12v12M20 4 5 19',minus:'M5 12h14',max:'M5 5h14v14H5Z',close:'m6 6 12 12M18 6 6 18',back:'m14 5-7 7 7 7',next:'m10 5 7 7-7 7',expand:'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5',pause:'M8 5v14M16 5v14',play:'m8 5 11 7-11 7Z'};
 return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.home}"/></svg>`;
};
const themes=(model,theme)=>`<div class="theme-control"><button type="button" class="theme-trigger" data-toggle-theme aria-label="Global appearance: ${esc(model.themes.find(t=>t.id===theme).name)}" aria-haspopup="menu" aria-expanded="false" aria-controls="appearance-menu"><img data-theme-icon src="assets/native/navigation/${theme}-suture.png" width="22" height="22" alt=""><svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 8 4 4 4-4"/></svg></button><div class="theme-menu" id="appearance-menu" role="menu" aria-label="Global appearance" hidden>${model.themes.map(t=>`<button type="button" role="menuitemradio" data-theme-choice="${t.id}" aria-checked="${t.id===theme}" tabindex="-1"><img src="assets/native/navigation/${t.id}-suture.png" width="20" height="20" alt=""><span>${nativeText(t.name,{width:100,height:30,size:12})}</span><svg class="theme-check" width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="m5 10 3.5 3.5 7-7.5"/></svg></button>`).join('')}</div></div>`;
const navIcon=(key)=>`<span class="native-nav-icon" style="--nav-icon:url('assets/native/navigation/${key}.svg')" aria-hidden="true"></span>`;
// Match the three paths and the 52/80 paint scale of the desktop _LivingLogo.
const infoLayers = [
 'M8 28.5 41 8.5 Q43.5 7 46.5 8.5 L62.5 17.5 33.5 34.5 Q25 39.5 18 35 Z',
 'M8 45 20 38.5 Q27.5 44 35.5 39.5 L55.5 28 Q57.5 27 59.5 28 L70.5 34 40.5 51.5 Q31.5 57 24 53 Z',
 'M18 62 30 55 Q38 60 46 55.5 L63 46 Q64.5 45 66 46 L74 51 47 67 Q39 72 32 68 Z',
];

function infoLogo(){
 const faces=infoLayers.map((path,index)=>`<g class="info-layer" style="--lift:${(index-1)*2}px">
  <path d="${path}" fill="#383941" transform="translate(0 1.5)"/>
  <path d="${path}" fill="url(#info-metal)" stroke="var(--info-shade)" stroke-width=".65"/>
  <path d="${path}" fill="url(#info-sheen)"/>
 </g>`).join('');
 return `<svg class="info-logo" width="62" height="62" viewBox="0 0 62 62" aria-hidden="true">
  <defs>
   <radialGradient id="info-halo"><stop stop-color="var(--info-shade)" stop-opacity=".12"/><stop offset="1" stop-color="var(--info-shade)" stop-opacity="0"/></radialGradient>
   <linearGradient id="info-metal" gradientUnits="userSpaceOnUse" x1="14" y1="66" x2="57" y2="8">
    <stop stop-color="color-mix(in srgb,var(--info-shade) 72%,#25202d)"/><stop offset=".42" stop-color="color-mix(in srgb,var(--info-shade) 85%,#fff8f0)"/>
    <stop offset=".76" stop-color="color-mix(in srgb,var(--info-shade) 58%,#fff8f0)"/><stop offset="1" stop-color="color-mix(in srgb,var(--info-shade) 38%,#fff8f0)"/>
   </linearGradient>
   <linearGradient id="info-sheen" gradientUnits="userSpaceOnUse" x1="-90" y1="0" x2="-40" y2="12">
    <stop stop-color="#fffaf4" stop-opacity="0"/><stop offset=".5" stop-color="#fffaf4" stop-opacity=".53"/><stop offset="1" stop-color="#fffaf4" stop-opacity="0"/>
    <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="225 0" dur="6.6s" repeatCount="indefinite"/>
   </linearGradient>
  </defs>
  <g transform="translate(5 5) scale(.65)"><circle cx="40" cy="38" r="39" fill="url(#info-halo)"/>${faces}</g>
 </svg>`;
}

function information(model){
 const copy=[
  ['A collection of engineering applications purpose-built for real workflows, real data, and real decisions.',64],
  ['Each application is designed to reduce repetition, surface what matters, and make complex engineering work clearer, faster, and more reliable.',80],
 ].map(([text,height])=>`<div class="info-copy">${nativeText(text,{width:170,height,size:12,wrap:true,top:true,lineHeight:16/12})}</div>`).join('');
 const fields=[['VERSION','Pentimento'],['APPLICATIONS',model.apps.length],['STARTED','August 2022'],['AGE',calendarAge()],['UPDATED','November 2026']];
 const rows=fields.map(([key,value])=>`<div><dt>${nativeText(key,{width:67,height:17,size:9})}</dt><dd${key==='AGE'?' data-info-age':''}>${nativeText(value,{width:99,height:17,size:11.5})}</dd></div>`).join('');
 const links=[['website','latticesbygene.com','https://latticesbygene.com/'],['support','weigenekhor@gmail.com','mailto:weigenekhor@gmail.com']];
 const contacts=links.map(([kind,label,url])=>`<a class="info-link info-${kind}" href="${url}" title="${url}"><i aria-hidden="true"></i>${nativeText(label,{width:119,height:27,size:9.73})}<i class="info-external" aria-hidden="true"></i></a>`).join('');
 return `<div class="info-live"><div class="info-introduction">${infoLogo()}
  <div class="info-wordmark"><svg viewBox="0 0 170 36" role="img" aria-label="LATTICES"><text x="85" y="26" text-anchor="middle">LATTICES</text></svg></div>
  <div class="info-edition">${nativeText('PENTIMENTO',{width:170,height:21,size:10,letterSpacing:2.6,align:'center'})}</div><hr>${copy}</div>
  <div class="info-footer"><dl>${rows}</dl><hr>${contacts}</div></div>`;
}
const notifications=()=>`<div class="notification-control-wrap"><button type="button" class="window-control notification-control" data-notifications aria-label="Notifications" aria-expanded="false" aria-haspopup="dialog" aria-controls="notification-centre"><span data-notification-bell>${notificationGlyph('bell',22)}</span><span data-notification-badge hidden></span></button><section id="notification-centre" class="notification-centre" data-notification-panel role="dialog" aria-labelledby="notification-heading" aria-describedby="notification-preview-description" hidden><header><span class="notification-header-icon" data-notification-header-icon>${notificationGlyph('bell',22)}</span><h3 id="notification-heading">Notifications</h3><span data-notification-count hidden></span><span class="notification-header-spacer"></span><button type="button" data-notifications-enabled aria-label="All notifications" aria-pressed="true" title="Turn website preview notifications on or off">${notificationGlyph('bell',16)}<span>On</span></button><button type="button" class="notification-icon-button" data-read-notifications aria-label="Mark all notifications as read" title="Mark all as read">${notificationGlyph('read')}</button><button type="button" class="notification-icon-button" data-close-notifications aria-label="Close notifications" title="Close notifications">${notificationGlyph('close')}</button></header><div class="notification-divider"></div><div class="notification-toolbar"><div role="group" aria-label="Notification filters"><button type="button" data-notification-filter="all" aria-pressed="true">All</button><button type="button" data-notification-filter="unread" aria-pressed="false">Unread</button></div><button type="button" data-delete-notifications>Delete all</button></div><ul data-notification-list aria-label="Sample notifications"></ul><span class="sr-only" id="notification-preview-description">Sample notifications illustrate the desktop interface. This website does not monitor equipment.</span><span class="sr-only" role="status" data-notification-status></span></section></div>`;

function nativeWindow(model,layouts,mode,theme='pentimento'){
 const range=mode==='legacy'?'Iâ€“IV':'Vâ€“VI',label=mode==='legacy'?'Legacy':'Pentimento';
 const sidebar=model.expeditions.map(e=>e.apps.map(id=>{
  const a=model.apps.find(a=>a.id===id);
  return `<button type="button" data-locate-app="${id}" data-mode="${e.mode}" aria-label="Open ${esc(a.name)} desktop layout">${navIcon(a.sourceKey)}<span>${nativeText(a.name,{width:168,height:40,size:13.333})}</span></button>`;
 }).join('')).join('');
 return `<div class="product-state" data-edition="${mode}"><div class="state-arrival"><p class="state-identifier"><span data-mode-label>${nativeText(label,{width:mode==='legacy'?50:84,height:24,size:11,weight:500,letterSpacing:.66,family:'Geist'})}</span><small>${nativeText('Edition',{width:36,height:24,size:11,family:'Geist'})}</small></p><div class="product-viewport"><div class="app-shell" role="group" data-theme="${theme}" data-mode="${mode}" aria-label="${label} LATTICES application">
 <nav class="app-sidebar" aria-label="Application navigation"><div class="sidebar-brand"><a href="#top" class="title-logo" aria-label="LATTICES"><img src="assets/brand/lattices-symbol.svg" alt="" width="28" height="28"></a><span>${nativeText('LATTICES',{width:159,height:44,size:12.5*4/3,weight:600,letterSpacing:.7})}</span></div><div class="sidebar-scroll"><button type="button" data-expand-nav aria-label="Expand application navigation" aria-expanded="false">${navIcon('menu')}<span>${nativeText('Hide',{width:168,height:40,size:13.333})}</span></button><button type="button" data-home aria-label="Home" title="Home" aria-current="page">${navIcon('home')}<span>${nativeText('Home',{width:168,height:40,size:13.333})}</span></button><div class="sidebar-apps">${sidebar}</div><button class="sidebar-settings" type="button" data-settings aria-label="Application Info" title="Application Info" aria-expanded="false"> ${navIcon('application-info')}<span>${nativeText('Application Info',{width:168,height:40,size:13.333})}</span></button></div></nav>
 <aside class="settings-drawer" id="application-info-${mode}" aria-label="Application Info" aria-hidden="true" inert><header class="info-header"><span>${nativeText('Application Info',{width:150,height:44,size:12,weight:600})}</span><button type="button" data-close-info aria-label="Close Application Info">${icon('close',19)}</button></header><div class="info-scroll">${information(model)}</div></aside>
 <header class="app-titlebar"><p class="app-greeting">${nativeText('Welcome to LATTICES.',{width:300,height:44,size:12,weight:600})}</p><div class="window-controls"><button class="mode-control" type="button" data-cycle-mode aria-label="Focus ${mode==='legacy'?'Pentimento':'Legacy'}"><span data-mode-range>${nativeText(range,{width:42,height:23,size:11,weight:600,align:'center'})}</span><span data-mode-name>${nativeText(label,{width:65,height:30,size:11,weight:600,align:'center'})}</span></button>${themes(model,theme)}${notifications()}<i class="control-divider" aria-hidden="true"></i><a class="window-control website-control" href="#principle" aria-label="Explore the LATTICES website">${icon('external')}</a><i class="control-divider" aria-hidden="true"></i>${['minus','max','close'].map((n,i)=>`<button type="button" class="window-control desktop-only" disabled aria-label="${['Minimize','Maximize','Close'][i]} (desktop only)">${icon(n)}</button>`).join('')}</div></header>
 ${homeMaterialMarkup(layouts,`${theme}-${mode}-closed`)}<div class="app-content"><div class="app-home">${homeMarkup(model,layouts,`${theme}-${mode}-closed`)}</div></div><footer class="app-status"><span aria-hidden="true"></span><span data-product-status>${nativeText('Pentimento',{width:65,height:21,size:11,align:'right'})}</span></footer></div></div>
 </div></div>`;
}
export function nativeShell(model,layouts){
 const markup=`<div class="hero-sequence"><div class="product-stage"><div class="product-environment" aria-hidden="true"><i class="pentimento-atmosphere"></i><i class="origin-atmosphere"></i></div><div class="mobile-product"><p class="mobile-edition">Pentimento <span>Edition</span></p><img src="assets/hero/tenebrismo-1229.webp?v=20261120-lattices" srcset="assets/hero/tenebrismo-1229.webp?v=20261120-lattices 1229w, assets/hero/tenebrismo-2458.webp?v=20261120-lattices 2458w" sizes="(max-width:760px) calc(100vw - 44px), 88vw" width="2458" height="1640" fetchpriority="high" alt="LATTICES desktop homepage in Tenebrismo, showing the Pentimento edition applications"></div><div class="product-rig"><div class="product-duet" role="group" aria-label="LATTICES application">${nativeWindow(model,layouts,model.defaultMode,model.defaultTheme)}
 </div></div></div>
 <aside class="module-details" id="module-details" role="region" aria-label="Application details" hidden><div class="module-details-scroll" tabindex="0" aria-label="Application information and preview"><div class="module-details-body"><img class="native-panel" alt=""><img class="native-panel-motion" alt="" decoding="async" fetchpriority="low" hidden><div class="native-panel-text" data-panel-live></div><div class="sr-only" data-panel-text></div></div></div><button type="button" data-close-details aria-label="Close application details">${icon('close',16)}</button></aside>`;
 return markup.replace(/<button(?![^>]*disabled)/g,'<button disabled');
}
