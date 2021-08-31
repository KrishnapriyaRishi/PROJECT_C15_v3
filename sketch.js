var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

var gameState = "PLAY";

function preload() {
  pathImg = loadImage("Road.png");

  boyImg = loadAnimation("runner1.png", "runner2.png");

  cashImg = loadImage("cash.png");

  diamondsImg = loadImage("diamonds.png");

  jwelleryImg = loadImage("jwell.png");

  swordImg = loadImage("sword.png");

  endImg = loadAnimation("gameOver.png");
}

function setup() {
  createCanvas(400, 400);
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);

  //creating boy running
  boy = createSprite(70, 330, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.addAnimation("Game Over", endImg);
  boy.scale = 0.08;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() {
  background(0);

  if (gameState === "PLAY") {
    path.velocityY = 4;
    boy.x = World.mouseX;

    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > 400) {
      path.y = height / 2;
    }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
    } else {
      if (swordGroup.isTouching(boy)) {
        gameState = "END";
        boy.changeAnimation("Game Over", endImg);
        boy.scale = 1;
        boy.x = 200;
        boy.y = 300;
        path.velocityY = 0;
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        cashG.setVelocityYEach(0);
      }
    }

    //if(sword.isTouching(boy)){

    // cashG.setVelocity=0;
    ///diamondsG.setVelocity=0;
    /// jwelleryG.setVelocity=0;
    //swordG.setVelocity=0;

    // path.setVelocity=0;
    //}
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);
}
function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);

    cash.setCollider("circle", 0, 0, 10);
    // cash.debug=true
  }
}

function createDiamonds() {
  if (World.frameCount % 100 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
    diamonds.setCollider("circle", 0, 0, 10);
    //diamond.setCollider("rectangle",0,0,160,80);

    //diamonds.debug=true
  }
}

function createJwellery() {
  if (World.frameCount % 180 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);

    jwellery.setCollider("circle", 0, 0, 10);
    //jwellery.debug=true
  }
}

function createSword() {
  if (World.frameCount % 250 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);

    sword.setCollider("circle", 0, 0, 10);
    //sword.debug=true
  }
}
