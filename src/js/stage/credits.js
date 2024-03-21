import {game, Text, Stage, state, input} from "melonjs";
import Credits from "../renderables/credits/credits.js";

class CreditsScreen extends Stage {
    /**
     *  action to perform on state change
     */

    onResetEvent() {
        game.world.addChild(new Credits(), 2);
        input.bindKey(input.KEY.ESC,     "back");
    }

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent() {
        ; // TODO
    }

    update(dt) {
        super.update(dt);
        if (input.isKeyPressed('back')) {
            state.change(state.MENU);
        }
        return true;
    }
};

export default CreditsScreen;
