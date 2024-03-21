import { collision, Entity, game, Rect, audio, state } from "melonjs";
import { BLOCK_SIZE } from "../../constants/constants";

class BlockEntity extends Entity {
  /**
   * constructor
   */
  color = "red";
  isAlive = true;
  hp = 1;

  constructor(x, y, { color, id, hp }) {
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
    this.hp = hp;
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

  _hurt(dmg) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      audio.play("explosion", false, null, 0.4);
      game.world.removeChild(this);
      this.isAlive = false;
      const blocks = game.world.children.filter((child) =>
          child.name.includes("enemy")
      );

      if (blocks.length === 0 || (blocks.length === 1 && !blocks[0].isAlive))
        state.change(state.GAME_END, true);
    } else {
      audio.play("click1", false, null, 0.4);
    }
  }

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision(response, other) {
    if (response.b.body.collisionType === collision.types.PROJECTILE_OBJECT) {
      this._hurt(1);
      return false;
    }
    return false;
  }
}

export default BlockEntity;
