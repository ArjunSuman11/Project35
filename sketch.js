//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogSprite;

function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  dog.scale= 0.4;
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 800);
  dogSprite=createSprite(400, 400, 10, 10);
  dogSprite.addImage(dog);

  database=firebase.database();

  foodStock=database.ref("Food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }
  drawSprites();
  
  //add styles here

}
function readStock(data){
foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    Food : x
  });
}



