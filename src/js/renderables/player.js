import {collision, Entity, game, input, pool, Math} from "melonjs";
import {BALL_SIZE} from '../../constants/constants.js';

class PlayerEntity extends Entity {
    static _baseWidth = 200;
    static _baseHeight = 32;

    /**
     * constructor
     */
    constructor(x, y, settings) {
        super(
            x,
            y - PlayerEntity._baseHeight,
            {
                width: PlayerEntity._baseWidth,
                height: PlayerEntity._baseHeight
            }
        );
        this.body.collisionType = collision.types.PLAYER_OBJECT;

        // walking & jumping speed
        this.body.setMaxVelocity(5, 0);
        this.body.setFriction(0.4, 0);

        this.velx = 450;
        this.maxX = game.viewport.width - this.width;
        this.minX = 0;

        this.hasBall = true;
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

        if (input.isKeyPressed("shoot")) {
            if (this.hasBall) {
                game.world.addChild(
                    pool.pull("ball", this.getBounds().centerX - BALL_SIZE / 2, this.getBounds().top)
                );
                this.hasBall = false;
            }
        }

        this.pos.x = Math.clamp(this.pos.x, this.minX, this.maxX);

        return true;
    }

    draw(renderer, viewport) {
        renderer.setColor('white')
        renderer.fillRect(
            0, 0,
            this.width, this.height,
        );
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        return false;
    }
};

export default PlayerEntity;
