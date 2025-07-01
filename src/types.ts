export type Player = "x" | "o";

export type GameType = "single-player" | "two-player" | null;

export type Board = (Player | null)[];

export type Winner = Player | "tie" | null;

