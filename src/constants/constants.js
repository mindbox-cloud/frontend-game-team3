export const BALL_SIZE = 32;

export const BLOCK_SIZE = [80, 35];

export const COLORS = [
  "#000000",
  "#1D2B53",
  "#7E2553",
  "#008751",
  "#AB5236",
  "#5F574F",
  "#C2C3C7",
  "#FFF1E8",
  "#FF004D",
  "#FFA300",
  "#FFEC27",
  "#00E436",
  "#29ADFF",
  "#83769C",
  "#FF77A8",
  "#FFCCAA",
];

export const BRICK_KINDS = [
  { color: COLORS[0], hp: 0, required: true },
  { color: COLORS[2], hp: 1, required: true },
  { color: COLORS[5], hp: 2, required: true },
  { color: COLORS[8], hp: 1, required: true },
  { color: COLORS[3], hp: 4, required: true },
  { color: COLORS[10], hp: 1000, required: false },
];
