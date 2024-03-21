import {collision, Entity, game, input, loader, Math, Vector2d} from "melonjs";

class BallEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        let image = loader.getImage("ball");

        super(x, y,  { width: image.width, height: image.height, image: image });

        this.dx = 10;
        this.dy = -10;
        this.minX = image.width / 2;
        this.minY = image.height / 2;
        this.maxX = game.viewport.width - image.width / 2;
        this.maxY = game.viewport.height - image.height / 2;
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
       if (response.b.body.collisionType === collision.types.PLAYER_OBJECT) {
       } else if (response.b.body.collisionType === collision.types.ENEMY_OBJECT) {
           // makes the other object solid, by substracting the overlap vector to the current position
           this.pos.sub(response.overlapV);
           this.hurt();
           // not solid
           return false;
       }
        // Make all other objects solid
        return true;
    }
};

export default BallEntity;
