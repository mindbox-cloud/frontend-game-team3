import {collision, game, Text} from "melonjs";

class Credits extends Text {

    constructor() {
        super(
        game.viewport.width / 2,
        game.viewport.height / 2 - 20,
        {
            font: 'PressStart2P',
            size: 26,
            text: 'Credits:\n\nDmitry Scripunov\nTarasov Daniil\nIvan Firsov',
            fillStyle: '#eae9e9',
            textAlign: 'center',
        });
    }

    update(dt) {
        super.update(dt);
        this.pos.y -= 1;
        return true;
    }
}

export default Credits;