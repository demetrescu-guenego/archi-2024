const data = {
  mairies: [
    {
      id: "crecy-la-chapelle",
      label: "Crécy-La-Chapelle",
    },
    {
      id: "ferrieres-en-brie",
      label: "Ferrieres-en-Brie",
    },
    {
      id: "amillis",
      label: "Amillis",
    },
  ],
};

export default {
  paths() {
    const list = data.mairies;

    const result = list.map((item) => ({ params: item }));
    return result;
  },
};
