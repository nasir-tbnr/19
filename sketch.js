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
  doorsGroup= new Group ();
  climberGroup= new Group ();
  invisibleBlockGroup= new Group ();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 5;

  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.5



}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors()
    if(keyDown("w"))
    {
      ghost.velocityY=-5
    }
    if(keyDown("a"))
    {
      ghost.x-=3
    }
    if(keyDown("d"))
    {
      ghost.x+=3
    }
    ghost.velocityY+=0.8
    if (climberGroup.isTouching(ghost)){
   ghost.velocityY=0
    }
    if (invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      ghost.destroy();
    }

    drawSprites()
}
function spawnDoors()
{
if (frameCount % 240 === 0)
{
door=createSprite(200,-50)
door.addImage(doorImg)
door.x = Math.round(random(120,400));
door.velocityY=5
door.lifeTime=800
doorsGroup.add (door)
climber=createSprite(200,0)
climber.x=door.x
climber.velocityY=5
climber.addImage(climberImg)
climber.lifetime=800
climberGroup.add(climber)
ghost.depth=door.depth+1
invisibleBlock=createSprite(200,15)
invisibleBlock.width=climber.width
invisibleBlock.height=2
invisibleBlock.x=door.x
invisibleBlock.velocityY=5
invisibleBlockGroup.add (invisibleBlock)
ghost.setCollider("circle" ,0,0,120)
}

}