var fishImg, fish;
var sea, seaImg;
var shark, sharkImg, sharkGroup;
var gameState = "play"
var score = 0;
var gameOver, gameOverImg;

function preload()
  {
    fishImg = loadImage("fish.png");
    seaImg = loadImage("sea.png");
    sharkImg = loadImage("shark.png");
  }

function setup() 
  {
    createCanvas(600, 600);

    sea = createSprite(300,360);
    sea.addImage("sea",seaImg);
    sea.scale = 2;
    
    fish = createSprite(50,200,50,50);
    fish.addImage("fish",fishImg);
    fish.scale = 0.1;

    sharkGroup = new Group();

  }

function draw() 
{   
    background(0);

    stroke("white");
    fill("white");
    textSize(15);
    text("Score: " + score, 100,25)

  if(gameState === "play")
    {
      sea.velocityX = -4;
      score++;

      if(sea.x < 100)
    {
      sea.x = width/2;
    }


  if(keyDown("UP_ARROW"))
    {
      fish.y -= 5;
    }

  if(keyDown("DOWN_ARROW"))
    {
      fish.y += 5;
    }

  if(sharkGroup.isTouching(fish))
    {
      sea.velocityX = 0;
      sharkGroup.setVelocityXEach = 0;
      gameState = "end";
    }

  if (fish.y > 550)
  {
    fish.y = 550;
  }

  if (fish.y < 50)
  {
    fish.y = 50;
  }
      
      spawnSharks();
      

      drawSprites();  
    }

  if(gameState === "end")
  {
    stroke("white");
    fill("white");
    textSize(25);
    text("GAME OVER! Press Spacebar to Restart", 50,300);

    if(keyDown("SPACE"))
    {      
        reset();
    }
  }
} 

function spawnSharks() 
{
  //code to spawn the sharks in the sea
  if(frameCount % 120 === 0)
  {
    shark = createSprite(650,50);
    shark.addImage("shark",sharkImg);
    shark.scale = 0.3;
    shark.y = Math.round(random(100,500));
    shark.velocityX = -4; 
    
    //assign lifetime to the variable
    shark.lifetime = 750;

    sharkGroup.add(shark);
  }
}

function reset()
{
    gameState = "play"; 
    sharkGroup.destroyEach();
 
    score = 0;
    
}

