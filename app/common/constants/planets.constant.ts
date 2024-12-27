const planets = [
  {
    name: "eyeke",
    key: "eyekeunn",
    image: "eyeke.png",
    address: "eye.unn.dac",
    minVote: 3,
  },
  {
    name: "neri",
    key: "neriunn",
    image: "neri.png",
    address: "ner.unn.dac",
    minVote: 3,
  },
  {
    name: "kavian",
    key: "kavianunn",
    image: "kavian.png",
    address: "kav.unn.dac",
    minVote: 3,
  },
  {
    name: "magor",
    key: "magorunn",
    image: "magor.png",
    address: "mag.unn.dac",
    minVote: 3,
  },
  {
    name: "naron",
    key: "naronunn",
    image: "naron.png",
    address: "nar.unn.dac",
    minVote: 3,
  },
  {
    name: "veles",
    key: "velesunn",
    image: "veles.png",
    address: "vel.unn.dac",
    minVote: 3,
  },
];

if (process.env.NEXT_PUBLIC_VERSION === 'DEV') {
  planets.push({
    name: "testa",
    key: "testa",
    image: "testa.png",
    address: "testadacdacc",
    minVote: 2,
  });
}

export type Planet = (typeof planets)[number];

export { planets };
