# HOSTINGER.md — La Station · Déploiement & Infrastructure

---

## ARCHITECTURE

```
lastation-prod.com          → Site statique (ce repo GitHub)
portfolio.lastation-prod.com → WordPress (page work / portfolio)
```

> ⚠️ Le transfert de domaine depuis Wix est en cours (~5-7 jours).
> Une fois terminé, créer le sous-domaine `portfolio` dans hPanel → Sous-domaines.

---

## DÉPLOIEMENT AUTOMATIQUE — GitHub → Hostinger

### Comment ça marche
Chaque `git push` sur la branche `main` déclenche automatiquement un déploiement via GitHub Actions (FTP over TLS vers Hostinger). Le site est mis à jour en ~45 secondes.

### Workflow
```
Modifier les fichiers localement
        ↓
git add .
git commit -m "Description du changement"
git push origin main
        ↓
GitHub Actions → FTP → public_html sur Hostinger
        ↓
lastation-prod.com mis à jour ✅
```

### Vérifier le déploiement
→ https://github.com/Moirius/Lastation_site/actions
- ✅ Icône verte = déploiement réussi
- ❌ Icône rouge = erreur (cliquer pour voir les logs)

---

## REPO GITHUB

- **URL** : https://github.com/Moirius/Lastation_site
- **Branche principale** : `main`
- **Visibilité** : Public

---

## INFOS HOSTINGER

| Info | Valeur |
|------|--------|
| Panel | hpanel.hostinger.com |
| Hébergement | lastation-prod.com |
| Dossier racine | `public_html/` |
| FTP Host | `145.79.20.18` |
| FTP User | `u983179572` |
| FTP Port | `21` |
| WordPress dossier | `public_html/portfolio/` |
| Base de données WP | `u983179572_site_web` |

---

## FICHIERS EXCLUS DU DÉPLOIEMENT

Ces fichiers sont dans le repo GitHub mais **ne sont pas déployés** sur Hostinger (configuré dans `.github/workflows/deploy.yml`) :

- `.git*` — fichiers Git internes
- `.claude/` — config Claude Code
- `infos LA STATION/` — fichiers de brief internes
- `CLAUDE.md` — contexte projet Claude
- `PROMPT.md` — brief initial
- `BLOG.md` — notes internes
- `HOSTINGER.md` — ce fichier
- `work-shortcode-refondu.php` — shortcode WordPress (à coller manuellement dans WP)
- `grille-infinie.code-snippets.json` — ancien shortcode

---

## URLS PROPRES — .htaccess

Le fichier `.htaccess` à la racine gère la réécriture d'URLs :

| URL affichée | Fichier servi |
|---|---|
| `lastation-prod.com/` | `index.html` |
| `lastation-prod.com/services` | `services.html` |
| `lastation-prod.com/about` | `about.html` |
| `lastation-prod.com/contact` | `contact.html` |
| `lastation-prod.com/faq` | `faq/index.html` |
| `lastation-prod.com/faq/importance-du-montage-video` | `faq/importance-du-montage-video.html` |
| `lastation-prod.com/faq/comment-estimer-devis-video` | `faq/comment-estimer-devis-video.html` |

Les anciennes URLs en `.html` redirigent automatiquement en **301** vers l'URL propre.

---

## WORDPRESS — PORTFOLIO

### Accès admin
→ `https://portfolio.lastation-prod.com/wp-admin`
*(disponible une fois le transfert de domaine terminé)*

### Shortcode grille portfolio
- Plugin : **Code Snippets**
- Nom du snippet : `Grille Infinie`
- Shortcode : `[portfolio_final]`
- Le code à jour est dans `work-shortcode-refondu.php` à la racine du repo

### Mettre à jour le shortcode
1. WordPress → Code Snippets → "Grille Infinie"
2. Remplacer le code par le contenu de `work-shortcode-refondu.php`
3. Enregistrer

### Ajouter une image au portfolio
1. WordPress → Médias → Ajouter
2. Uploader l'image
3. Remplir la **légende** avec la catégorie :
   - `artiste` → apparaît dans le filtre Artistes
   - `pro` ou `business` → apparaît dans le filtre Pros
   - `particulier` → apparaît dans le filtre Particuliers
   - *(vide)* → apparaît dans Tout uniquement
4. Coller un lien YouTube dans le **contenu** de l'image (optionnel, pour lecture au clic)
5. Sauvegarder → la grille se met à jour automatiquement

---

## SECRETS GITHUB ACTIONS

Configurés dans : Settings → Secrets and variables → Actions

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | IP du serveur FTP Hostinger |
| `FTP_USERNAME` | Nom d'utilisateur FTP |
| `FTP_PASSWORD` | Mot de passe FTP |

> ⚠️ Ne jamais committer le mot de passe FTP dans un fichier du repo.

---

## PROCÉDURE — Mettre à jour le site

```bash
# 1. Faire les modifications dans D:/claude_code/site web/

# 2. Depuis le terminal dans le dossier du projet :
git add .
git commit -m "Description claire du changement"
git push origin main

# 3. Vérifier sur GitHub → Actions que le déploiement est vert
# 4. Vérifier sur lastation-prod.com
```

---

## PROCÉDURE — Après le transfert de domaine

1. hPanel → **Sous-domaines** → créer `portfolio.lastation-prod.com` → dossier `public_html/portfolio`
2. Vérifier que `wp-config.php` dans `public_html/portfolio/` contient :
   ```php
   define('WP_HOME', 'https://portfolio.lastation-prod.com');
   define('WP_SITEURL', 'https://portfolio.lastation-prod.com');
   ```
3. Tester `https://portfolio.lastation-prod.com/wp-admin`
4. Mettre à jour le lien WORK dans le shortcode WordPress (`$work_url`)
