import {
  Stage,
  game,
  ColorLayer,
  Vector2d,
  input,
  Sprite,
  loader,
  audio,
} from "melonjs";
import Player from "../renderables/play/player.js";
import BallEntity from "../renderables/play/ball.js";
import BlockEntity from "../renderables/block.js";
import { generateLevel } from "../levelGenerator.js";

class PlayScreen extends Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // add a gray background to the default Stage
    let backgroundImage = new Sprite(
      game.viewport.width / 2,
      game.viewport.height / 2,
      {
        image: loader.getImage("game_bg"),
      }
    );
    backgroundImage.scale(
      game.viewport.width / backgroundImage.width,
      game.viewport.height / backgroundImage.height
    );
    game.world.addChild(backgroundImage, 1);
    game.world.addChild(new Player(300, game.viewport.height, {}));
    game.world.addChild(new BallEntity(300, 300, {}));

    generateLevel();

    game.world.gravity = new Vector2d(0, 0);

    input.bindKey(input.KEY.LEFT, "left");
    input.bindKey(input.KEY.RIGHT, "right");
    input.bindKey(input.KEY.A, "left");
    input.bindKey(input.KEY.D, "right");

    input.bindKey(input.KEY.SPACE, "shoot", true);
    input.bindKey(input.KEY.Z, "shoot", true);

    audio.playTrack("game_music", 0.05);
  }

  onDestroyEvent() {
    audio.stopTrack();
  }
}

export default PlayScreen;
