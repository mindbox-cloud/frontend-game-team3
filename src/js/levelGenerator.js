import { game } from "melonjs";
import BlockEntity from "./renderables/block";
import { BLOCK_SIZE } from "../constants/constants";

const GAP = 2;
const TOP = BLOCK_SIZE[1];
const LEFT = BLOCK_SIZE[0];
const BLOCKS_COUNT = 27;

export const generateLevel = () => {
  let top = 0;
  let left = 0;
  const ROWS = 4;
  const COLS = 10;

  const blocks = [];
  let id = 1;
  for (let row = 0; row < ROWS; row++) {
    top += TOP;
    for (let col = 0; col < COLS; col++) {
      left += LEFT;
      blocks.push(new BlockEntity(left, top, { id: ++id, color: "green" }));
      if (col < COLS - 1) left += GAP;
    }

    left = 0;
    if (row < ROWS - 1) top += GAP;
  }

  blocks.forEach((block) => {
    game.world.addChild(block);
  });
};
