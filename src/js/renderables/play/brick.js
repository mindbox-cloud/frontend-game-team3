import {collision, Ellipse, Entity, RoundRect} from 'melonjs';
import {BALL_SIZE, BRICK_HEIGHT, BRICK_WIDTH, COLORS} from '../../../constants/constants.js';

export class BrickEntity extends Entity {
    constructor(x, y, hp, color) {
        super(x, y, {
            width: BRICK_WIDTH,
            height: BRICK_HEIGHT,
            shapes: [
                new Ellipse(
                    BRICK_WIDTH / 2, BRICK_HEIGHT / 2,
                    BRICK_WIDTH, BRICK_HEIGHT,
                )
            ]
        });
        this.hp = hp;
        this.color = color;
        this.istate = 0;
        this.body.collisionType = collision.types.ENEMY_OBJECT;
    }

    update(dt) {
        this.istate -= dt;
        return super.update(dt);
    }

    draw(renderer, viewport) {
        renderer.setColor(this.color);
        renderer.fill(this.body.shapes[0]);
    }

    _hurt(dmg = 1) {
        if (this.istate > 0) return;
        this.istate = 1;
        this.hp -= dmg;
        if (this.hp < 0) {
            this.ancestor.removeChild(this);
        }
    }

    onCollision(response, other) {
        switch (response.b.body.collisionType) {
            case collision.types.PROJECTILE_OBJECT:
                this._hurt();
                return false;
            default:
                return false;
        }
    }
}
