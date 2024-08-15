import { customAlphabet } from "nanoid";

function generateRandomId() {
  const alphabet = ".12345abcdefghijklmnopqrstuvwxyz";

  const nanoid = customAlphabet(alphabet, 9);

  const value = nanoid();
  return value;
}

export default generateRandomId;
