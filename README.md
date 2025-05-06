# Architecture Portfolio Website

## Description

Ce projet est un site web de portfolio d'architecture construit avec VitePress.
Il permet d'afficher des projets architecturaux avec des galeries photos, des
informations détaillées et une mise en page responsive.

## Technologies utilisées

- VitePress (Framework basé sur Vite et Vue.js)
- TypeScript
- Vue 3 (Composition API)
- Tailwind CSS
- Sharp (pour le traitement d'images)

## Structure du projet

```
.
├── .github/workflows/      # Configuration CI/CD
├── .vitepress/
│   ├── theme/             # Composants Vue personnalisés
│   │   ├── models/        # Pages modèles
│   │   └── widgets/       # Composants réutilisables
│   ├── interfaces/        # Types TypeScript
│   └── plugins/           # Plugins VitePress
├── public/                # Assets statiques
└── tools/                 # Scripts utilitaires
```

## Fonctionnalités principales

1. Galerie de projets avec navigation
2. Affichage détaillé des projets
3. Optimisation des images (conversion AVIF)
4. Mode impression
5. Navigation parallaxe
6. Visualisation d'images plein écran

## Installation et démarrage

```bash
# Installation des dépendances
pnpm install

# Démarrage du serveur de développement
pnpm dev

# Build pour la production
pnpm build
```

## Suggestions d'amélioration

### 1. Optimisation des performances

- Implémenter le lazy loading pour les images
- Ajouter des images responsive avec `srcset`
- Mettre en place un système de cache pour les images transformées

### 2. Amélioration de l'expérience utilisateur

- Ajouter des animations de transition entre les pages
- Implémenter un système de recherche de projets
- Ajouter des filtres par catégorie/année

### 3. Améliorations techniques

```typescript
// Exemple d'implementation d'un hook de lazy loading pour les images
const useImageLazyLoading = (options = { threshold: 0.1 }) => {
  const imageRef = ref<HTMLImageElement | null>(null);

  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && imageRef.value) {
          imageRef.value.src = imageRef.value.dataset.src || "";
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (imageRef.value) {
      observer.observe(imageRef.value);
    }
  });

  return imageRef;
};
```

### 4. Sécurité et maintenance

- Ajouter des tests unitaires et e2e
- Mettre en place un système de versioning pour les assets
- Implémenter une stratégie de backup des données

### 5. SEO et accessibilité

- Ajouter des meta tags dynamiques
- Améliorer la structure HTML sémantique
- Implémenter un sitemap.xml dynamique

## License

[MIT License](LICENSE)
