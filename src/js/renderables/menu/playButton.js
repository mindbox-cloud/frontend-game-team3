import {state, UITextButton} from "melonjs";

class PlayButton extends UITextButton {
    constructor(x,y, width, height) {
        super(x,y, {
            font: 'PressStart2P',
            text: 'Play',
            // if you omit the next two, size is calculated by the size of the text
            borderWidth: width,
            borderHeight: height,
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff'
        });
    }

    onClick(){
        state.change(state.READY, true, true);
    }
}

export default PlayButton;
