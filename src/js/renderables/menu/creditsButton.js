import {game, state, UITextButton} from "melonjs";

class CreditsButton extends UITextButton {
    constructor(x,y, width, height) {
        super(x,y, {
            font: 'PressStart2P',
            fontSize: 12,
            text: 'Credits',
            // if you omit the next two, size is calculated by the size of the text
            borderWidth: width,
            borderHeight: height,
            backgroundColor: '#00aa0080',
            hoverColor: '#00ff00ff'
        });
    }

    onClick(){
        state.change(state.CREDITS);
    }
}

export default CreditsButton;