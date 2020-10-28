var dog, normalDog, happyDog, database, foodS;
var feedButton, addButton;
var fedTime, lastFed;
var foodObj;

function preload()
{
  normalDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(normalDog);
  dog.scale = 0.2;

  foodObj = new Food(foodS, lastFed);


  database.ref("Food").on("value", readStock);

  feedButton = createButton("Feed pet");
  feedButton.position(100,100);

  addButton = createButton("Add food");
  addButton.position(300,100);


}


function draw() {  
  background(46, 139, 87)

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })


  foodObj.display();



  feedButton.mousePressed(function(){
    if(foodS!=0){
      dog.addImage(happyDog);
      foodS--;
  
      database.ref("/").update({
        Food: foodS,
        FeedTime: hour()
      });  
    }
    
  });
  
  addButton.mousePressed(function(){
    foodS++;
  database.ref('/').update({
    Food: foodS 
  });
  });


  drawSprites();
  //add styles here
  stroke("black");
  fill("white");
  textSize(15);
  text("Note: Press the up arrow key to feed your dog!", 20,20);
  text("Food Remaining: "+foodS, 100,150);
}

function readStock(data){
  foodS = data.val();
}
