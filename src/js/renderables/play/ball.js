import {collision, Ellipse, Entity, game, input, loader, Math as MelonMath, Vector2d} from "melonjs";
import {BALL_SIZE, COLORS} from '../../../constants/constants.js';
import {reflectVector} from '../../vectormath.js';

const TopBound = new Vector2d(0, -1);
const LeftBound = new Vector2d(1, 0);
const RightBound = new Vector2d(-1, 0);
class BallEntity extends Entity {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        let image = loader.getImage("ball");

        super(x, y,  {
            width: BALL_SIZE,
            height: BALL_SIZE,
            anchorPoint: new Vector2d(0, 0),
            shapes: [
                new Ellipse(BALL_SIZE / 2, BALL_SIZE / 2, BALL_SIZE, BALL_SIZE)
            ]
        });
        this.anchorPoint.set(0, 0);

        this.alwaysUpdate = false
        this.body.collisionType = collision.types.PROJECTILE_OBJECT;
        this.speed = 4;
        this.vel = new Vector2d(this.speed, this.speed).normalize();
        this.minX = 0;
        this.minY = 0;
        this.maxX = game.viewport.width - image.width;
        this.maxY = game.viewport.height + image.height;
        this.name = 'ball';
    }

    /**
     * update the entity
     */
    update(dt) {
        super.update(dt);

        const vel = this.vel.normalize().scale(this.speed);
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if (this.pos.x < this.minX) {
            this.vel = reflectVector(this.vel, LeftBound);
        }
        if (this.pos.x > this.maxX) {
            this.vel = reflectVector(this.vel, RightBound);
        }
        if (this.pos.y < this.minY) {
            // increase difficulty
            this.speed += 0.1;
            this.vel = reflectVector(this.vel, TopBound);
        }
        if (this.pos.y > this.maxY) {
            this.ancestor.removeChild(this);
        }

        this.pos.x = MelonMath.clamp(this.pos.x, this.minX, this.maxX);
        this.pos.y = MelonMath.clamp(this.pos.y, this.minY, this.maxY);

        return true;
    }

    draw(renderer, viewport) {
        renderer.setColor(COLORS[15]);
        renderer.fill(this.body.shapes[0]);
    }

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        switch (response.b.body.collisionType) {
            case collision.types.PLAYER_OBJECT:
                const vel = this.vel.clone();
                // direct Y up
                vel.y = -Math.abs(vel.y);
                // modify x
                const ax = response.a.pos.x + response.a.width / 2;
                const bx = response.b.pos.x + response.b.width / 2;
                const hitPosition = (ax - bx) / response.b.width;
                vel.x = this.speed * hitPosition * 4;
                // clamp
                this.vel.setV(vel).normalize();
                return false;
            case collision.types.ENEMY_OBJECT:
                return true;
            default:
                return false;
        }
    }
};

export default BallEntity;
