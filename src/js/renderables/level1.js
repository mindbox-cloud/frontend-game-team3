import {
  collision,
  Entity,
  Renderable,
  game,
  input,
  loader,
  Math,
  Vector2d,
} from "melonjs";

class Level1Entity extends Entity {
  /**
   * constructor
   */
  constructor(x, y) {
    // call the parent constructor
    //let image = loader.getImage("ball");
    let image = { width: 50, height: 50 };

    super(x, y, { width: image.width, height: image.height });
    this.anchorPoint.set(0, 0);

    this.collisionType = collision.types.ENEMY_OBJECT;

    //this.body.setMaxVelocity(5, 0);
    //this.body.setFriction(0.4, 0);

    input.bindKey(input.KEY.LEFT, "left");
    input.bindKey(input.KEY.UP, "up");
    input.bindKey(input.KEY.DOWN, "down");
    input.bindKey(input.KEY.RIGHT, "right");

    this.velx = 450;
    //this.maxX = game.viewport.width - image.width / 2;
    //this.minX = image.width / 2;
    this.z = 0;
  }

  draw(renderer) {
    renderer.save();

    var hitbox = this.body.getBounds();

    console.log(hitbox.pos, this.pos.x);

    renderer.setColor("red");
    renderer.strokeRect(hitbox.left, hitbox.top, hitbox.width, hitbox.height);

    renderer.setColor("#ff00ff");
    renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);

    renderer.restore();
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
    console.log("FFF");
    /*console.log(
      response.b.body.collisionType === collision.types.PLAYER_OBJECT
    );*/

    if (response.b.body.collisionType === collision.types.PLAYER_OBJECT) {
      //console.log("BBBB");
      //game.world.removeChild(this);
      return true;
    }
    return true;
  }
}

export default Level1Entity;
