import populationMain from "../assets/populationMain.json";

// Valeurs possibles des 3 paramètres (même construction que dans l'énoncé du TP)
export const listePeriode = [...new Set(populationMain?.map((d) => d.Période))].sort().reverse();
export const listeSexe = ["Total", ...new Set(populationMain?.map((d) => d.Sexe).filter((s) => s !== "Total"))];
export const listeAge = ["Total", ...new Set(populationMain?.map((d) => d["Âge"]).filter((a) => a !== "Total"))];

// Toutes les données ne sont pas disponibles : 2010 et 2015 n'ont que "Sexe : Total"
const combinaisons = new Set(populationMain.map((d) => `${d.Période}|${d.Sexe}|${d["Âge"]}`));
export function existe(year: number, sex: string, age: string) {
  return combinaisons.has(`${year}|${sex}|${age}`);
}

// Nom utilisable dans une URL : "De 15 à 24 ans " -> "de-15-a-24-ans"
export function slug(texte: string | number) {
  return String(texte)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");
}

// URL de la page serveur pré-générée pour une combinaison de filtres
export function urlServeur(year: number, sex: string, age: string) {
  return `/geojson/serveur/${year}/${slug(sex)}/${slug(age)}`;
}

// Population par nom de département pour une année, un sexe et une tranche d'âge
export function getPopulation(year: number, sex: string, age: string) {
  return new Map(
    populationMain
      .filter((d) => d.Période === year && d.Sexe === sex && d["Âge"] === age)
      .map((d) => [d["Géographie"], d.Valeur]),
  );
}

// Options Plot de la carte, partagées entre la version serveur et la version client
export function optionsCarte(Plot: typeof import("@observablehq/plot"), departements: any, year: number, sex: string, age: string) {
  const population = getPopulation(year, sex, age);
  const label = (d: any) =>
    `${d.properties.nom} (${d.properties.code}) : ${population.get(d.properties.nom)?.toLocaleString("fr-FR") ?? "n.c."}`;

  return {
    title: `Population par département en ${year}`,
    subtitle: `Sexe : ${sex} — Âge : ${age.trim()}`,
    caption:
      population.size > 0
        ? "Source : INSEE, recensement de la population."
        : "Aucune donnée disponible pour cette combinaison de filtres.",
    ariaLabel: "Carte choroplèthe de la population par département de France métropolitaine",
    projection: { type: "conic-conformal", parallels: [44, 49], rotate: [-3, 0], domain: departements },
    width: 700,
    height: 650,
    // Échelle par quantiles : la légende continue a besoin d'un canvas, absent de jsdom côté serveur
    color: {
      type: "quantile",
      n: 7,
      scheme: "blues",
      legend: population.size > 0,
      label: "Population",
      tickFormat: (d: number) => Math.round(d).toLocaleString("fr-FR"),
    },
    marks: [
      // Fond : tous les départements, même sans donnée
      Plot.geo(departements, { fill: "#e2e8f0", stroke: "white", strokeWidth: 0.5 }),
      Plot.geo(departements, {
        filter: (d: any) => population.has(d.properties.nom),
        fill: (d: any) => population.get(d.properties.nom),
        stroke: "white",
        strokeWidth: 0.5,
        title: label,
      }),
    ],
  } as const;
}
