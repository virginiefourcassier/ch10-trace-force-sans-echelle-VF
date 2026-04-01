const EXERCISES = [
  {
    id: 0,
    pageLabel: "0/7",
    title: "UTILISATION DE LA SOURIS",
    instruction:
      "Pour positionner la flèche : cliquer sur l'origine de la flèche et glisser la souris puis relâcher ; cliquer sur l'extrémité de la flèche et glisser la souris puis relâcher.",
    image: "assets/training.jpg",
    type: "training",
    initialArrow: { tail: { x: 180, y: 380 }, head: { x: 300, y: 280 } }
  },
  {
    id: 1,
    pageLabel: "1/7",
    instruction: "Représenter la force exercée par la corde sur le planeur.",
    image: "assets/planeur.png",
    type: "exercise",
    expected: {
      tail: { x: 554, y: 362 },
      originZone: {
        type: "circle",
        cx: 554,
        cy: 362,
        r: 20
      },
      vector: { x: 190, y: 170 },
      angleToleranceDeg: 28
    }
  },
  {
    id: 2,
    pageLabel: "2/7",
    instruction: "Représenter la force exercée par la main gauche de l'haltérophile sur les haltères.",
    image: "assets/haltero.png",
    type: "exercise",
    expected: {
      tail: { x: 630, y: 305 },
      vector: { x: 0, y: -210 },
      originTolerance: 90,
      angleToleranceDeg: 22
    }
  },
  {
    id: 3,
    pageLabel: "3/7",
    instruction: "Représenter le poids du ballon.",
    image: "assets/basket.png",
    type: "exercise",
    expected: {
      tail: { x: 295, y: 91 },
      originZone: {
        type: "circle",
        cx: 295,
        cy: 91,
        r: 90
      },
      vector: { x: 0, y: 210 },
      angleToleranceDeg: 18
    }
  },
  {
    id: 4,
    pageLabel: "4/7",
    instruction: "Représenter la force exercée par le sol sur la balle de golf.",
    image: "assets/golf.png",
    type: "exercise",
    expected: {
      tail: { x: 401, y: 450 },
      vector: { x: 0, y: -190 },
      originTolerance: 85,
      angleToleranceDeg: 20
    }
  },
  {
    id: 5,
    pageLabel: "5/7",
    instruction: "Représenter la force exercée par la raquette sur la balle.",
    image: "assets/tennis.png",
    type: "exercise",
    expected: {
      tail: { x: 470, y: 305 },
      vector: { x: -180, y: 0 },
      originTolerance: 85,
      angleToleranceDeg: 20
    }
  },
  {
    id: 6,
    pageLabel: "6/7",
    instruction: "Représenter le poids du skieur.",
    image: "assets/skieur.png",
    type: "exercise",
    expected: {
      tail: { x: 407, y: 228 },
      vector: { x: 0, y: 210 },
      originTolerance: 95,
      angleToleranceDeg: 18
    }
  },
  {
    id: 7,
    pageLabel: "7/7",
    instruction:
      "Félicitations, tu as terminé l'activité !\n\nCLIC CI-DESSOUS pour valider ta participation sur Éléa.",
    image: "assets/fin.png",
    type: "end"
  }
];
