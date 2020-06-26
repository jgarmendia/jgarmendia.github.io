import Fish from "../prefabs/Fish.js";

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  init() {
   // console.log("soy Play");
  }

  create() {
    // crea al pez (escena, x, y, img, isPlayer)

    //NPCs
    this.fish2 = new Fish(this, 80, 80, "fish", false);
    this.fish3 = new Fish(this, 30, 60, "fish", false);
    this.fish4 = new Fish(this, 70, 20, "fish", false);

    // Player
    this.fish = new Fish(this, 50, 50, "fish", true);

    // setup keyboard cursors
    this.cursors = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN
    });

    // always checks for pet
    this.input.setPollAlways();

    // Quit Button
    this.quitButton = this.add.text(10, 5, "Salir", {
      fill: "#1c0820",
      fontFamily: '"Open Sans", "sans-serif"',
      backgroundColor: '#ffffff'
    });
    
    this.quitButton.setInteractive();

    this.quitButton.on("pointerup", () => {
      this.sys.game.destroy(true);
      let gameDiv = document.getElementById("game");
      gameDiv.style.width = "0%";
      gameDiv.style.height = "0%";
      gameDiv.style.visibility = "hidden";
    });

    this.quitButton.on("pointerover", () => {
      this.quitButton.setBackgroundColor("#3c3468");
    });

    this.quitButton.on("pointerout", () => {
      this.quitButton.setBackgroundColor("#ffffff");
    });
  }

  update(time, delta) {
    // usa el update de Fish, con los cursores.
    this.fish.update(this.cursors, time, delta);
  }
}

export default PlayScene;
