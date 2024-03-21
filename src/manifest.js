// a melonJS data manifest
const DataManifest = [
  /* Bitmap Text */
  {
    name: "PressStart2P",
    type: "image",
    src: "./data/fnt/PressStart2P.png",
  },
  {
    name: "PressStart2P",
    type: "binary",
    src: "./data/fnt/PressStart2P.fnt",
  },

  // sprites
  { name: "player", type: "image", src: "data/img/grey_button01.png" },
  { name: "ball", type: "image", src: "data/img/grey_circle.png" },
  { name: "border", type: "image", src: "data/img/grey_button01.png" },
  { name: "ships", type: "image", src: "data/img/ships.png" },
  { name: "title_background", type: "image", src: "data/img/pxfuel.jpg" },
  { name: "game_bg", type: "image", src: "data/img/game_bg.png" },
  { name: "win", type: "image", src: "data/img/win.jpg" },
  { name: "game_music", type: "audio", src: "./data/bgm/", channel: 1 },
  { name: "menu_music", type: "audio", src: "./data/bgm/", channel: 1 },
  { name: "win_music", type: "audio", src: "./data/bgm/", channel: 1 },
  { name: "game_over", type: "audio", src: "./data/sfx/", channel: 2 },
  {
    name: "explosion",
    type: "audio",
    src: "./data/sfx/",
    channel: 2,
  },
];

export default DataManifest;
