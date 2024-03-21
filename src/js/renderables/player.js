import {collision, Entity, game, input, loader, Math} from "melonjs";

class PlayerEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        let image = loader.getImage("player");

        super(
            game.viewport.width / 2 - image.width / 2,
            game.viewport.height - image.height,
            { width: image.width, height: image.height, image: image }
        );

        this.body.collisionType = collision.types.PLAYER_OBJECT;

        // walking & jumping speed
        this.body.setMaxVelocity(5, 0);
        this.body.setFriction(0.4, 0);

        input.bindKey(input.KEY.LEFT,  "left");
        input.bindKey(input.KEY.RIGHT, "right");

        input.bindKey(input.KEY.A,     "left");
        input.bindKey(input.KEY.D,     "right");

        this.velx = 450;
        this.maxX = game.viewport.width - image.width / 2;
        this.minX = image.width / 2;
    }

    /**
     * update the entity
     */
    update(dt) {
        super.update(dt);

        if (input.isKeyPressed("left")) {
            this.pos.x -= this.velx * dt / 1000;
        }

        if (input.isKeyPressed("right")) {
            this.pos.x += this.velx * dt / 1000;
        }

        // if (input.isKeyPressed("shoot")) {
        //     me.game.world.addChild(me.pool.pull("laser", this.getBounds().centerX - CONSTANTS.LASER.WIDTH / 2, this.getBounds().top));
        // }

        this.pos.x = Math.clamp(this.pos.x, this.minX, this.maxX);

        return true;
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        // Make all other objects solid
        return true;
    }
};

export default PlayerEntity;
