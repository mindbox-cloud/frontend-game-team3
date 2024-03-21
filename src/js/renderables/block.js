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
    let image = { width: BLOCK_SIZE[0], height: BLOCK_SIZE[1] };

    super(x, y, {
      width: image.width,
      height: image.height,
      shapes: [new Rect(0, 0, BLOCK_SIZE[0], BLOCK_SIZE[1])],
    });

    this.alwaysUpdate = false;
    this.body.collisionType = collision.types.ENEMY_OBJECT;
    this.name = "enemy";
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
