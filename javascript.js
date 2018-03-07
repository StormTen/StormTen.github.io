
var randNum = Math.round(Math.random() * 99) + 1;
console.log(randNum);
console.log("For a treat type one of these commands in,case sensitive: Global Thermonuclear War, List Games, Joshua ");
var counter = 0;

function sendData(form) {
     var guessNum = form.inputbox.value;
  

  if (guessNum == randNum) {
    document.getElementById("label").innerHTML = "You are correct!!!!!!!!!!!!!!!!!" +"<br>You took " + counter + " total guesses. ";
    document.getElementById("tahdah").play();
    document.body.style.backgroundImage = 'url(imgs/topgun.gif)';
    document.getElementById("info").style.backgroundColor = "#6AE2D4";

    
     
  }else if(guessNum < randNum){
    document.getElementById("label").innerHTML = "Incorrect. <br> You are low, guess higher.";
     counter++;
    document.getElementById("error").play();
    document.body.removeAttribute("style");
    document.body.style.backgroundColor = "#393D3F";
  }else if (guessNum > randNum){
       document.getElementById("label").innerHTML = "You are incorrect sorry. <br> You are high, guess lower.";
    document.getElementById("error").play();
    document.body.removeAttribute("style");
    document.body.style.backgroundColor = "#393D3F";
     counter++;
  }else if(guessNum == "Joshua"){
    document.getElementById("label").innerHTML = "GREETING PROFESSER FALKEN, HOW ABOUT A NICE GAME OF CHESS?";
    document.body.style.backgroundImage = 'url(imgs/tictactoe.gif)';
    document.getElementById("greetings").play();
    
  }else if(guessNum == "List Games"){
    document.getElementById("label").innerHTML = "<ol><li>FALKEN'S MAZE</li><li>BLACK JACK</li><li>GIN RUMMY</li><li>HEARTS</li><li>BRIDGE</li><li>CHECKERS</li><li>CHESS</li><li>POKER</li><li>FIGHTER COMBAT</li><li>GUERRILLA ENGAGEMENT</li><li>DESERT WARFARE</li><li>AIR-TO-GROUND ACTIONS</li><li>THEATERWIDE TACTICAL WARFARE</li><li>THEATERWIDE BIOTOXIC AND CHEMICAL WARFARE</li><li>GLOBAL THERMONUCLEAR WAR</li></ul>";
    document.body.style.backgroundImage = 'url(imgs/games.gif)';
    document.getElementById("games").play();

  
    
  }else if(guessNum == "Global Thermonuclear War"){
    document.getElementById("label").innerHTML = "A STRANGE GAME. <br>THE ONLY WINNING MOVE IS NOT TO PLAY.  ";
    document.body.style.backgroundImage = 'url(imgs/gtnw.gif)';
    document.getElementById("gtnw").play();
  
    
  }else{
    document.body.style.backgroundImage = 'url(imgs/stitch.gif)';
    document.getElementById("label").innerHTML = "Invalid Input, please try again.";
     counter++;
    document.getElementById("wahwahwah").play();
    document.getElementById("info").style.backgroundColor = "#6AE2D4";
  
  
  }
     
   
   
  form.inputbox.value = "";
}


