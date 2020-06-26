"use strict";

import LoaderScene from "./scenes/loaderScene.js";
import PlayScene from "./scenes/playScene.js";

const config = {
  title: "fishPhaser",
  type: Phaser.AUTO,
  width: 256,
  height: 128,
  //backgroundColor: "#d0f4f8",
  transparent: true,
  parent: "game",
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    min: {
      width: 256,
      height: 128
    },
    max: {
      width: 1280,
      height: 720,
    }
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false //
    }
  },
  scene: [LoaderScene, PlayScene]
};

//const game = new Phaser.Game(config);

window.onload = () => {
  document.getElementById("fishBtn").addEventListener("click", () => {
    let gameDiv = document.getElementById("game");
    gameDiv.style.width = "100%";
    gameDiv.style.height = "100%";
    gameDiv.style.visibility = "visible";
    new Phaser.Game(config);
  });
};
