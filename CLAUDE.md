# CLAUDE.md — La Station · Site web
*Fichier de contexte projet. À mettre à jour à chaque session.*

---

## ÉTAT DU PROJET

| Page | Statut | Notes |
|------|--------|-------|
| `index.html` | ✅ Fait | Hero vidéo fond, titre scindé, accroche, aperçu services, manifeste |
| `about.html` | ✅ Fait | Hero vidéo fond, présentation, timeline 6 étapes, équipement, CTA |
| `services.html` | ✅ Fait | Hero vidéo fond, layout 2 col, 14 services, tarifs, abonnements |
| `contact.html` | ✅ Fait | Fond gris toile, big coords, tableau — sans formulaire |
| `clients.html` | ⏭ Abandonné | Remplacé par la stratégie FAQ/SEO |
| `faq/index.html` | ✅ Fait | Hub liste articles, fond --noir, grille de cards |
| `faq/importance-du-montage-video.html` | ✅ Fait | Article #01 — PRODUCTION, ~1500 mots |
| `faq/comment-estimer-devis-video.html` | ✅ Fait | Article #02 — BUDGET, ~1400 mots, FAQ schema |
| `work.html` | ⏭ Ne pas recréer | Lier uniquement dans la navigation |
| `sitemap.xml` | ❌ À faire | Lister toutes les pages dont les articles |
| `robots.txt` | ❌ À faire | Standard |

---

## STACK & STRUCTURE

```
/
├── index.html
├── about.html
├── services.html
├── contact.html
├── clients.html          ← à créer
├── work.html             ← NE PAS RECRÉER (déjà existant côté client)
├── PROMPT.md             ← brief complet
├── CLAUDE.md             ← ce fichier
├── css/
│   ├── main.css          ← variables, reset, typo, nav, footer, cursor
│   ├── animations.css    ← keyframes, reveal scroll, split text
│   └── responsive.css    ← breakpoints 1024px / 768px / 480px
├── js/
│   ├── main.js           ← cursor, header scroll, burger, IntersectionObserver
│   └── animations.js     ← GSAP init, split text, ScrollTrigger
├── images/               ← logos source
│   ├── LOGO LA STATION-05.png
│   └── LOGO LA STATION-06.png
├── assets/
│   ├── logo/
│   │   ├── LOGO LA STATION-05.png
│   │   └── LOGO LA STATION-06.png
│   └── vidéos/
│       └── ShReel HZ-Sans Logo.mp4   ← vidéo showreel (fond hero)
└── infos LA STATION/
    ├── La_Station_Entreprise.md
    └── La_Station_Identite_Visuelle.md
```

**Stack :** HTML5 / CSS3 / JS vanilla — aucun framework CSS.
**Fonts :** Barlow Condensed (Google Fonts CDN).
**Animations :** GSAP 3.12.5 + ScrollTrigger (CDN `cdnjs.cloudflare.com`).
**Hébergement cible :** Hostinger statique.

---

## IDENTITÉ VISUELLE — RÈGLES ABSOLUES

### Palette (6 valeurs uniquement)
| Variable CSS | Hex | Usage |
|---|---|---|
| `--noir` | `#0F0F12` | Fond primaire (hero, footer, overlays) |
| `--toile` | `#E8E6E0` | Fond secondaire (pages lecture, contact) |
| `--blanc` | `#FFFFFF` | Texte sur fond noir uniquement — jamais en fond |
| `--or` | `#C8A84B` | Accent unique (pastilles, CTA, éléments actifs) |
| `--rouge` | `#C0392B` | Accent secondaire (univers artistiques uniquement) |
| `--muted` | `#888888` | Sous-textes, labels secondaires |

**Interdits :**
- Toute couleur hors de cette palette
- Rouge + or sur le même élément
- Blanc pur comme fond de page

### Typographie
- **Fonte :** Barlow Condensed — fallback Arial Bold
- **Titres :** TOUJOURS en MAJUSCULES, font-weight 900, clamp() pour la taille
- **Navigation :** tout caps, letter-spacing ≥ 0.25em, points `.` comme séparateurs
- **Corps :** Regular 300–400, casse normale, couleur `--blanc` ou `--muted`

### Référence stylistique
bloomparis.tv — dark cinéma, impact immédiat, composition asymétrique.

---

## COMPOSANTS PARTAGÉS

### Header (`.site-header`)
- Position fixe, hauteur `--nav-h: 72px`
- Logo height : **52px** (agrandi en session 2)
- Transparente sur hero → fond `--noir` au scroll (classe `.scrolled`)
- Logo `images/LOGO LA STATION-05.png` (filter: brightness invert pour fond noir)
- Nav desktop : `WORK. SERVICES. ABOUT. CONTACT.`
- Burger mobile avec overlay `.nav-mobile`
- **Exception contact.html :** fond `--toile` permanent, couleurs inversées

### Footer (`.site-footer`)
- Fond `--noir`, 3 colonnes : brand / nav / contact
- GPS : `48°6'44"N · 1°40'59"W · RENNES, BRETAGNE` en or
- Copyright `© LA STATION`

### Custom cursor (`.cursor`)
- Pastille or `--or`, suit la souris
- Classe `.hover` → cercle 40px transparent avec bordure or
- `cursor: none` sur `body`, `a`, `button`
- **Exception contact.html :** cursor noir sur fond clair

### Vidéo de fond hero (`.hero-video`)
- `src` : `assets/vid%C3%A9os/ShReel%20HZ-Sans%20Logo.mp4` (chemin URL-encodé)
- Attributs : `autoplay muted loop playsinline`
- CSS : `position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0`
- Overlay `::before` renforcé par-dessus (rgba noir ~0.82) pour lisibilité
- Z-index stack : vidéo `0` → overlay `1` → deco-lines `2` → contenu `3`
- Présente sur : `index.html`, `about.html`, `services.html`

### Animations scroll
- Classe `.reveal` → opacity 0 + translateY(32px) → visible via `IntersectionObserver`
- Variantes `.reveal--left`, `.reveal--right`
- Delays `.reveal-d1` → `.reveal-d6`
- Timeline steps : classe `.step-visible` ajoutée par observer

---

## PAGES — DÉTAIL

### `index.html`
- **Hero :** vidéo fond + titre `LA` (gauche) / `STATION.` (droite) scindé
  - Logo ancré bas-gauche
  - Nav ancrée bas-droite avec points
  - Grille verticale décorative (lignes or)
  - Scroll indicator pulsant centré bas
  - Animations CSS : `slide-from-left` / `slide-from-right` + `fade-up`
  - **Pas de coordonnées GPS** (supprimées)
- **Accroche :** 2 colonnes — headline + body + 2 CTA / 4 stats
  - **Pas de mention "Première rencontre gratuite"**
- **Aperçu services :** 4 cards fond blanc sur `--toile`
- **Manifeste :** section noire, grande citation, 2 CTA

### `about.html`
- **Hero :** vidéo fond + titre `LA STATION.` data-split GSAP
  - **Pas de coordonnées GPS**
- **Présentation :** colonne unique — headline + body + tags équipe
  - **Pas de bloc de stats chiffrées** (supprimé)
- **Timeline 6 étapes :** (POINT CLÉ)
  - Spine verticale or progressive (JS scroll → `height` CSS)
  - Alternance odd (contenu gauche) / even (contenu droite)
  - Grid 3 colonnes : `1fr 80px 1fr`
  - Pastilles : border → filled or au `.step-visible`
  - Stagger delay 0.05s → 0.55s par étape
  - Mobile : colonne unique, bordure gauche or
  - **Étape 01 "Première rencontre" :** ne pas mentionner la gratuité
- **Équipement :** 6 cards fond blanc sur `--toile`
- **CTA final :** "UN PROJET EN TÊTE ?" — **pas de mention "Première rencontre gratuite"**
- **Pas de section "Le montage"** (supprimée)

### `services.html`
- **Hero :** vidéo fond + titre `NOS SERVICES.`
  - Eyebrow : "Nos prestations audiovisuelles" (pas de mention du chiffre 14)
  - **Pas de coordonnées GPS**, pas de compteur filigrane
- **Layout 2 colonnes :** menu sticky 280px gauche + panneau détail droite
- **Switcher JS :** `data-service` sur boutons → `active` sur panneau correspondant
- **14 services (sans insister sur le chiffre) :**
  01 Film d'entreprise · 02 Reportage · 03 Publicité · 04 Réseaux sociaux ·
  05 Clip vidéo · 06 V-Jing · 07 Mariage · 08 Présentation produit ·
  09 Aftermovie · 10 Captation live · 11 Formations & tutos ·
  12 **3D** · 13 **Motion design** · 14 Photographie
  - **Supprimés :** Interview, Génération procédurale
  - **Ajoutés :** 3D, Motion design
- **Tarifs :** tableau sur fond `--toile`
- **Abonnements :** 3 cards — ESSENTIEL 300€ / STATION 700€ (featured) / PREMIUM 1300€
- **Pas de CTA "Première rencontre gratuite"** (section supprimée)
- Mobile : menu horizontal scrollable

### `contact.html`
- **Fond :** `--toile` sur toute la page (body + header permanent)
- **Big coords :** email + tel + instagram en très grand corps, cliquables, `↗` au hover
- **Pas de mention "Première rencontre gratuite"**
- **Tableau coords :** email, tél, Instagram, site, localisation, GPS, disponibilité
- **Pas de formulaire** (supprimé — colonne unique max-width 720px)

---

## CONVENTIONS DE CODE

### CSS
- Variables dans `:root` de `main.css` — ne jamais hardcoder une couleur
- Tailles de texte avec `clamp(min, vw, max)` pour les titres
- Transitions : toujours `var(--ease)` = `cubic-bezier(0.16, 1, 0.3, 1)`
- Styles page-specific en `<style>` dans le `<head>` de chaque page
- Ordre : layout global → composants → responsive

### HTML
- Balises sémantiques : `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- `aria-label` sur toutes les sections et navigations
- `loading="lazy"` sur toutes les images sauf au-dessus du fold
- Schema.org `LocalBusiness` sur chaque page
- Chemins vidéo : URL-encoder les caractères spéciaux (espaces → `%20`, é → `%C3%A9`)

### JS
- Vanilla uniquement — aucun import, aucun bundler
- Tous les scripts en fin de `<body>` après GSAP CDN
- Logique page-specific dans `<script>` inline en bas de page
- `js/main.js` : cursor, header scroll, burger, scroll reveal (IntersectionObserver)
- `js/animations.js` : GSAP split text, ScrollTrigger

---

## CONTENU — SOURCES

Toutes les informations viennent exclusivement de :
- `infos LA STATION/La_Station_Entreprise.md`
- `infos LA STATION/La_Station_Identite_Visuelle.md`

**Ne jamais inventer de contenu.** Si une information manque, laisser un placeholder visible.

### Données clés
- **Email :** contact@lastation-prod.com
- **Tél :** 06 75 61 11 72 — `tel:+33675611172`
- **Instagram :** @Lastation.prod
- **GPS :** 48°6'44"N · 1°40'59"W (footer uniquement — supprimé des heroes)
- **Localisation :** Rennes, Bretagne, France

---

## ÉLÉMENTS SUPPRIMÉS / BANNIS

Ne plus réintroduire ces éléments sans validation explicite :
- ❌ Mention "Première rencontre gratuite" sur toutes les pages sauf contact (tableau coords)
- ❌ Coordonnées GPS dans les sections hero
- ❌ Bloc de stats chiffrées (3 fondateurs / 14 services / +15 clients / 6 étapes) sur about
- ❌ Section "Le montage : une étape clé" sur about
- ❌ Formulaire de contact sur contact.html
- ❌ Service "Interview" et "Génération procédurale" dans la liste des services
- ❌ Mise en avant du chiffre "14" sur la page services

---

## PROCHAINES ÉTAPES

1. **`clients.html`** — Grille 2 catégories (Scène musicale / Événementiel & entreprises), cards avec hover, liens YouTube/Instagram
2. **`sitemap.xml`** — Lister index, services, about, clients, contact
3. **`robots.txt`** — Standard

---

## HISTORIQUE DES SESSIONS

### Session 1 — 2026-04-05
- Lecture `PROMPT.md` + fichiers `infos/`
- Création `css/main.css`, `css/animations.css`, `css/responsive.css`
- Création `js/main.js`, `js/animations.js`
- Création `about.html` (focus timeline 6 étapes)
- Création `services.html` (layout 2 col, 14 services, tarifs, abonnements)
- Création `index.html` (hero scindé, accroche, aperçu, manifeste)
- Création `contact.html` (fond toile, big coords, formulaire)
- Copie logos → `assets/logo/`
- Création `CLAUDE.md`

### Session 2 — 2026-04-05
- Logo agrandi : 36px → 52px (`css/main.css`)
- GPS supprimés de tous les heroes (index, about, services)
- **services.html :** suppression Interview + Génération procédurale, ajout 3D + Motion design, renumérotation, suppression CTA "Première rencontre gratuite", eyebrow hero neutralisé
- **about.html :** suppression bloc stats "QUI SOMMES-NOUS", suppression section "Le montage", CTA final renommé "UN PROJET EN TÊTE ?"
- **contact.html :** suppression formulaire, suppression mention "Première rencontre gratuite", passage colonne unique
- **index.html :** suppression mention "Première rencontre gratuite" dans l'accroche
- Vidéo showreel `ShReel HZ-Sans Logo.mp4` intégrée en fond hero sur index, about, services
- `CLAUDE.md` mis à jour
