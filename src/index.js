import {
  audio,
  loader,
  state,
  device,
  video,
  utils,
  plugin,
  pool,
} from "melonjs";

import "./index.css";

import TitleScreen from "./js/stage/title.js";
import PlayScreen from "./js/stage/play.js";
import PlayerEntity from "./js/renderables/play/player.js";

import DataManifest from "./manifest.js";
import CreditsScreen from "./js/stage/credits.js";
import BallEntity from "./js/renderables/play/ball";
import BlockEntity from "./js/renderables/block";
import GameOverScreen from "./js/stage/gameOver.js";
import YouWonScreen from "./js/stage/youWon.js";
import ReadyScreen from './js/stage/ready.js';

device.onReady(() => {
  // initialize the display canvas once the device/browser is ready
  if (!video.init(800, 600, { parent: "screen", scale: "auto" })) {
    alert("Your browser does not support HTML5 canvas.");
    return;
  }

  // initialize the debug plugin in development mode.
  if (process.env.NODE_ENV === "development") {
    import("@melonjs/debug-plugin").then((debugPlugin) => {
      // automatically register the debug panel
      utils.function.defer(
        plugin.register,
        this,
        debugPlugin.DebugPanelPlugin,
        "debugPanel"
      );
    });
  }

  // Initialize the audio.
  audio.init("mp3,ogg");

  // allow cross-origin for image/texture loading
  // loader.crossOrigin = "anonymous";

  // set and load all resources.
  loader.preload(DataManifest, function () {
    // set the user defined game stages
    state.set(state.MENU, new TitleScreen());
    state.set(state.READY, new ReadyScreen());
    state.set(state.PLAY, new PlayScreen());
    state.set(state.CREDITS, new CreditsScreen());
    state.set(state.GAMEOVER, new GameOverScreen());
    state.set(state.GAME_END, new YouWonScreen());

    // add our player entity in the entity pool
    pool.register("mainPlayer", PlayerEntity);

    // add our laser entity in the entity pool
    pool.register("ball", BallEntity, true);

    pool.register("block", BlockEntity, true);

    // Start the game.
    state.change(state.MENU, true);
  });
});
