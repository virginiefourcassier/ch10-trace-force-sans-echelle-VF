const EXERCISES = [
  {
    id: 0,
    pageLabel: "0/6",
    title: "UTILISATION DE LA SOURIS",
    instruction:
      "Pour positionner la flèche : cliquer sur l'origine de la flèche et glisser la souris puis relâcher ; cliquer sur l'extrémité de la flèche et glisser la souris puis relâcher.",
    image: "assets/training.jpg",
    type: "training",
    initialArrow: { tail: { x: 180, y: 380 }, head: { x: 300, y: 280 } }
  },
  {
    id: 1,
    pageLabel: "1/6",
    instruction: "Représenter la force exercée par la corde sur le planeur.",
    image: "assets/planeur.png",
    type: "exercise",
    expected: {
      tail: { x: 520, y: 275 },
      vector: { x: -250, y: -70 },
      originTolerance: 28,
      angleToleranceDeg: 14
    }
  },
  {
    id: 2,
    pageLabel: "2/6",
    instruction: "Représenter la force exercée par la main gauche de l'haltérophile sur les haltères.",
    image: "assets/haltero.png",
    type: "exercise",
    expected: {
      tail: { x: 345, y: 170 },
      vector: { x: 0, y: -210 },
      originTolerance: 30,
      angleToleranceDeg: 12
    }
  },
  {
    id: 3,
    pageLabel: "3/6",
    instruction: "Représenter le poids du ballon.",
    image: "assets/basket.png",
    type: "exercise",
    expected: {
      tail: { x: 525, y: 120 },
      vector: { x: 0, y: 210 },
      originTolerance: 34,
      angleToleranceDeg: 10
    }
  },
  {
    id: 4,
    pageLabel: "4/6",
    instruction: "Représenter la force exercée par le sol sur la balle de golf.",
    image: "assets/golf.png",
    type: "exercise",
    expected: {
      tail: { x: 407, y: 360 },
      vector: { x: 0, y: -190 },
      originTolerance: 26,
      angleToleranceDeg: 12
    }
  },
  {
    id: 5,
    pageLabel: "5/6",
    instruction: "Représenter la force exercée par la raquette sur la balle.",
    image: "assets/tennis.png",
    type: "exercise",
    expected: {
      tail: { x: 470, y: 305 },
      vector: { x: -180, y: 0 },
      originTolerance: 28,
      angleToleranceDeg: 12
    }
  },
  {
    id: 6,
    pageLabel: "6/6",
    instruction: "Représenter le poids du skieur.",
    image: "assets/skieur.png",
    type: "exercise",
    expected: {
      tail: { x: 470, y: 170 },
      vector: { x: 0, y: 210 },
      originTolerance: 34,
      angleToleranceDeg: 10
    }
  }
];
