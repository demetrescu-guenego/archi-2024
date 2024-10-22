export default {
  paths() {
    const list = [
      {
        id: "chateaux",
        label: "Châteaux",
        name: "ferrieres",
      },
      {
        id: "eglises",
        label: "Eglises",
        name: "chauconin",
      },
      {
        id: "remparts",
        label: "Remparts",
        name: "charleville-mezieres",
      },
      {
        id: "abbayes",
        label: "Abbayes",
        name: "dammarie-les-lys",
      },
      {
        id: "fermes",
        label: "Fermes",
        name: "coupvray",
      },
      {
        id: "restaurations",
        label: "Parements extérieurs",
        name: "bois-le-roi",
      },
      {
        id: "serres",
        label: "Serres",
        name: "villiers-en-biere",
      },
      {
        id: "tertiaires",
        label: "Tertiaire - Administration",
        name: "tournan-en-brie",
      },
      {
        id: "sports",
        label: "Sports - Loisirs",
        name: "torcy-stade",
      },
      {
        id: "marches",
        label: "Marchés couverts",
        name: "torcy",
      },
      {
        id: "ecoles",
        label: "Scolaire - Education",
        name: "poincy",
      },
    ];

    const result = list.map((item) => ({ params: item }));
    return result;
  },
};
