export type Joke = {
  category: string;
  type: "single" | "twopart";
  joke: string;
  flags: Flags;
  id: number;
  safe: boolean;
  lang: string;
};

type Flags = {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
};

export default Joke;
