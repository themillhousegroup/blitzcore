// place files you want to import through the `$lib` alias in this folder.

type RGBTriple = `#${string}`

export type DutchBlitzColor = {
  colorName: "RED" | "GREEN" | "YELLOW" | "BLUE";
  rgbTriple: RGBTriple;
  lowIntensity: RGBTriple;
  highIntensity: RGBTriple;
}

export type Player = {
  name: string;
  color: DutchBlitzColor;
}

export type PlayerOutcome = {
  blitzCardsRemaining: number;
  cardsPlayed: number;
}

export type OutcomeRound = {
  outcomes: Array<PlayerOutcome>;
}

export type Game = {
  players: Array<Player>;
  rounds: Array<OutcomeRound>;
}

export const BLITZ_RED:DutchBlitzColor = {
  colorName: "RED",
  rgbTriple: "#dd222280",
  lowIntensity: "#bb444460",
  highIntensity: "#bb444470",
}
export const BLITZ_GREEN:DutchBlitzColor = {
  colorName: "GREEN",
  rgbTriple: "#22dd2280",
  lowIntensity: "#44bb4460",
  highIntensity: "#44bb4470",
}
export const BLITZ_YELLOW:DutchBlitzColor = {
  colorName: "YELLOW",
  rgbTriple: "#dddd0080",
  lowIntensity: "#bbbb4460",
  highIntensity: "#bbbb4470",
}
export const BLITZ_BLUE:DutchBlitzColor = {
  colorName: "BLUE",
  rgbTriple: "#2222dd80",
  lowIntensity: "#4444bb60",
  highIntensity: "#4444bb70",
}

export const createNewGameForPlayers = (players: Array<Player>): Game => {
  return {
    players,
    rounds: [createRound(players.length)]
  }
}

export const addRound = (game: Game): Game => {
  const { players, rounds } = game;
  rounds.push(createRound(players.length));
  return {
    players,
    rounds
  }
}

const createRound = (numPlayers: number): OutcomeRound => {
  const outcomes: Array<PlayerOutcome> = [];
  
  for (let p = 0; p < numPlayers; p++) {
    outcomes.push({
      blitzCardsRemaining: 0,
      cardsPlayed: 0,
    })
  }

  return {
    outcomes
  } 
}
