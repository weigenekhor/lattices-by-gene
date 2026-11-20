# Lattices website

The canonical site is https://latticesbygene.com/ with GNX Dashboard at /gnx/. GitHub Pages publishes main from the repository root. The CNAME file records the custom domain.

## Product sources

The desktop registry at C:/Users/Gene/Desktop/Lattices/widgets/shell/home_widget.py governs application names, icons, controls and layout. The website model is content/apps.json. It currently contains 20 applications and 180 gallery captures across Imprimatura, Tenebrismo and Pentimento.

The hero defaults to Pentimento edition and Tenebrismo appearance. Edition and appearance are independent controls. The surrounding website uses its graphite palette and local Geist font. Desktop product typography follows Segoe UI.

Home navigation, application selection, information drawers, edition and appearance controls work in the browser. Application workspaces display exported native layouts with empty inputs and tables. Processing buttons represent their native controls. The screenshot gallery provides populated application captures.

## Development

Run these commands from the repository root.

```text
pnpm install --frozen-lockfile
pnpm build
pnpm lint
pnpm test
pnpm serve
```

The preview server listens at http://127.0.0.1:8001/. Normal website builds use committed source and assets.

## Files and exports

- scripts/build-native.mjs generates index.html from canonical content and measured native references.
- state.js manages edition and appearance.
- native-home.js and native-shell.js render the home and shell.
- desktop-workspace.js renders measured application controls from content/desktop-layouts/.
- content/home-layouts.json, content/panel-reference.json and content/info-reference.json contain native reference geometry.
- content/capture-source-manifest.json records capture provenance. assets/screens/ contains gallery images and responsive derivatives.
- assets/native/ contains native home and information-panel artwork. assets/hero/ contains the mobile hero.

Optional native exports require Windows, Segoe UI, PySide6 and the current desktop source. Inspect script arguments before running scripts/export-home-layouts.py, scripts/export-panel-reference.py or scripts/export-desktop-layouts.py. Preserve existing capture masters and user data. Export actual widgets through the existing isolated harness.

## Maintenance

Keep every registered application represented. Follow the desktop renderer when changing geometry, product wording or visual controls. Preserve theme and edition independence, responsive navigation, keyboard access and reduced motion.

Run the build, syntax checks and relevant tests after changes. Inspect rendered output for visual changes. Commit the intended source changes before publishing. Verification evidence belongs in the external migration audit directory. Git history preserves previous documentation.

The former Artifacts and Yvenne domains serve browser redirect pages that preserve paths, queries and fragments. Their deep links use custom 404 pages and JavaScript. Forwarding depends on continued domain and hosting availability.
