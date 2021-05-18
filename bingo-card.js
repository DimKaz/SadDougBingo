window.onload = initAll;
var boardSelect = new Array (25);
var usedNums = new Array(1000);
var csvData = new Array(
"Mentions dash cam to another person",
"Multiple lane merge",
"Red circle drawn",
"Running red light",
"Slowly rear ends",
"Mustang",
"Brake check",
"Continually blocking driver",
"Reading license plate",
"Camera makes noise",
"Voice-activated dash cam",
"Tire blow out",
"Thing falls out of trailer",
"Hydro plane",
"Icy conditions",
"Chasing another driver",
"Police",
"Low quality camera",
"Super high tech camera interface",
"High quality Camera (high res / fps)",
"U turn crash",
"Doesnt match description",
"Crash isn't obvious",
"Camper incidents",
"Passenger screaming",
"Bicyclist involved",
"Left turn on red",
"False start (Starts driving too early)",
"Talking on phone",
"Loud music / radio",
"Crashes into building",
"Bus involved",
"Deserted road (The only car on the road)",
"Box car",
"El Camino",
"Sheet Metal on roof",
"Aggressive overtaking",
"Parking lot Crash",
"Head-on Collision",
"Swerving Randomly",
"Elderly Driver",
"Driver runs off",
"Multi camera view",
"Car gets absolutely destroyed",
"Three car combo (1 car hits multiple)",
"Doughnuts / burnouts",
"Cars kissing (Front to Front / Back to back)",
"Junk on roof",
"Obscene gesture",
"Reverses into another car",
"Wrong way driver",
"Debris in road",
"Roundabot",
"Trying to beat the light",
"Near miss",
"Rogue tire",
"Flying car",
"Car squeezes in",
"Fire");

var unselected = "lightgrey";
var selected = "green";
var bingo = false;
var col = new Array(5);
var row = new Array(5);

//function rainbowColors(){
//    for(var i = 0; i < 25; i++){
//        if( boardSelect[i]){
//            document.getElementById("square" + (i)).style.backgroundColor = rgb(Math.random()*255, Math.random()*255, Math.random()*255);
//        }
//    }
//}

function initAll() {
  if (document.getElementById) {
    document.getElementById("reload").onclick = anotherCard;
    
    for(var i=0 ; i<25 ; i++){
        if(i != 12){
            setOnClick(document.getElementById("square" + i));
            document.getElementById("square" + i).setAttribute("board_id", i);
            boardSelect[i] = false;
        } else if(i == 12){
            boardSelect[12] = true;
            document.getElementById("square" + 12).style.backgroundColor = selected;
            document.getElementById("square" + 12).setAttribute("board_id", 12);
        }
    }
    newCard();
  }
  else{
    alert("Your browser does not support this script.");
  }
}

function newCard() {
    
    for(var i=0 ; i<25 ; i++){
        if(i != 12){
            setSquare(i);
            boardSelect[i] = false;
        } else if(i == 12){
            boardSelect[12] = true;
        }
    }
    for (var i = 1; i < usedNums.length; i++) {
        usedNums[i] = false;
    };

}

function setSquare(thisSquare){
    var currentSquare = "square" + thisSquare;
    var colPlace = new Array(0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4);
    var newNum = 0;
    
    do{
        newNum = getNewNum();
    }while(usedNums[newNum]);
    
    usedNums[newNum] = true;
    var element = document.getElementById(currentSquare)
    element.innerHTML = csvData[newNum];
    element.style.backgroundColor = unselected;

};

function setOnClick(element){
    element.addEventListener(
        "click",
        function(e){
            var elem = e.target;
            var idNumber = elem.getAttribute("board_id");
            
            //Selecting unselceted
            if(boardSelect[idNumber] == false){
                elem.style.backgroundColor = selected;
                boardSelect[idNumber] = true;
                
            }
            //Deselect
            else if(boardSelect[idNumber] == true){
                elem.style.backgroundColor = unselected;
                boardSelect[idNumber] = false;
                    
            }
            
            for(var k = 0; k<5; k++){
                col[k] = 0;
                row[k] = 0;
            }
            for(var i = 0; i < 25; i++){
                if( boardSelect[i]){
                    document.getElementById("square" + (i)).style.backgroundColor = selected;
                    col[i%5]++;
                    if(i >= 0 && i < 5){
                        row[0]++;
                    }
                    if(i >= 5 && i < 10){ 
                        row[1]++;
                    }
                    if(i >= 10 && i < 15){
                        row[2]++;
                    }
                    if(i >= 15 && i < 20){
                        row[3]++;
                    }
                    if(i >= 20 && i < 25){
                        row[4]++;
                    }
                }
                else{
                    document.getElementById("square" + (i)).style.backgroundColor = unselected;
                }
            }
            for(var j = 0; j<5; j++){
                if(col[j] >=5){
                    bingo = true;
                    document.getElementById("square" + (j)).style.backgroundColor = "red";
                    document.getElementById("square" + (j+5)).style.backgroundColor = "red";
                    document.getElementById("square" + (j+10)).style.backgroundColor = "red";
                    document.getElementById("square" + (j+15)).style.backgroundColor = "red";
                    document.getElementById("square" + (j+20)).style.backgroundColor = "red";
                }
                if(row[j] >=5){
                    bingo = true;
                    document.getElementById("square" + (j*5)).style.backgroundColor = "red";
                    document.getElementById("square" + (j*5+1)).style.backgroundColor = "red";
                    document.getElementById("square" + (j*5+2)).style.backgroundColor = "red";
                    document.getElementById("square" + (j*5+3)).style.backgroundColor = "red";
                    document.getElementById("square" + (j*5+4)).style.backgroundColor = "red";
                }
            }
            if(boardSelect[0] && boardSelect[6] && boardSelect[12] && boardSelect[18] && boardSelect[24]){
                bingo = true;
                document.getElementById("square" + 0).style.backgroundColor = "red";
                document.getElementById("square" + 6).style.backgroundColor = "red";
                document.getElementById("square" + 12).style.backgroundColor = "red";
                document.getElementById("square" + 18).style.backgroundColor = "red";
                document.getElementById("square" + 24).style.backgroundColor = "red";
            }
            if(boardSelect[4] && boardSelect[8] && boardSelect[12] && boardSelect[16] && boardSelect[20]){
                bingo = true;
                document.getElementById("square" + 4).style.backgroundColor = "red";
                document.getElementById("square" + 8).style.backgroundColor = "red";
                document.getElementById("square" + 12).style.backgroundColor = "red";
                document.getElementById("square" + 16).style.backgroundColor = "red";
                document.getElementById("square" + 20).style.backgroundColor = "red";
            }
        },
        false);
}

function getNewNum() {
    return Math.floor(Math.random() * csvData.length);
}

function anotherCard() {
    newCard();
    return false;
}
