// NO ROMPER PIEZA 1: el juego siempre debe iniciar con pasto + tienda + hoyo + personaje.

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Grid setup
const TILE = 32;
const COLS = Math.floor(canvas.width / TILE);
const ROWS = Math.floor(canvas.height / TILE);

// World data
const groundLevel = ROWS - 4; // 4 tiles high ground
const holeCol = Math.floor(COLS / 2);
let holeDepth = 1;

// Player
const player = {
  x: (holeCol - 1) * TILE,
  y: groundLevel * TILE - 28,
  w: 24,
  h: 32,
  speed: 3.2,
  vx: 0,
};

// Input
const keys = { left: false, right: false, dig: false };

// Sprites (simple shapes)
function drawTent(x, y) {
  ctx.fillStyle = "#d98c4b";
  ctx.fillRect(x, y - TILE, TILE * 2, TILE);
  ctx.fillStyle = "#b85c2c";
  ctx.beginPath();
  ctx.moveTo(x, y - TILE);
  ctx.lineTo(x + TILE, y - TILE * 1.6);
  ctx.lineTo(x + TILE * 2, y - TILE);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#2b1a0d";
  ctx.fillRect(x + TILE - 6, y - TILE, 12, TILE);
}

function drawCharacter() {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.fillStyle = "#f2e3cf"; // head
  ctx.fillRect(4, 0, 16, 12);
  ctx.fillStyle = "#e0cbb0"; // face
  ctx.fillRect(4, 6, 16, 8);
  ctx.fillStyle = "#b6252e"; // torso
  ctx.fillRect(2, 14, 20, 12);
  ctx.fillStyle = "#a21f28"; // pants
  ctx.fillRect(4, 26, 16, 8);
  ctx.fillStyle = "#d8c5a3"; // shoes
  ctx.fillRect(2, 34, 8, 6);
  ctx.fillRect(14, 34, 8, 6);
  ctx.restore();
}

// Tile helpers
function isHole(xTile, yTile) {
  return xTile === holeCol && yTile >= groundLevel && yTile < groundLevel + holeDepth;
}

function dig() {
  const playerCol = Math.floor((player.x + player.w / 2) / TILE);
  if (Math.abs(playerCol - holeCol) <= 0.5) {
    holeDepth += 1;
    if (holeDepth > ROWS - groundLevel - 1) {
      holeDepth = ROWS - groundLevel - 1;
    }
  }
}

function update() {
  player.vx = 0;
  if (keys.left) player.vx -= player.speed;
  if (keys.right) player.vx += player.speed;
  player.x += player.vx;
  const minX = TILE * 2;
  const maxX = (COLS - 3) * TILE;
  player.x = Math.max(minX, Math.min(maxX, player.x));
}

function drawBackground() {
  ctx.fillStyle = "#8bc6ff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGround() {
  for (let y = groundLevel; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (isHole(x, y)) {
        ctx.fillStyle = "#1c1a20";
      } else {
        ctx.fillStyle = y === groundLevel ? "#62c25f" : "#8b5a2b";
      }
      ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
      if (!isHole(x, y) && y > groundLevel) {
        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fillRect(x * TILE, y * TILE + TILE - 6, TILE, 6);
      }
    }
  }
}

function drawHoleDepthWalls() {
  // simple darker walls
  ctx.fillStyle = "#2b232b";
  const x = holeCol * TILE;
  ctx.fillRect(x - 6, groundLevel * TILE, 6, holeDepth * TILE);
  ctx.fillRect(x + TILE, groundLevel * TILE, 6, holeDepth * TILE);
}

function draw() {
  drawBackground();
  drawGround();
  drawHoleDepthWalls();
  // tent
  drawTent(TILE * 3, groundLevel * TILE);
  // character
  drawCharacter();
  // hole top outline
  ctx.fillStyle = "#0f0f15";
  ctx.fillRect(holeCol * TILE, groundLevel * TILE - 4, TILE, 8);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Input handling
window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = true;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = true;
  if (e.code === "Space" || e.code === "KeyE") {
    if (!keys.dig) dig();
    keys.dig = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = false;
  if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = false;
  if (e.code === "Space" || e.code === "KeyE") keys.dig = false;
});

loop();
