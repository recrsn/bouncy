import "phaser";
import { renderDusk } from "./background";

export default class Intro extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private ball: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("bouncy");
  }

  preload() {
    this.load.spritesheet("ball", "assets/ball.png", {
      frameWidth: 50,
      frameHeight: 40,
    });
    this.load.image("ground", "assets/ground.png");
    this.load.image("grass", "assets/grass.png");
    this.load.audio("bounce", "assets/bounce.mp3", {
      instances: 1,
    });
  }

  create() {
    const graphics = this.add.graphics();
    renderDusk(graphics);

    const platforms = this.physics.add.staticGroup();

    const ground = this.add.tileSprite(0, 704, 2400, 48, "ground");
    this.add.tileSprite(0, 672, 2400, 16, "grass");

    platforms.add(ground);

    this.ball = this.physics.add.sprite(100, 450, "ball");

    this.ball.setMass(2);
    this.ball.setBounce(0.6);
    this.ball.setCollideWorldBounds(true);

    this.physics.add.collider(this.ball, platforms, () => {
      if (this.ball.body.wasTouching.none) {
        this.sound.play("bounce");
      }
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("ball", { start: 0, end: 9 }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("ball", { start: 9, end: 0 }),
      frameRate: 30,
      repeat: -1,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.ball.setVelocityX(-320);
      this.ball.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.ball.setVelocityX(320);
      this.ball.anims.play("right", true);
    } else if (
      this.ball.body.touching.down &&
      this.ball.body.velocity.y > -10
    ) {
      this.ball.setAccelerationX(
        Math.sign(this.ball.body.velocity.x) * -1 * 1000
      );
      this.ball.anims.play("turn");
    }

    if (Math.abs(this.ball.body.velocity.x) < 10) {
      this.ball.setVelocityX(0);
      this.ball.setAccelerationX(0);
    }

    if (this.cursors.up.isDown && this.ball.body.touching.down) {
      this.ball.setVelocityY(-350);
    }
  }
}
