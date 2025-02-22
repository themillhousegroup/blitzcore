// place files you want to import through the `$lib` alias in this folder.

type RGBAQuad = `#${string}`

export type DutchBlitzColor = {
  colorName: "RED" | "GREEN" | "YELLOW" | "BLUE";
  normal: RGBAQuad;
  lowIntensity: RGBAQuad;
  highIntensity: RGBAQuad;
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
  focusedRoundIndex: number;
}

export const roundTotal = (outcome: PlayerOutcome): number => {
  const blitzCards = outcome.blitzCardsRemaining;
  const playedCards = outcome.cardsPlayed;
  return (blitzCards * -2) + playedCards;
}

export const playerTotal = (playerIndex: number, rounds: Array<OutcomeRound>): number => {
  const total = rounds.reduce((acc, rnd) => {
    const outcome = rnd.outcomes[playerIndex];
    
    return acc + roundTotal(outcome);
  }, 0)
  return total;
}

export type ColorMode = "NORMAL" | "LOW" | "HIGH"

export const BLITZ_RED:DutchBlitzColor = {
  colorName: "RED",
  normal: "#dd222280",
  lowIntensity: "#bb444460",
  highIntensity: "#bb444470",
}
export const BLITZ_GREEN:DutchBlitzColor = {
  colorName: "GREEN",
  normal: "#22dd2280",
  lowIntensity: "#44bb4460",
  highIntensity: "#44bb4470",
}
export const BLITZ_YELLOW:DutchBlitzColor = {
  colorName: "YELLOW",
  normal: "#dddd0080",
  lowIntensity: "#dddd0060",
  highIntensity: "#dddd0070",
}
export const BLITZ_BLUE:DutchBlitzColor = {
  colorName: "BLUE",
  normal: "#1111dd80",
  lowIntensity: "#1111bb60",
  highIntensity: "#1111bb70",
}

export const deriveColor = (color: DutchBlitzColor, colorMode?: ColorMode): RGBAQuad => {
  if (!colorMode) {
    return color.normal;
  }
  
  switch(colorMode) {
    case "LOW":
      return color.lowIntensity;
    case "HIGH":
      return color.highIntensity;
    default:
      return color.normal;
  }
}

export const createNewGameForPlayers = (players: Array<Player>): Game => {
  return {
    players,
    rounds: [createRound(players.length)],
    focusedRoundIndex: 0
  }
}

export const addRound = (game: Game): Game => {
  const { players, rounds } = game;
  rounds.push(createRound(players.length));
  return {
    players,
    rounds,
    focusedRoundIndex: rounds.length -1
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
