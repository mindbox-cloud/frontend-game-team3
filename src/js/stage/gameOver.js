import {game, Stage, Text, input, state, audio} from "melonjs";

class GameOverScreen extends Stage {
    /**
     *  action to perform on state change
     */

    onResetEvent() {
        game.world.addChild(new Text(
            game.viewport.width / 2,
            game.viewport.height / 2 - 100,
            {
                font: 'PressStart2P',
                weight: 'bold',
                size: 46,
                text: 'Game Over :(',
                fillStyle: '#eae9e9',
                textAlign: 'center',
            }
        ), 2);
        game.world.addChild(new Text(
            game.viewport.width / 2,
            game.viewport.height / 2,
            {
                font: 'PressStart2P',
                weight: 'bold',
                size: 36,
                text: 'Press ESC to go back to the main menu.',
                fillStyle: '#eae9e9',
                textAlign: 'center',
            }
        ), 2);
        input.bindKey(input.KEY.ESC,     "back");
        audio.play('game_over', false, null, 0.14);
    }

    update(dt) {
        super.update(dt);
        if (input.isKeyPressed('back')) {
            state.change(state.MENU);
        }
        return true;
    }

    onDestroyEvent(...args) {
        super.onDestroyEvent(...args);
        audio.stop('game_over');
    }
};

export default GameOverScreen;
