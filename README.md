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
Alphabet phonétique · Glossaire des acronymes · Recherche · À propos.

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

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
construit et déploie sur chaque `push` vers `main`.

1. Pousser le dépôt sur GitHub sous le nom **`ccff-guide-web`**.
2. _Settings → Pages → Build and deployment → Source_ : **GitHub Actions**.
3. Le site sera servi sur `https://<utilisateur>.github.io/ccff-guide-web/`.

> Le chemin de base est `/ccff-guide-web/` (voir `base` dans `vite.config.ts`).
> Si le dépôt porte un autre nom, mettez `base` à jour.
> Pour un déploiement à la racine (Vercel, Netlify, domaine dédié) :
> `BASE_PATH=/ npm run build`.

## Icônes & cartes

- Les icônes PWA sont générées depuis `public/logo.svg` :
  `npm run generate-pwa-assets` (écrit les PNG/ICO dans `public/`, versionnés).
- Les cartes (`public/maps/`) sont des extraits optimisés des scans d'origine
  conservés dans `Guide/` (source / provenance).
