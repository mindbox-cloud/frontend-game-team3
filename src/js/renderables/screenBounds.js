import {collision, Entity, game, input, loader, Math, ObservableVector2d, Rect, Vector2d} from "melonjs";

class ScreenBoundsEntity extends Entity {

    /**
     * constructor
     */
    constructor() {
        let image = loader.getImage("border");

        super(0, 0, {
            width: game.viewport.width,
            height: game.viewport.height,
            image,
            anchorPoint: new Vector2d( 0 , 0),
        });

        this.body.collisionType = collision.types.WORLD_SHAPE
    }

    /**
     * update the entity
     */
    update(dt) {
        // super.update(dt);
        this.body.vel.set(0, 0);
        return true;
    }

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        if (response.b.name) console.log('collided with', response.b.name);
        return false;
    }
};

export default ScreenBoundsEntity;
