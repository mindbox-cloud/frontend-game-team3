import {
  collision,
  Entity,
  Renderable,
  game,
  input,
  loader,
  Math,
  Vector2d,
  Rect,
} from "melonjs";
import { BLOCK_SIZE } from "../../constants/constants";

class BlockEntity extends Entity {
  /**
   * constructor
   */
  constructor(x, y) {
    // call the parent constructor
    let image = { width: 50, height: 25 };

    super(x, y, {
      width: image.width,
      height: image.height,
      shapes: [new Rect(0, 0, BLOCK_SIZE[0], BLOCK_SIZE[1])],
    });

    this.alwaysUpdate = false;
    this.body.collisionType = collision.types.ENEMY_OBJECT;
    this.speed = 4;
    this.dx = this.speed;
    this.dy = this.speed;
    this.name = "enemy";
    this.velx = 250;

    input.bindKey(input.KEY.LEFT, "left");
    input.bindKey(input.KEY.UP, "up");
    input.bindKey(input.KEY.DOWN, "down");
    input.bindKey(input.KEY.RIGHT, "right");
  }

  draw(renderer) {
    renderer.setColor("red");
    renderer.fill(this.body.shapes[0]);
  }

  /**
   * update the entity
   */
  update(dt) {
    super.update(dt);

    if (input.isKeyPressed("left")) {
      this.pos.x -= (this.velx * dt) / 1000;
    }

    if (input.isKeyPressed("right")) {
      this.pos.x += (this.velx * dt) / 1000;
    }

    if (input.isKeyPressed("up")) {
      this.pos.y -= (this.velx * dt) / 1000;
    }

    if (input.isKeyPressed("down")) {
      this.pos.y += (this.velx * dt) / 1000;
    }

    return true;
  }

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision(response, other) {
    if (response.b.body.collisionType === collision.types.PLAYER_OBJECT) {
      game.world.removeChild(this);
      return false;
    }
    return true;
  }
}

export default BlockEntity;
