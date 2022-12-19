var zero = Puck.mag();
var before = zero;
var movementBefore = "";
var movement = "";

var TRESHHOLD = 0.32;
var counter = 0;
var lastCompletedTime = 0;

var pin = [3, 4, 2];
var pinCorrect = false;

var lastPin = [];

setInterval(function() {
  timeSinceTap = new Date() - lastCompletedTime;
  // console.log(timeSinceTap);
  if (timeSinceTap >= 2000) {
    //console.log("RESET");
    if (counter > 0) {
      lastPin.push(counter);
    }
    counter = 0;
    if (lastPin.length > 3) {
      lastPin = lastPin.slice(lastPin.length - 3, lastPin.length);
    }

    console.log("pin: " + lastPin);
    console.log("status: " + pinCorrect);

    if (pin[0] === lastPin[0] && pin[1] === lastPin[1] && pin[2] === lastPin[2])   {
    //console.log("PIN WAS RIGHT - UNLOCK THE DOOR");
      pinCorrect = true;
    } else {
      pinCorrect = false;
    }
  }
  var p = Puck.mag();
  p.x -= zero.x;
  p.y -= zero.y;
  p.z -= zero.z;
  var s = Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z);
  if (s > before + before * TRESHHOLD) {
    movement = "up";
  } else if (s < before - before * TRESHHOLD) {
    movement = "down";
  }

  if (movementBefore === "up" && movement === "down") {
    console.log("INPUT COMPLETED");
    counter +=1;
    console.log(counter);
    lastCompletedTime = new Date();
    // console.log(lastCompletedTime);
  }

  before = s;
  movementBefore = movement;

  // console.log(s);
}, 100);
