const planets = [
  {
    name: "eyeke",
    key: "eyekeunn",
    image: "eyeke.png",
    address: "eyeke.dac",
    minVote: 3,
  },
  {
    name: "neri",
    key: "neriunn",
    image: "neri.png",
    address: "neri.dac",
    minVote: 3,
  },
  {
    name: "kavian",
    key: "kavianunn",
    image: "kavian.png",
    address: "kavian.dac",
    minVote: 3,
  },
  {
    name: "magor",
    key: "magorunn",
    image: "magor.png",
    address: "magor.dac",
    minVote: 3,
  },
  {
    name: "naron",
    key: "naronunn",
    image: "naron.png",
    address: "naron.dac",
    minVote: 3,
  },
  {
    name: "veles",
    key: "velesunn",
    image: "veles.png",
    address: "veles.dac",
    minVote: 3,
  },
  {
    name: "testa",
    key: "testa",
    image: "testa.png",
    address: "testadacdacc",
    minVote: 2,
  },
];

export type Planet = (typeof planets)[number];

export { planets };
