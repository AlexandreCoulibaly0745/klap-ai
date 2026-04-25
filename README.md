# KlapAI 🎬

**Générateur de clips viraux propulsé par l'IA**

KlapAI analyse n'importe quelle vidéo YouTube et identifie automatiquement les meilleurs moments à transformer en clips courts pour TikTok, Instagram Reels et YouTube Shorts.

## Fonctionnalités

- Analyse de vidéos YouTube par URL
- Identification des moments les plus engageants
- Génération de légendes TikTok avec emojis
- Hashtags optimisés pour chaque clip
- Score de potentiel viral
- Timestamps précis (début → fin)
- Support TikTok, Reels et Shorts

## Stack technique

- React 18 + Vite
- Anthropic Claude API (claude-sonnet-4)
- Web Search intégré
- GitHub Pages (déploiement automatique)

## Déploiement local

```bash
npm install
npm run dev
```

## Déploiement

Le projet se déploie automatiquement sur GitHub Pages à chaque push sur la branche `main` via GitHub Actions.

**URL de production :** `https://<ton-username>.github.io/klap-ai/`

## Configuration GitHub Pages

Dans les paramètres du repo GitHub :
1. Settings → Pages
2. Source : **GitHub Actions**
3. Pusher sur `main` → déploiement automatique

---

Développé par Alexandre Coulibaly
