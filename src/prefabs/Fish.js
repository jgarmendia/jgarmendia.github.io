class Fish extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, img, isPlayer) {
    super(scene, x, y, img);

    //this.scene = scene;
   // scene.physics.add.image(100, 100, "fish"); // estatico TEST pochito

    scene.physics.world.enable(this);
    this.fish = scene.add.existing(this); // pez creado desde playScene (this.fish)
    //scene.physics.add.existing(this);

    this.fishBody = this.fish.body;

    this.fish.setBounce(0.2);
    //this.fish.setScale(0.5); // escala
    

    this.speed = Phaser.Math.GetSpeed(600, 6);
    this.vel = 100;
    this.moveTypes = ["vel", "delta"];
    this.moveType = this.moveTypes[1];

    // movimiento por cursor (teclado)
    this.isPlayer = isPlayer;

    // Pet
    /// creo que mejor era tener una pet animation, con una duracion... ;( )
    this.fish.setInteractive();

    this.fish.on("pointerdown", pointer => {
      this.fish.setTexture("pet");
    });

    this.fish.on("pointerout", pointer => {
      this.fish.setTexture("fish");
    });

    // evento para movimiento random
    this.npcEvent = scene.time.addEvent({
      delay: 1000,
      callback: this.callRandomSwim,
      callbackScope: this
    });

    // tap to move fish
    if (this.isPlayer) {
      this.scene.input.on(
        "pointerdown",
        pointer => {
          // console.log("pointer coords: " + pointer.x, pointer.y); //200
          this.scene.physics.moveTo(this.fish, pointer.x, pointer.y, 150);
          this.fish.body.setDrag(185, 185);
          // flip
          if (this.x < pointer.x) {
            this.flipX = true;
          } else {
            this.flipX = false;
          }
        },
        this
      );
    }

    this.setCollideWorldBounds(true);
  }

  init() {
    console.log("soy Fish init");
  }

  update(cursors, time, delta) {
    if (this.isPlayer) {
      // moveTypes[0] no permite movimiento con click (mueve muy pocos px)
      if (this.moveType === this.moveTypes[0]) {
        const normSpeed = 175;
        this.fishBody.setVelocity(0);

        if (cursors.up.isDown) {
          this.fishBody.setVelocityY(-this.vel);
        } else if (cursors.down.isDown) {
          this.fishBody.setVelocityY(this.vel);
        }

        if (cursors.left.isDown) {
          this.fishBody.setVelocityX(-this.vel);
        } else if (cursors.right.isDown) {
          this.fishBody.setVelocityX(this.vel);
        }
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.fishBody.velocity.normalize().scale(normSpeed);
      }

      // permite movimiento con cursors y click
      if (this.moveType === this.moveTypes[1]) {
        if (cursors.up.isDown) {
          this.y -= this.speed * delta;
        } else if (cursors.down.isDown) {
          this.y += this.speed * delta;
        }

        if (cursors.left.isDown) {
          this.x -= this.speed * delta;
          this.flipX = false;
        } else if (cursors.right.isDown) {
          this.x += this.speed * delta;
          this.flipX = true;
        }
      }
    }
  }

  // mueve al pez a random x, y
  randomSwim() {
    const WIDTH = this.scene.sys.game.config.width;
    const HEIGHT = this.scene.sys.game.config.height;
    let randomX = Phaser.Math.Between(0, WIDTH);
    let randomY = Phaser.Math.Between(0, HEIGHT);
    const speedArr = [30, 35, 40, 50, 60, 70];
    let randomSpeed = speedArr[Phaser.Math.Between(0, 5)];

    // vector sirve si se usa moveToobject
    // let vector = new Phaser.Math.Vector2(randomX, randomY);

    this.scene.physics.moveTo(this.fish, randomX, randomY, randomSpeed);
    this.fish.body.setDrag(10, 10); //50
    if (this.x < randomX) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }
    // console.log("movimiento a: " + randomX, +" " + randomY);
  }

  callRandomSwim() {
    if (!this.isPlayer) {
      let newDelay = Phaser.Math.Between(500, 4000);
      this.randomSwim();

      this.npcEvent.reset({
        delay: newDelay,
        callback: this.callRandomSwim,
        callbackScope: this,
        repeat: 0,
        loop: true
      });
    }
  }
}

export default Fish;
