const planets = [
  {
    name: "eyeke",
    key: "eyeke",
    image: "eyeke.png",
    address: "eyeke.dac",
    minVote: 3,
  },
  {
    name: "neri",
    key: "nerix",
    image: "neri.png",
    address: "neri.dac",
    minVote: 3,
  },
  {
    name: "kavian",
    key: "kavian",
    image: "kavian.png",
    address: "kavian.dac",
    minVote: 3,
  },
  {
    name: "magor",
    key: "magor",
    image: "magor.png",
    address: "magor.dac",
    minVote: 3,
  },
  {
    name: "naron",
    key: "naron",
    image: "naron.png",
    address: "naron.dac",
    minVote: 3,
  },
  {
    name: "veles",
    key: "veles",
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
