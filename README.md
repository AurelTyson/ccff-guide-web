# Guide pratique du Bénévole CCFF

PWA (application web installable, **utilisable hors-ligne**) reprenant le dépliant
_« Guide pratique du Bénévole CCFF »_ de l'**Association Départementale des Comités
Communaux Feux de Forêts et des Réserves de Sécurité Civile de l'Hérault**
(ADCCFF34 - RCSC).

Pensée pour le terrain : mobile-first, gros boutons d'appel d'urgence (18 / 112 / 17),
et consultation sans réseau une fois la page ouverte.

## Contenu

Urgence & départ de feu · Missions · Débroussaillement · Emploi du feu ·
Échelle de risques · Sécurité largage · Cartes (zones météo + carroyage DFCI) ·
Alphabet phonétique · Épeleur radio · Glossaire des acronymes · Recherche ·
Installer l'application · Réglages d'affichage · À propos.

Outils de terrain : recherche plein-texte, **épeleur radio** (dicte un mot ou
une plaque en alphabet phonétique), **réglages d'affichage** (texte agrandi,
contraste « plein soleil ») et **installation** sur l'écran d'accueil pour un
usage hors-ligne.

> Le contenu est transcrit de l'édition **Mars 2015** (« 37 CCFF en 2015 »).
> Vérifiez la validité des numéros, arrêtés et procédures auprès de votre commune,
> de l'association départementale et du SDIS 34.

## Pile technique

- **Vite 8** + **React 19** + **TypeScript**
- **vite-plugin-pwa** (Workbox `generateSW`, précache complet + cartes → hors-ligne)
- **react-router** (HashRouter — robuste sur GitHub Pages)
- **Fuse.js** (recherche floue côté client)
- CSS maison (mobile-first), aucune dépendance UI

## Développement

```bash
npm install
npm run dev        # http://localhost:5173/ccff-guide-web/
npm run build      # type-check + build de production dans dist/
npm run preview    # sert le build (teste le service worker / mode hors-ligne)
```

## Déploiement (GitHub Pages)

La production et les aperçus de PR sont publiés sur la branche **`gh-pages`** :

- [`deploy.yml`](.github/workflows/deploy.yml) — à chaque `push` sur `main`,
  construit et publie le site à la **racine** de `gh-pages`.
- [`preview.yml`](.github/workflows/preview.yml) — à chaque pull request,
  publie un **aperçu** sous `pr-preview/pr-<N>/`, commente le lien sur la PR,
  et le supprime à la fermeture de la PR.

**Réglage unique** (après le premier déploiement sur `gh-pages`) :
_Settings → Pages → Build and deployment → Source_ → **Deploy from a branch**
→ branche `gh-pages` → `/ (root)`.

- Production : `https://<utilisateur>.github.io/ccff-guide-web/`
- Aperçu PR : `https://<utilisateur>.github.io/ccff-guide-web/pr-preview/pr-<N>/`

> Le chemin de base est `/ccff-guide-web/` (voir `base` dans `vite.config.ts`),
> surchargé par `BASE_PATH` pour les aperçus. Pour un déploiement à la racine
> (Vercel, Netlify, domaine dédié) : `BASE_PATH=/ npm run build`.

## Icônes & cartes

- Les icônes PWA sont générées depuis `public/logo.svg` :
  `npm run generate-pwa-assets` (écrit les PNG/ICO dans `public/`, versionnés).
- Les cartes (`public/maps/`) sont des extraits optimisés des scans d'origine
  conservés dans `Guide/` (source / provenance).
