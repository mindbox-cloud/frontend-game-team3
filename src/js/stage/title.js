import { audio, game, loader, Sprite, Stage, Text } from "melonjs";
import PlayButton from "../renderables/menu/playButton.js";
import CreditsButton from "../renderables/menu/creditsButton.js";

class TitleScreen extends Stage {
  /**
   *  action to perform on state change
   */

  onResetEvent() {
    // new sprite for the title screen, position at the center of the game viewport and scale to fit
    let backgroundImage = new Sprite(
      game.viewport.width / 2,
      game.viewport.height / 2,
      {
        image: loader.getImage("title_background"),
      }
    );
    backgroundImage.scale(
      game.viewport.width / backgroundImage.width,
      game.viewport.height / backgroundImage.height
    );
    game.world.addChild(backgroundImage, 1);

    game.world.addChild(
      new Text(game.viewport.width / 2, game.viewport.height / 2 - 100, {
        font: "PressStart2P",
        weight: "bold",
        size: 46,
        text: "Brick Breaker",
        fillStyle: "#eae9e9",
        textAlign: "center",
      })
    );

    game.world.addChild(
      new PlayButton(
        game.viewport.width / 2 - 100,
        game.viewport.height / 2 - 20,
        200,
        40
      ),
      2
    );

    game.world.addChild(
      new CreditsButton(
        game.viewport.width / 2 - 100,
        game.viewport.height / 2 + 40,
        200,
        40
      ),
      2
    );

    audio.playTrack("menu_music", 0.2);
  }

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent() {
    audio.stopTrack();
  }
}

export default TitleScreen;
