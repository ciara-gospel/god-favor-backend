# God Favor Solution — Backend (API)

API REST du site de **God Favor Solution Sarl**, agence de voyage et de
formation en langues étrangères basée à Etoug-Ebe, Yaoundé, Cameroun.

Cette API gère l'authentification, les utilisateurs, les cours de langues
(niveaux, leçons, contenus texte/vidéo), la progression pédagogique, les
inscriptions en ligne, le blog et le guide de voyage.

> Ce dépôt correspond au backend uniquement. Le frontend se trouve dans un
> dépôt séparé : `god-favor-frontend`.

---

## Sommaire

- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Cloner le projet](#cloner-le-projet)
- [Configuration (.env)](#configuration-env)
- [Base de données](#base-de-données)
- [Installation des dépendances](#installation-des-dépendances)
- [Démarrer le serveur](#démarrer-le-serveur)
- [Tests](#tests)
- [Qualité de code](#qualité-de-code)
- [Build de production](#build-de-production)
- [Documentation de l'API](#documentation-de-lapi)
- [Modules de l'application](#modules-de-lapplication)
- [Rôles et sécurité](#rôles-et-sécurité)
- [Contribution](#contribution)

---

## Stack technique

| Élément | Technologie |
|---|---|
| Framework | [NestJS](https://nestjs.com/) (Node.js, TypeScript) |
| Serveur HTTP | Express (intégré à NestJS) |
| Base de données | PostgreSQL |
| ORM | TypeORM |
| Authentification | JWT + Passport (rôles : apprenant, enseignant, administrateur, commercial) |
| Validation | class-validator / class-transformer |
| Documentation API | Swagger (`@nestjs/swagger`) |
| Upload de fichiers | Multer + stockage objet compatible S3 |
| Emails | Nodemailer (`@nestjs-modules/mailer`) |
| Internationalisation | nestjs-i18n (FR / EN / DE) |
| Tests | Jest + Supertest |
| Qualité de code | ESLint, Prettier, Husky, lint-staged, CodeRabbit |

---

## Structure du projet

```
god-favor-backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/                # configuration centralisée (env, base de données)
│   ├── common/                # guards, décorateurs, filtres, enums partagés
│   ├── database/               # migrations et seeds
│   ├── auth/                   # inscription, connexion, JWT
│   ├── users/                  # gestion des comptes
│   ├── courses/                # cours, niveaux, leçons
│   ├── content/                # contenus texte/vidéo + upload S3
│   ├── evaluations/            # évaluations de fin de niveau
│   ├── progress/               # progression pédagogique (verrouillage des niveaux)
│   ├── enrollments/             # inscriptions en ligne
│   ├── blog/                   # articles de blog
│   ├── guide/                  # guide de voyage
│   ├── mail/                   # envoi d'emails
│   ├── i18n/                   # fichiers de traduction FR/EN/DE
│   └── admin/                  # statistiques et actions transverses
├── test/                       # tests end-to-end
├── docker-compose.yml          # PostgreSQL en local
├── .env
└── package.json
```

Détail complet (chaque fichier module par module) : voir `backend-structure.md`.

---

## Prérequis

- **Node.js** 20 LTS ou supérieur
- **npm** 10 ou supérieur
- **Docker** et **Docker Compose**
- **Git**

```bash
node -v
npm -v
docker -v
```

---

## Cloner le projet

```bash
git clone <URL_DU_DEPOT_BACKEND> god-favor-backend
cd god-favor-backend
```

---

## Configuration (.env)

Créer un fichier `.env` à la racine du projet :

```bash
NODE_ENV=development
PORT=3000

# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=godfavor
DB_PASSWORD=changeme
DB_NAME=godfavor_db

# Authentification
JWT_SECRET=change_this_secret_in_production
JWT_EXPIRATION=3600s

# Emails
MAIL_HOST=smtp.example.com
MAIL_USER=
MAIL_PASSWORD=

# Stockage objet (vidéos/documents)
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=
```

⚠️ Le fichier `.env` n'est jamais versionné (voir `.gitignore`). Ne jamais
committer de secrets réels.

---

## Base de données

### 1. Démarrer PostgreSQL via Docker
```bash
docker compose up -d
```

### 2. Créer les tables
Avec le script SQL fourni (`database-schema.sql`) :
```bash
docker compose exec -T postgres psql -U godfavor -d godfavor_db < database-schema.sql
```

Ou via les migrations TypeORM (une fois les entités écrites) :
```bash
npx typeorm migration:run -d ./src/config/database.config.ts
```

### 3. (Optionnel) Charger des données de démonstration
```bash
npm run seed
```

### Arrêter la base de données
```bash
docker compose down          # arrête le conteneur
docker compose down -v       # arrête et supprime aussi les données
```

---

## Installation des dépendances

```bash
npm install
```

Dépendances principales déjà incluses dans `package.json` :
```bash
@nestjs/typeorm typeorm pg @nestjs/config
class-validator class-transformer
@nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
@nestjs/swagger @nestjs/platform-express multer
@aws-sdk/client-s3 @aws-sdk/s3-request-presigner
@nestjs-modules/mailer nodemailer
nestjs-i18n @nestjs/throttler
```

---

## Démarrer le serveur

```bash
npm run start:dev       # mode développement (rechargement automatique)
npm run start           # mode standard
npm run start:prod      # mode production (nécessite npm run build au préalable)
```

Une fois démarré :
- API : `http://localhost:3000/api/v1`
- Documentation Swagger : `http://localhost:3000/api/docs`

---

## Tests

```bash
npm run test            # tests unitaires
npm run test:watch      # tests unitaires en mode watch
npm run test:cov        # tests unitaires + rapport de couverture
npm run test:e2e        # tests end-to-end (API complète, nécessite la base de données démarrée)
```

Les tests unitaires (`*.spec.ts`) sont situés à côté de chaque service et
contrôleur, dans leur module respectif (ex. `src/auth/auth.service.spec.ts`).
Les tests end-to-end (`*.e2e-spec.ts`) sont dans le dossier `test/`.

---

## Qualité de code

```bash
npm run lint       # analyse et corrige automatiquement le code (ESLint)
npm run format     # applique le formatage Prettier
```

**Husky** exécute automatiquement le lint sur les fichiers modifiés avant
chaque commit (`.husky/pre-commit`) — aucune action manuelle requise.

**CodeRabbit** analyse automatiquement chaque Pull Request ouverte sur
GitHub/GitLab (configuration dans `.coderabbit.yaml`). Rien à lancer en
local.

---

## Build de production

```bash
npm run build          # compile le projet TypeScript dans dist/
npm run start:prod      # démarre le serveur à partir du build
```

---

## Documentation de l'API

La documentation interactive Swagger est générée automatiquement et
accessible sur `http://localhost:3000/api/docs` une fois le serveur démarré.
Elle liste tous les endpoints, leurs paramètres, et permet de tester les
requêtes directement depuis le navigateur.

Le détail de conception des endpoints (méthode, route, rôle requis) est aussi
documenté dans `SDD_GodFavorSolution_v1.docx`, section 7.

---

## Modules de l'application

| Module | Responsabilité |
|---|---|
| `auth` | Inscription, connexion, JWT, vérification d'email |
| `users` | Gestion des comptes (apprenants, enseignants, administrateurs, commerciaux) |
| `courses` | Cours, niveaux, leçons |
| `content` | Contenus texte/vidéo, upload vers le stockage objet |
| `evaluations` | Évaluations de fin de niveau |
| `progress` | Suivi de la progression, règle de déverrouillage des niveaux |
| `enrollments` | Demandes d'inscription en ligne |
| `blog` | Articles de blog |
| `guide` | Contenu du guide de voyage |
| `mail` | Envoi d'emails (vérification, confirmations) |
| `i18n` | Traductions FR / EN / DE côté serveur |
| `admin` | Statistiques et actions d'administration transverses |

---

## Rôles et sécurité

| Rôle | Accès |
|---|---|
| `apprenant` | Ses propres cours, sa progression, son profil |
| `enseignant` | Création/gestion des contenus et évaluations de ses cours |
| `administrateur` | Accès complet (utilisateurs, cours, inscriptions, blog, guide) |
| `commercial` | Consultation et traitement des inscriptions uniquement |

L'accès à chaque endpoint est protégé par un `Guard` vérifiant le rôle porté
par le jeton JWT (voir `src/common/guards/roles.guard.ts`). Toutes les routes
sensibles nécessitent HTTPS en production et un en-tête
`Authorization: Bearer <token>`.

---

## Contribution

1. Créer une branche depuis `main` : `git checkout -b feature/nom-de-la-fonctionnalite`
2. Développer, en respectant le lint (vérifié automatiquement au commit)
3. Ajouter/mettre à jour les tests correspondants
4. Pousser la branche et ouvrir une Pull Request
5. Attendre la revue CodeRabbit et la validation de l'équipe avant fusion