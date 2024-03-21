import {game, Stage, state, input, BitmapText} from "melonjs";

class ReadyScreen extends Stage {
    level = 0;
    /**
     *  action to perform on state change
     */

    onResetEvent(force, switchLevel = true) {
        if (switchLevel) this.level += 1;
        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height / 2,  {
            font : "PressStart2P",
            size : 1.5,
            textBaseline : "middle",
            textAlign : "center",
            text : `LEVEL ${this.level} PRESS SPACE`
        }));
        input.bindKey(input.KEY.SPACE,     "next");
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {
        ; // TODO
    }

    update(dt) {
        super.update(dt);
        if (input.isKeyPressed('next')) {
            state.change(state.PLAY, true, this.level);
        }
        return true;
    }
};

export default ReadyScreen;
