import { game } from "melonjs";
import BlockEntity from "./renderables/block";
import { BLOCK_SIZE, BRICK_KINDS } from "../constants/constants";
import levels from '../data/map/levels.js';

const GAP = 0;
const TOP = BLOCK_SIZE[1];
const LEFT = BLOCK_SIZE[0];

export const generateLevel = (levelId) => {
  const level = levels[levelId - 1];
  if (!levels) return "END";

  let top = 0;

  const ROWS = 4;
  const COLS = 10;

  const initialLeft =
    (game.viewport.width - (LEFT * (COLS + 2) + GAP * (COLS + 1))) / 2;

  let left = initialLeft;

  const blocks = [];
  let id = 1;
  for (let row = 0; row < level.length; row = row + 1) {
    top += TOP;
    for (let col = 0; col < level[row].length; col = col + 1) {
      left += LEFT;
      const blockId = level[row][col];
      const block = BRICK_KINDS[blockId];
      if (block.hp) {
        blocks.push(
            new BlockEntity(left, top, { id: ++id, color: block.color, hp: block.hp, required: block.required })
        );
      }
      if (col < COLS) left += GAP;
    }

    left = initialLeft;
    if (row < ROWS) top += GAP;
  }

  blocks.forEach((block) => {
    game.world.addChild(block);
  });
};
