import { v4 as uuid } from "uuid";
import { customAlphabet } from "nanoid";
import { Vote } from "@/app/context/VotesContext";

export const format_job_Duration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (hours < 24 * 7) {
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (hours < 24 * 30) {
    const weeks = Math.floor(hours / (24 * 7));
    return `${weeks} week${weeks !== 1 ? 's' : ''}`;
  } else {
    const months = Math.floor(hours / (24 * 30));
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
};

export const CardStatus = {
  all_proposals: "all_proposals",
  voting: "voting",
  in_progress: "in_progress",
  finalizing: "finalizing",
  completed: "completed",
  in_dispute: "in_dispute",
  rejected: "rejected",
  expired: "expired",
} as const;

export interface CardData {
  id: string;
  title: string;
  description: string;
  owner: string;
  arbiter: string;
  cost: string;
  expiry: Date;
  job_duration: number;
  votes: Vote[];
  votesFinal: Vote[];
  votesDeny: Vote[];
  votesNeeded: number;
  arbiter_agreed: boolean;
  contentHash: string;
  cardstate: string;
  status: (typeof CardStatus)[keyof typeof CardStatus] | string;
}

class GenerateFakeCardData {
  constructor() {}

  lorem = {
    words: (count = 3) => {
      const wordsArray = [
        "lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing",
        "elit",
      ];
      let result = [];
      for (let i = 0; i < count; i++) {
        result.push(wordsArray[Math.floor(Math.random() * wordsArray.length)]);
      }
      return result.join(" ");
    },
    paragraph: (sentencesCount = 3) => {
      let paragraph = "";
      for (let i = 0; i < sentencesCount; i++) {
        paragraph += this.lorem.words(10) + ". ";
      }
      return paragraph.trim();
    },
  };

  name = {
    wallet: () => {
      const alphabet = ".12345abcdefghijklmnopqrstuvwxyz";

      const nanoid = customAlphabet(alphabet, 9);

      const value = nanoid();
      const walletAddedSufix = value.replace(/.{4}$/, ".wam");
      return walletAddedSufix;
    },
  };

  finance = {
    amount: (min = 0, max = 1000, decimals = 2) => {
      const amount = Math.random() * (max - min) + min;
      return amount.toFixed(decimals);
    },
  };

  date = {
    future: (maxDays = 30) => {
      const now = new Date();
      const randomDays = Math.floor(Math.random() * maxDays) + 1;
      now.setDate(now.getDate() + randomDays);
      return now;
    },
  };

  random = {
    number: (min = 0, max = 100) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  };

  generateCardData(): CardData {
    const expiry = this.date.future();
    const randomStatus = this.random.number(0, 6);
    const job_duration = this.random.number(1, 30);
    return {
      id: uuid(),
      title: this.lorem.words(3),
      description: this.lorem.paragraph(3),
      owner: this.name.wallet(),
      arbiter: this.name.wallet(),
      cost: this.finance.amount(1, 100) + " TLM",
      expiry,
      job_duration,
      votes: [],
      votesFinal: [],
      votesDeny: [],
      votesNeeded: this.random.number(100, 200),
      arbiter_agreed: Math.random() > 0.5,
      cardstate: "aeiou",
      status:
        Object.values(CardStatus).slice(1)?.[randomStatus] ??
        CardStatus.all_proposals,
      contentHash: "Qm" + this.random.number(100000000, 999999999),
    };
  }
}

export default GenerateFakeCardData.prototype.generateCardData.bind(
  new GenerateFakeCardData()
);
