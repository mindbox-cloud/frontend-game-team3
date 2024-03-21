import {game, Stage, Text, input, state, audio, Sprite, loader} from "melonjs";

class YouWonScreen extends Stage {
    /**
     *  action to perform on state change
     */

    onResetEvent() {
        let backgroundImage = new Sprite(
            game.viewport.width / 2,
            game.viewport.height / 2,
            {
                image: loader.getImage("win"),
            }
        );
        backgroundImage.scale(
            game.viewport.width / backgroundImage.width,
            game.viewport.height / backgroundImage.height
        );
        game.world.addChild(backgroundImage, 1);
        game.world.addChild(new Text(
            game.viewport.width / 2,
            game.viewport.height / 2 - 100,
            {
                font: 'PressStart2P',
                weight: 'bold',
                size: 46,
                text: 'You won :)',
                fillStyle: '#000000',
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
                fillStyle: '#000000',
                textAlign: 'center',
            }
        ), 2);
        input.bindKey(input.KEY.ESC,     "back");
        audio.playTrack('win_music',  0.14);
    }

    update(dt) {
        super.update(dt);
        if (input.isKeyPressed('back')) {
            state.change(state.MENU, true);
        }
        return true;
    }

    onDestroyEvent(...args) {
        super.onDestroyEvent(...args);
        audio.stopTrack();
    }
};

export default YouWonScreen;
