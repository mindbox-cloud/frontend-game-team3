import {collision, Entity, game, input, loader, Math, Vector2d} from "melonjs";

class BallEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        let image = loader.getImage("ball");

        super(x, y,  { width: image.width, height: image.height, image: image });

        this.body.collisionType = collision.types.PROJECTILE_OBJECT;
        this.body.setMaxVelocity(15, 15);
        this.body.setFriction(0, 0);

        this.body.vel.set(10,-10);

        // this.dx = 10;
        // this.dy = -10;
        // this.minX = image.width / 2;
        // this.minY = image.height / 2;
        // this.maxX = game.viewport.width - image.width / 2;
        // this.maxY = game.viewport.height + image.height;
    }

    /**
     * update the entity
     */
    update(dt) {
        super.update(dt);

        // this.pos.x += this.dx;
        // this.pos.y += this.dy;
        //
        // this.pos.x = Math.clamp(this.pos.x, this.minX, this.maxX);
        // this.pos.y = Math.clamp(this.pos.y, this.minY, this.maxY);

        return true;
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        switch (response.b.body.collisionType) {
            case collision.types.PLAYER_OBJECT:
                return true;
            case collision.types.ENEMY_OBJECT:
                return false;
            case collision.types.WORLD_SHAPE:
                return true;
        }
        // Make all other objects solid
        return true;
    }
};

export default BallEntity;
