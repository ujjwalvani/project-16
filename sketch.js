
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,bananaGroup
var score = 0;
var ground,invisible
var survivalTime = 0;
var GameState;
var PLAY,END
var end


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
 
 
  //end = loadAnimation("sprite_0.png")
}



function setup() {
  createCanvas(500,500);
  
  PLAY = 1;
  END = 0;
  GameState = PLAY;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
  //Create a sprite for the Monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  // //CORRECTION : NOT NEEDED
  // ground = createSprite(400,350,900,10);
  // ground.velocityX = -4;
  // ground.x=ground.width/2;
  // console.log(ground.x)
  //ground.debug = true;
  
  
  invisible = createSprite(250,407,1000,10)
  //correction: not ground
  // invisible.x = ground.width/2;
    invisible.x = invisible.width/2;
  
  
}


function draw() {
background("White");
  
  if (GameState === PLAY){
    // //only one ground needed: correction
    // if(ground.x < 0){
    //   ground.x = ground.width/ 2;
    // }
    
    if(invisible.x <0) {
      invisible.x = invisible.width/2;
    }
    
    invisible.velocityX = -5;
    //CORRECTION:
    // if (keyDown("space")&& monkey.isTouching(ground)){
      // monkey.velocity = -20
    if (keyDown("space")&& monkey.y > 200){
      monkey.velocityY = -10
    }
    //gravity
  // monkey_velocityY = monkey.velocityY = 0.9;
  //correction: + sign . INSTEAD OF _ SIGN 
  monkey.velocityY = monkey.velocityY + 0.9;
        
    score = Math.round(frameCount /3);
   // survivalTime = Math.cell(frameCount / frameRate());
    invisible.velocityX = -(5 + 2 + score / 100);
    
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
    }
    
    
    
     food();
    Obstacle()
  
  if(monkey.isTouching(obstacleGroup)){
    GameState = END;
  }

}
  else if (GameState === END){
    // ground.velocityX = 0;
    invisible.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    //monkey.changeAnimation("monkey_runing",end);
    
  }
  
  // //gravity INSIDE PLAY STATE
  // // monkey_velocityY = monkey.velocityY = 0.9;
  // //correction: + sign
  // monkey_velocityY = monkey.velocityY + 0.9;
  monkey.collide(invisible);
  // monkey.collide(ground);
  
  stroke("black");
  textSize(20);
  fill("red");
  text("score" +score,400,50);
  
  stroke("black");
  textSize(20)
  fill("black")
  text("survival Time" + survivalTime,100,50);
  
  
  
  drawSprites();
}

function food(){
  //CORRECTION: IF CONDITION ADDED
  if(frameCount % 80 === 0){
  //banana = Math.round(frameCount /80);
  var banana = createSprite(500,10,10,20);
  banana.addImage("banana",bananaImage)
  banana.velocityX = -(5+ 2 + score/100);
  banana.y = Math.round(random(120,200));
  banana.scale = 0.1;
  foodGroup.add(banana);
   foodGroup.setLifetimeEach(100);
  banana.setCollider("rectangle",0,0,400,400);
  }
}

function Obstacle(){
  
  if(frameCount % 300 === 0){
    var obstacle = createSprite(500,365,23,32);
    obstacle.velocityX = -(5 + 2 + score/100);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,200);
    
  }
  
}


