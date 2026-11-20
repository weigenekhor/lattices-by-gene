// The former site can forward these three public demo preferences in the
// fragment. Restore the visitor's bookmark before the rest of the page starts.
const migration = /^#(?:lattices|yvenne)-move=(legacy|pentimento|),(on|off|),(\d{0,13})(#.*)?$/.exec(location.hash);
if (migration) {
  const [, mode, notifications, muteUntil, bookmark = ''] = migration;
  history.replaceState(history.state, '', location.pathname + location.search + bookmark);
  try {
    if (mode && !localStorage.getItem('lattices-mode') && !localStorage.getItem('lattices-edition')) {
      localStorage.setItem('lattices-mode', mode);
      localStorage.setItem('lattices-edition', mode);
    }
    if (notifications && !localStorage.getItem('lattices-showcase-notifications')) {
      const mutes = muteUntil ? {temperature: Number(muteUntil)} : {};
      localStorage.setItem('lattices-showcase-notifications', JSON.stringify({enabled: notifications === 'on', mutes}));
    }
  } catch {
    // The site also supports browsers with storage disabled.
  }
  if (bookmark) {
    try {
      document.getElementById(decodeURIComponent(bookmark.slice(1)))?.scrollIntoView();
    } catch {
      // A bookmark can carry an arbitrary string.
    }
  }
}
