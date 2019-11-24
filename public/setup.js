const BULLET_SPEED = 10;
let player, game, width, height, xEdge, rocket, asteroid1, asteroid2, asteroid3, asteroidAssets, asteroids, space, border;
let enemies = [];
let bullets = [];
let ammunition, ammoAsset, explosionSystem; 

function preload() {
  heart = loadImage('assets/heart.svg')
  space = loadImage('assets/background.jpg');
  rocket = loadImage('assets/rocket.svg');
  asteroid1 = loadImage('assets/asteroid1.svg');
  asteroid2 = loadImage('assets/asteroid2.svg');
  asteroid3 = loadImage('assets/asteroid3.svg');
  asteroidAssets = [asteroid1, asteroid2, asteroid3]
  ammoAsset = loadImage('assets/bullets.svg');
}

function restart() {
    border = new Border()
    player = new Player(100, height/2)
    ammunition = new AmmunitionPackages()
    hearts = new Hearts()
    explosionSystem = new ExplosionSystem()
    asteroids = []
    for(let i = 0; i<500;i++){
      asteroids.push(createInitAsteroid());
    }
    bullets = []
    if (gameOver) {
      gameOver = false
      toggleMenu()
    }
}

function setup() {
    width = windowWidth
    height = windowHeight
    boardSizeX = width*3;
    boardSizeY = height*3;
    xEdge = width / 3
    createCanvas(width, height);
    restart()
}

function distSquare(x1,y1,x2,y2) {
    return (x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)
  }

function playerHitsAsteroid(asteroid, player) {
  return playerHitsCircularTarget(asteroid, player)
}

function playerHitsCollectible(ammo, player) {
  return playerHitsCircularTarget(ammo, player)
}

function playerHitsCircularTarget(target, player) {
    let distance = distSquare(target.pos.x, target.pos.y, player.pos.x, player.pos.y)
    let radiusSum = target.size/2 + player.size/2
    if (player.life <= 0) {
      return false
    }
    return distance <= radiusSum*radiusSum 
}
  
  const SPACE_KEYCODE = 32
  const S_KEYCODE = 83;
  const W_KEYCODE = 87;
  const A_KEYCODE = 65;
  const D_KEYCODE = 68;
  const P_KEYCODE = 80;
  const T_KEYCODE = 84;