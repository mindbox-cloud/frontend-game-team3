import { collision, Entity, game, Rect, audio } from "melonjs";
import { BLOCK_SIZE } from "../../constants/constants";

class BlockEntity extends Entity {
  /**
   * constructor
   */
  color = "red";

  constructor(x, y, { color, id }) {
    // call the parent constructor
    let image = { width: BLOCK_SIZE[0], height: BLOCK_SIZE[1] };

    super(x, y, {
      width: image.width,
      height: image.height,
      shapes: [new Rect(0, 0, BLOCK_SIZE[0], BLOCK_SIZE[1])],
    });

    this.color = color;
    this.alwaysUpdate = false;
    this.body.collisionType = collision.types.ENEMY_OBJECT;
    this.name = `${id}enemy`;
  }

  draw(renderer) {
    renderer.setColor(this.color);
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
    if (response.b.body.collisionType === collision.types.PROJECTILE_OBJECT) {
      audio.play("explosion");
      game.world.removeChild(this);
      return false;
    }
    return false;
  }
}

export default BlockEntity;
