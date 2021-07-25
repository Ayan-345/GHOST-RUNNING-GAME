var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

spookySound.loop

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200)
  ghost.scale = 0.3
  ghost.addImage("ghost",ghostImg)

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

}

function draw() {
  background(200);
 
if (gameState == 'play') {
   spawnDoors()
   
   if(tower.y > 400){
      tower.y = 300
    }

   if (keyDown("left_arrow")) {
   ghost.x = ghost.x - 3
 }

if (keyDown("right_arrow")) {
  ghost.x = ghost.x + 3
}

if (keyDown("space")) {
  ghost.velocityY = -0.008

  
}
if (climbersGroup.isTouching(ghost) || ghost.y > 600 ) {
    ghost.destroy()
   gameState = 'end'
} 
ghost.collide(climbersGroup)

 
 drawSprites()

} 
if (gameState == 'end') {
  textSize(30)
  fill("yellow")
  text("GAME OVER",230,250)
}

   
    
}

function spawnDoors() {
  if (frameCount % 240 == 0) {
    door = createSprite(200,-50)
    door.addImage(doorImg)
    door.x = Math.round(random(120,400))
    door.velocityY = 1
    door.lifeTime = 800
    doorsGroup.add(door)
    climber = createSprite(200,10)
    climber.addImage(climberImg)
    climber.x = door.x
    climber.velocityY = 1
    climber.lifeTime = 800
    climbersGroup.add(climber)
    ghost.depth = door.depth
    ghost.depth+=1
    invisibleBlock = createSprite(200,50)
    invisibleBlock.width = climbersGroup.width
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1
    invisibleBlock.debug = false
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.visible = false
  }
}





