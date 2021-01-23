//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogSprite;
var feedPet, addFood;
var fedTime, lastFed;
var input;
var foodObj;//for Food class
var greetingdog;


function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  dog.scale= 0.4;
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1600, 800);
  dogSprite=createSprite(800, 400, 10, 10);
  dogSprite.addImage(dog);

  database=firebase.database();

  foodStock=database.ref("Food");
  foodStock.on("value", readStock);

  feedPet=createButton("Feed the Dog");
  feedPet.position(1100, 105);
  feedPet.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(900, 105);
  addFood.mousePressed(foodStock);

  input = createInput("Name",800, 100);
  this.input.position(displayWidth/2-40, displayHeight/2- 90);

}


function draw() {  
  background(46, 139, 87);

  drawSprites();
  
  //add styles here

}
//To show the last fed time in the correct format
fill(255, 255, 254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : " + lastFed%12 + "PM", 350, 30);
}else if(lastFed==0){
    text("Last Feed : 12 AM", 350, 30);
}else{
  text("Last Feed : " + lastFed + "AM", 350, 30);
}


function readStock(data){
foodS=data.val();
}

fedTime=database.ref("FeedTime");
fedTime.on("value", function(data){
  lastFed=data.val();
});

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    Food : x
  });
  Food.display();
}

function feedDog(){
  dogSprite.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}


function Addfood(){
  foodS++;
  database.ref("/").update({
    Food : foodS
  })
}
