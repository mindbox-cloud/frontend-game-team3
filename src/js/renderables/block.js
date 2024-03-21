import { collision, Entity, game, Rect, audio, state } from "melonjs";
import {BLOCK_SIZE, COLORS} from "../../constants/constants";

class BlockEntity extends Entity {
  /**
   * constructor
   */
  color = "red";
  isAlive = true;
  hp = 1;

  constructor(x, y, { color, id, hp, required }) {
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
    this.required = required;
  }

  draw(renderer) {
    renderer.setColor(COLORS[7]);
    renderer.fillRect(0, 0, this.width-1, this.height-1);
    renderer.setColor(COLORS[0]);
    renderer.fillRect(1, 1, this.width-1, this.height-1);
    renderer.setColor(this.color);
    renderer.fillRect(1, 1, this.width-2, this.height-2);
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
      if (!this._haveAliveBlocksLeft()) {
        console.log('changing state');
        state.change(state.READY, true, true);
      }
    } else {
      audio.play("click1", false, null, 0.4);
    }
  }

  _haveAliveBlocksLeft() {
    const blocks = game.world.children.filter((child) => {
      return child.name.includes("enemy") && child.required
    });

    if (blocks.length === 0) return false;
    if (blocks.length === 1) return blocks[0].isAlive;
    return true;
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
