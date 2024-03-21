import {collision, Entity, game, input, loader, Math, ObservableVector2d, Rect, Vector2d} from "melonjs";

class ScreenBoundsEntity extends Entity {

    /**
     * constructor
     */
    constructor() {
        super(-100, -100, { width: game.viewport.width + 200, height: game.viewport.height + 200 });

        this.anchorPoint = new Vector2d(0, 0);
        this.body.collisionType = collision.types.WORLD_SHAPE;

        this.body.addShape(new Rect(0, -100, this.width + 200, 100))
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
        return true;
    }
};

export default ScreenBoundsEntity;
