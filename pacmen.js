var pos = 0;
const pacArray = [
  ["PacMan1.png", "PacMan2.png"],
  ["PacMan3.png", "PacMan4.png"],
];

// var direction = 0;
// var focus = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  let direction = parseInt(Math.random()*2); //direction image is facing
  let focus = parseInt(Math.random()*2); //mouth open or closed
  if(direction === 1){
    velocity.x = -velocity.x;
  }
  
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = pacArray[direction][focus];
  newimg.width = 100;
  //
  newimg.style.left = position.x + "px";
  newimg.style.top = position.y + "px";
  //

  // add new Child image to game
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
    direction,
    focus
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.focus = (item.focus + 1) % 2;
    item.newimg.src = pacArray[item.direction][item.focus];


    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  //
  if (
    item.position.x + item.velocity.x + item.newimg.width >=
      window.innerWidth ||
    item.position.x + item.velocity.x <= 0
  ) {
    item.velocity.x = -item.velocity.x;
    item.direction = (item.direction + 1) % 2;
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height >=
      window.innerHeight ||
    item.position.y + item.velocity.y <= 0
  ) {
    item.velocity.y = -item.velocity.y;
  }
  //
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
