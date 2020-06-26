class LoaderScene extends Phaser.Scene {
  constructor() {
    super("LoaderScene");
    this.propiedad = "propiedad";
  }

  init() {
   // console.log("soy init");
  }

  preload() {
   // console.log("soy Loader");
    // precarga imagenes
    this.load.image("fish", "./assets/fish.png");
    this.load.image("pet", "./assets/pet.png");

    // evento cuando completa la carga (o se puede usar en el método create)
    this.load.on("complete", () => {
      this.scene.start("PlayScene");
    });
  }
}

export default LoaderScene;
