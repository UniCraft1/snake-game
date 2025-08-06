const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};

let startTime = Date.now();

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, 400, 400);

  // Rita väggarna (ramen)
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 400, 400);

  // Rita ormen
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Rita maten
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Rita tiden
  let seconds = Math.floor((Date.now() - startTime) / 1000);
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Tid: " + seconds + "s", 10, 20);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  if (
    headX < 0 || headX >= 400 || headY < 0 || headY >= 400 ||
    snake.some(s => s.x === headX && s.y === headY)
  ) {
    clearInterval(game);
    alert("Game Over! Du spelade i " + seconds + " sekunder.");
    return;
  }

  snake.unshift({ x: headX, y: headY });

  if (headX === food.x && headY === food.y) {
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }
}

let game = setInterval(draw, 100);
