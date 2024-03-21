import {collision, Entity, game, input, loader, Math, ObservableVector2d, Rect, Vector2d} from "melonjs";

class ScreenBoundsEntity extends Entity {

    /**
     * constructor
     */
    constructor() {
        let image = loader.getImage("border");

        super(10, 10, {
            width: game.viewport.width,
            height: 10,
            image,
            anchorPoint: new Vector2d( 0 , 0)
        });

        this.body.collisionType = collision.types.WORLD_SHAPE
        // this.body.setMaxVelocity(0, 0);
        // this.body.setFriction(0, 0);
        // this.anchorPoint.set(1, 1);

        // this.body.addShape(new Rect(0, 0, this.width, 10))
    }

    /**
     * update the entity
     */
    update(dt) {
        super.update(dt);
        return true;
    }

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        return false;
    }
};

export default ScreenBoundsEntity;
