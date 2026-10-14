// Liste des pages du site : utilisée par la navigation et par le hub d'accueil
export const pages = [
  {
    href: "/accessibilite",
    titre: "Accessibilité",
    description: "Graphiques Plot avec title, subtitle, caption, ariaLabel et figure/figcaption.",
    tag: "a11y",
  },
  {
    href: "/leaflet",
    titre: "Leaflet",
    description: "Carte interactive des établissements de l'enseignement supérieur.",
    tag: "Carte",
  },
  {
    href: "/geojson/serveur",
    titre: "GeoJSON (serveur)",
    description: "Population par département, carte générée côté serveur avec Plot.",
    tag: "Plot",
  },
  {
    href: "/geojson/client",
    titre: "GeoJSON (client)",
    description: "Même carte calculée dans le navigateur, filtrable par année, sexe et âge.",
    tag: "Plot",
  },
];
