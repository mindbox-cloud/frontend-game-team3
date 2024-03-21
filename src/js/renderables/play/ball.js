import {
  collision,
  Ellipse,
  Entity,
  game,
  loader,
  Math as MelonMath, state,
  Vector2d,
} from "melonjs";
import { BALL_SIZE, COLORS } from "../../../constants/constants.js";
import { reflectVector } from "../../vectormath.js";

function within(x, from, to) {
  return from <= x && x <= to;
}

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

    super(x, y, {
      width: BALL_SIZE,
      height: BALL_SIZE,
      anchorPoint: new Vector2d(0, 0),
      shapes: [new Ellipse(BALL_SIZE / 2, BALL_SIZE / 2, BALL_SIZE, BALL_SIZE)],
    });
    this.anchorPoint.set(0, 0);

    this.alwaysUpdate = false;
    this.body.collisionType = collision.types.PROJECTILE_OBJECT;
    this.speed = 8;
    this.vel = new Vector2d(this.speed, this.speed).normalize().scale(this.speed);
    this.minX = 0; //image.width / 2;
    this.minY = 0; //image.height / 2;
    this.maxX = game.viewport.width - image.width;
    this.maxY = game.viewport.height - image.height;
    this.name = "ball";

    this.flipX = false;
    this.flipY = false;
  }

  /**
   * update the entity
   */
  update(dt) {
    super.update(dt);

    const vel = this.vel.normalize().scale(this.speed);

    if (this.flipX) {
      this.vel.x = -this.vel.x;
      this.flipX = false;
    }
    if (this.flipY) {
      this.vel.y = -this.vel.y;
      this.flipY = false;
    }
    // update position
    this.pos.x += vel.x;
    this.pos.y += vel.y;

    // collision with walls
    if (this.pos.x < this.minX) {
      this.vel = reflectVector(vel, LeftBound);
    }
    if (this.pos.x > this.maxX) {
      this.vel = reflectVector(vel, RightBound);
    }
    if (this.pos.y < this.minY) {
      // increase difficulty
      this.speed += 0.1;
      this.vel = reflectVector(vel, TopBound);
    }
    // fell off(
    if (this.pos.y > this.maxY) {
      state.change(state.GAMEOVER, true);
      return true;
    }
    
    // clamp position
    this.pos.x = MelonMath.clamp(this.pos.x, this.minX, this.maxX);
    this.pos.y = MelonMath.clamp(this.pos.y, this.minY, this.maxY);

    return true;
  }

  _shouldFlip(b) {
    let flipX = false;
    let flipY = false;
    const aBounds = this.getBounds();
    const bBounds = b.getBounds();
    if (within(aBounds.centerX, bBounds.left, bBounds.right)) {
      return { y: true };
    } else if (within(aBounds.centerY, bBounds.top, bBounds.bottom)) {
      return { x: true };
    } else {
      return { x: true, y: true };
    }

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
      case collision.types.PLAYER_OBJECT: {
        const vel = this.vel.clone();
        // direct Y up
        vel.y = -Math.abs(vel.y);
        // modify x
        const ax = response.a.pos.x + response.a.width / 2;
        const bx = response.b.pos.x + response.b.width / 2;
        const hitPosition = (ax - bx) / response.b.width;
        vel.x = this.speed * hitPosition * 2;
        // clamp
        this.vel.setV(vel).normalize();
        if (Math.abs(vel.y) < 0.2) vel.y = -0.5;
        this.vel.setV(vel).normalize();
        return false;
      }
      case collision.types.ENEMY_OBJECT: {
        const { a, b, overlapV } = response;
        const aBounds = a.getBounds();
        const bBounds = b.getBounds();
        if (within(aBounds.centerX, bBounds.left, bBounds.right)) {
          this.flipY = true;
        } else if (within(aBounds.centerY, bBounds.top, bBounds.bottom)) {
          this.flipX = true;
        } else {
          this.flipX = true;
          this.flipY = true;
        }
        return false;
      }
      default:
        return false;
    }
  }
}

export default BallEntity;
