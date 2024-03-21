import { game } from "melonjs";
import BlockEntity from "./renderables/block";
import { BLOCK_SIZE, BRICK_KINDS } from "../constants/constants";

const GAP = 2;
const TOP = BLOCK_SIZE[1];
const LEFT = BLOCK_SIZE[0];

export const generateLevel = () => {
  game.viewport.width;

  let top = 0;

  const ROWS = 4;
  const COLS = 10;

  const initialLeft =
    (game.viewport.width - (LEFT * (COLS + 2) + GAP * (COLS + 1))) / 2;

  let left = initialLeft;

  const blocks = [];
  let id = 1;
  for (let row = 1; row <= ROWS; row++) {
    top += TOP;
    for (let col = 1; col <= COLS; col++) {
      left += LEFT;
      blocks.push(
        new BlockEntity(left, top, { id: ++id, color: BRICK_KINDS[row].color, hp: BRICK_KINDS[row].hp })
      );
      if (col < COLS) left += GAP;
    }

    left = initialLeft;
    if (row < ROWS) top += GAP;
  }

  blocks.forEach((block) => {
    game.world.addChild(block);
  });
};
