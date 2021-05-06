//Create variables here

var database ,h,h1,h2
var position
var feed,add
var foodobject
var Feedtime
var Lastfeed
var back_img;

function preload()
{

  himg1 = loadImage("images/hImg.png")
  himg2 = loadImage("images/hImg1.png")
  back_img = loadImage("images/house1.jpg");
}

function setup() {
	createCanvas(1600, 500);
  
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  h = createSprite(550,250,10,10);
  h.addImage(himg1);
  h.scale=0.3;
  
 

  var pop = database.ref('Food');
  pop.on("value", readPosition);
feed = createButton("FEED POP ");
feed.position(600,15)
feed.mousePressed(FeedPop);
add = createButton("ADD FOOD");
add.position(400,15);
add.mousePressed(AddFood);

} 



function draw(){
  background(180, 249, 165);{


 foodobject.display()
 
 }
 drawSprites();
  
  fill(255,255,254);
 textSize(15);

  // text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
 
  //add styles here
drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);
  
}



function writePosition(pop){
  if(pop>0){
    pop=pop-1
  }
  else{
    pop=0
  }
  database.ref('/').set({
    'Food': pop
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedPop(){

h.addImage(himg2);
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
