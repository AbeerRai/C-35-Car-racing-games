var hypnoticBall, database;
var position;
var hypnoticBallPosition;

function setup(){

    database = firebase.database();
    createCanvas(500,500);
    
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";

     //reference to the DB
    var hypnoticBallPosition = database.ref('ball/position');
    // Virtual Listener sitting in the DB 
    hypnoticBallPosition.on("value", readPosition, showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set(
        {
      'x': position.x + x ,
      'y': position.y + y
    })
  }


function readPosition(data){

 position = data.val();

 hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;

}

function showError(){
    console.log("Error in writing to the database");
  }