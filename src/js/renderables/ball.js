import {
  collision,
  Ellipse,
  Entity,
  game,
  input,
  loader,
  Math,
  Vector2d,
} from "melonjs";
import { BALL_SIZE } from "../../constants/constants.js";

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
    this.speed = 4;
    this.dx = this.speed;
    this.dy = this.speed;
    this.minX = 0; //image.width / 2;
    this.minY = 0; //image.height / 2;
    this.maxX = game.viewport.width - image.width;
    this.maxY = game.viewport.height + image.height;
    this.name = "ball";
  }

  /**
   * update the entity
   */
  update(dt) {
    super.update(dt);

    this.pos.x += this.dx;
    this.pos.y += this.dy;

    if (this.pos.x < this.minX || this.pos.x > this.maxX) {
      this.dx = -this.dx;
    }
    if (this.pos.y < this.minY) {
      this.dy = -this.dy;
    }
    if (this.pos.y > this.maxY) {
      this.ancestor.removeChild(this);
    }

    this.pos.x = Math.clamp(this.pos.x, this.minX, this.maxX);
    this.pos.y = Math.clamp(this.pos.y, this.minY, this.maxY);

    return true;
  }

  draw(renderer, viewport) {
    renderer.setColor("red");
    // renderer.fillEllipse(
    //     this.width / 2, this.height / 2,
    //     this.width / 2, this.height / 2,
    // );
    renderer.fill(this.body.shapes[0]);
  }

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision(response, other) {
    switch (response.b.body.collisionType) {
      case collision.types.PLAYER_OBJECT:
        const vel = new Vector2d(this.dx, this.dy);
        // invert y
        vel.y = -vel.y;
        // modify x
        const ax = response.a.pos.x + response.a.width / 2;
        const bx = response.b.pos.x + response.b.width / 2;
        const hitPosition = (ax - bx) / response.b.width;
        vel.x = this.speed * hitPosition * 4;
        // clamp
        this.dx = (vel.x * this.speed) / vel.length();
        this.dy = (vel.y * this.speed) / vel.length();
        return false;
      case collision.types.ENEMY_OBJECT:
        return false;
    }
    return false;
  }
}

export default BallEntity;
