// place files you want to import through the `$lib` alias in this folder.

export type NumberDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type HexadecimalDigit = "a" | "b" | "c" | "d" | "e" | "f";
export type HexDigit = NumberDigit | HexadecimalDigit;


export type DutchBlitzColor = {
  colorName: "RED" | "GREEN" | "YELLOW" | "BLUE";
  rgbTriple: `#${HexDigit}${HexDigit}${HexDigit}${HexDigit}${HexDigit}${HexDigit}";
}

export type Player = {
  name: string;
  color: DutchBlitzColor;
}
