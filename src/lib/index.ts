// place files you want to import through the `$lib` alias in this folder.

type RGBAQuad = `#${string}`;

export type DutchBlitzColor = {
	colorName: 'RED' | 'GREEN' | 'YELLOW' | 'BLUE';
	normal: RGBAQuad;
	lowIntensity: RGBAQuad;
	highIntensity: RGBAQuad;
};

export type Player = {
	name: string;
	color: DutchBlitzColor;
};

type TwoPlayerGame = readonly [Player, Player];
type ThreePlayerGame = readonly [Player, Player, Player];
type FourPlayerGame = readonly [Player, Player, Player, Player];

export type GameSetup = TwoPlayerGame | ThreePlayerGame | FourPlayerGame;

export type PlayerOutcome = {
	blitzCardsRemaining: number;
	cardsPlayed: number;
};

export type OutcomeRound = {
	outcomes: Array<PlayerOutcome>;
};

export const roundsHaveValuableContent = (rounds: Array<OutcomeRound>): boolean => {
	if (rounds.length > 0) {
		const outcomes = rounds[0].outcomes;
		const sum = outcomes.reduce((acc, o) => {
			return acc + o.blitzCardsRemaining + o.cardsPlayed;
		}, 0);
		return sum !== 0;
	}

	return false;
}

export const roundTotal = (outcome: PlayerOutcome): number => {
	const blitzCards = outcome.blitzCardsRemaining;
	const playedCards = outcome.cardsPlayed;
	return blitzCards * -2 + playedCards;
};

export const playerTotal = (playerIndex: number, rounds: Array<OutcomeRound>): number => {
	const total = rounds.reduce((acc, rnd) => {
		const outcome = rnd.outcomes[playerIndex];

		return acc + roundTotal(outcome);
	}, 0);
	return total;
};

export type ColorMode = 'NORMAL' | 'LOW' | 'HIGH';

export const BLITZ_RED: DutchBlitzColor = {
	colorName: 'RED',
	normal: '#dd222280',
	lowIntensity: '#bb444460',
	highIntensity: '#bb444470'
};
export const BLITZ_GREEN: DutchBlitzColor = {
	colorName: 'GREEN',
	normal: '#22dd2280',
	lowIntensity: '#44bb4460',
	highIntensity: '#44bb4470'
};
export const BLITZ_YELLOW: DutchBlitzColor = {
	colorName: 'YELLOW',
	normal: '#dddd0080',
	lowIntensity: '#dddd0060',
	highIntensity: '#dddd0070'
};
export const BLITZ_BLUE: DutchBlitzColor = {
	colorName: 'BLUE',
	normal: '#0000dd80',
	lowIntensity: '#0000bb60',
	highIntensity: '#0000bb70'
};

export const deriveColor = (color: DutchBlitzColor, colorMode?: ColorMode): RGBAQuad => {
	if (!colorMode) {
		return color.normal;
	}

	switch (colorMode) {
		case 'LOW':
			return color.lowIntensity;
		case 'HIGH':
			return color.highIntensity;
		default:
			return color.normal;
	}
};

export const createRound = (numPlayers: number): OutcomeRound => {
	const outcomes: Array<PlayerOutcome> = [];

	for (let p = 0; p < numPlayers; p++) {
		outcomes.push({
			blitzCardsRemaining: 0,
			cardsPlayed: 0
		});
	}

	return {
		outcomes
	};
};
const LOCALSTORAGE_KEY = "blitzcorePlayers";

export const storeGameSetup = (setup: GameSetup): void => {
	Window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(setup));
};

export const DEFAULT_PLAYERS: Array<Player> = [
		{
			name: 'Alice',
			color: BLITZ_BLUE
		},
		{
			name: 'Bob',
			color: BLITZ_RED
		},
		{
			name: 'Charlie',
			color: BLITZ_YELLOW
		},
		{
			name: 'David',
			color: BLITZ_GREEN
		}
	] as const;

export const retrieveGameSetup = (): GameSetup => {
	const existing = Window.localStorage.getItem(LOCALSTORAGE_KEY);
	if (existing) {
		return JSON.parse(existing) as GameSetup;
	} else {
		return DEFAULT_PLAYERS as GameSetup;
	}
};
