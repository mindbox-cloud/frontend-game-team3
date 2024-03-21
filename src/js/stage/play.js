import {Stage, game, ColorLayer, BitmapText, Body, Vector2d} from "melonjs";
import Player from '../renderables/player.js';
import BallEntity from '../renderables/ball.js';
import ScreenBoundsEntity from '../renderables/screenBounds.js';

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // add a gray background to the default Stage
        game.world.addChild(new ColorLayer("background", "#202020"));
        game.world.addChild(new Player(0, 0, {}));
        game.world.addChild(new BallEntity(300, 300, {}));
        game.world.addChild(new ScreenBoundsEntity());

        game.world.gravity = new Vector2d(0, 0);
    }
}

export default PlayScreen;
