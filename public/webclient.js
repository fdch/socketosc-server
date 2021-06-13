const MAXUSERS = 1002;
const userAgent = window.navigator.userAgent;
const MAXCHATS = 10;
var deviceIsAndroid;
var canvas, socket, status, initialized=false;
var userData = new Array(MAXUSERS), players, slots = new Array(MAXUSERS);
var sintes = new Array(MAXUSERS);
var connectedSintes, s;
sintes.fill(0);
var i, a;
var sx,sy,angle,radius,click;
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var playerTitle = document.getElementById('userid');
var playersTitle = document.getElementById('players');
var statusTitle = document.getElementById('status');
var messages = document.getElementById('messages');
var chatbox = document.getElementById('chatbox');
var chat = document.getElementById('chat');

// using motion or mouse
var usingMotion = false; 
var usingMouse = false; 
var play = false;


// var Motion = {
//   x : 0.5, 
//   y : 0.5,
//   z : 0.5,
//   t : 0.0,
//   m : 0.0,
//   s : 0.0,
//   running : false,
//   device : 'undefined'
// }

// var accelRange = {
//   rawX: 0.0, // raw value as reported by device motion
//   loX: -10.0, // both axes will probably have same ranges, but you never know ..
//   hiX: 10.0,
//   scaleX: 20.0,   // total range of raw motion data (divide by this to get output in normalized range)
//   tempX: 0.0, // clamped raw value to be scaled
  
//   rawY: 0.0,
//   loY: -10.0,
//   hiY: 10.0,
//   scaleY: 20.0,
//   tempY: 0.0,
  
//   rawZ: 0.0,
//   loZ: -10.0,
//   hiZ: 10.0,
//   scaleZ: 20.0,
//   tempZ: 0.0,
  
// }


// const gainNode = new Tone.Gain(0).toDestination();
// const oscil = new Tone.Oscillator().connect(gainNode);
// const signal = new Tone.Signal({
//   value: frequency,
//   units: "frequency"
// }).connect(oscil.frequency);


// self-calibrating device will call this often at first, then only with extreme motion
// function updateAccelRange() {
//   // find full range of raw values
//   accelRange.scaleX = accelRange.hiX - accelRange.loX; 
//   accelRange.scaleY = accelRange.hiY - accelRange.loY;
//   accelRange.scaleZ = accelRange.hiZ - accelRange.loZ;
// }

// if (userAgent.match(/Android/i)) {
//   deviceIsAndroid = true;
// }
// else {
//   deviceIsAndroid = false;
// }

// function motionEvent(e) {
//   // get the raw accelerometer values (invert if Android)
//   if (deviceIsAndroid) {
//     accelRange.rawX = -(e.accelerationIncludingGravity.x);
//     accelRange.rawY = -(e.accelerationIncludingGravity.y);
//     accelRange.rawZ = -(e.accelerationIncludingGravity.z);
//   }
//   else {
//     accelRange.rawX = e.accelerationIncludingGravity.x;
//     accelRange.rawY = e.accelerationIncludingGravity.y;
//     accelRange.rawZ = e.accelerationIncludingGravity.z;
//   }
//   // clamp to default to iOS range (typically -10 to 10)
//   if (accelRange.rawX < accelRange.loX) { 
//     accelRange.tempX = accelRange.loX;
//   }
//   else if (accelRange.rawX > accelRange.hiX) {
//     accelRange.tempX = accelRange.hiX;
//   }
//   else {
//     accelRange.tempX = accelRange.rawX;
//   }

//   if (accelRange.rawY < accelRange.loY) {
//     accelRange.tempY = accelRange.loY;
//   }
//   else if (accelRange.rawY > accelRange.hiY) {
//     accelRange.tempY = accelRange.hiY;
//   }
//   else {
//     accelRange.tempY = accelRange.rawY;
//   }

//   if (accelRange.rawZ < accelRange.loZ) {
//     accelRange.tempZ = accelRange.loZ;
//   }
//   else if (accelRange.rawZ > accelRange.hiZ) {
//     accelRange.tempZ = accelRange.hiZ;
//   }
//   else {
//     accelRange.tempZ = accelRange.rawZ;
//   }

//   // normalize to 0.0 to 1.0
//   Motion.x  = (accelRange.tempX - accelRange.loX) / accelRange.scaleX;
//   Motion.y  = (accelRange.tempY - accelRange.loY) / accelRange.scaleY;
//   Motion.z  = (accelRange.tempZ - accelRange.loZ) / accelRange.scaleZ;
// }

startButton.onclick = function () {
  // if (typeof DeviceMotionEvent.requestPermission === 'function') {
  // // iOS 13+
  // DeviceMotionEvent.requestPermission()
  // .then(response => {
  //   if (response == 'granted') {
  //     Motion.device = 'controller';
  //     window.addEventListener('devicemotion', motionEvent);
  //   }
  // })
  // .catch(console.error)
  // } else {
  //   // non iOS 13+
  //   if ('DeviceMotionEvent' in window) {
  //     Motion.device = 'controller';
  //     window.addEventListener('devicemotion', motionEvent); 
  //   } else {
  //     Motion.device = 'mouse';
  //   }
  // }
  // if ( socket.connected ) {
  //   socket.emit('onoff', 1);
  // }
  // Motion.device = 'mouse';

  // Motion.running = true;
  Tone.start();
  /*

  Inicializar los sintes

  */
  // cuando apreto start, debo inicializar los players
  // prender los intes de todos
  a = userData.filter(function(x) { return x !==0 ; });
  
  for (i of a) {

    let idx = i.oscid;
    console.log(idx);
    sintes[idx] = new Player(i);

    console.log(sintes[idx].oscid);
  };
  /*

  Inicializar los controles

  */

  var c = new Control();

  c.position.on('change',function(v) {
      socket.emit('position', [s, v]);
  });

  c.button.on('change',function(v) {
    socket.emit('trigger', [s, v]);
  });

  c.tilt.on('change',function(v) {
    let x = Nexus.scale(v.x,0,1,0.01,20);
    let y = Nexus.scale(v.y,0,1,80,5000);
    // socket.emit('tilt', [s, v]);
    // p.synth.modulationIndex.rampTo(x, 0.1);
    // p.synth.frequency.rampTo(y, 0.1);
    // console.log(x, y, v.z);
  });

  c.slider.on('change',function(v) {
    let a = userData.filter(function(x) { return x !==0 ; });
      for (let i of a) {
        sintes[i.oscid].synth.volume.rampTo(v, 0.1);
      }
      // socket.emit('slider'+(i+1),v);
  });


  initialized = true;
}

// function initPlayer(i) {

  
  
  // p = sintes[i];
  // p = player;


  // p.dial.on('change',function(v) {
  //     p.osc.volume.rampTo(v, 0.1);
  //     p.synth.volume.rampTo(v, 0.1);
  // });

  // p.toggle.on('change', function(v) {
  //     if(v) {
  //         p.osc.start();
  //     } else {
  //         p.osc.stop();
  //     }
  // });

  //funciones

  // p.fmtype.on('change',function(v) {
  //     if(v) {
  //         p.synth.modulation.type = "sine";
  //     }
  //     else {
  //         p.synth.modulation.type = "square";
  //     }
  // });

  // modcontrol.on('change',function(v) {
  //     synth.modulationIndex.rampTo(v, 0.1);
  //   })


// }

stopButton.onclick = function ()  {
  
  // Motion.running = false;

  if ( socket.connected ) {
    socket.emit('onoff', 0);
  }
  // stops listening for motion

  // if (Motion.device === 'controller') {
  //   window.removeEventListener("devicemotion", motionEvent);
  // }
  // deinitPlayer(0);
  let a = userData.filter(function(x) { return x !==0 ; });
  for (let i of a) {
    console.log(i.oscid);
    sintes[i.oscid].destroyer();
  }
  initialized = false;
  // stoposc1();
  // stoposc2();
}

// function deviceTurned() {
//   if (Motion.t == 0) {
//     Motion.t = 127;
//   } else if (Motion.t == 127) {
//     Motion.t = 0;
//   }
// }
// function deviceShaken() {
//   Motion.s += 1;
//   if (Motion.s > 128) {
//     Motion.s = 0;
//   }
// }
// function deviceMoved() {
//   Motion.m += 1;
//   if (Motion.m > 128) {
//     Motion.m = 0;
//   }
// }

// function hexagon(col,num,i) {
//   i = frameCount * 0.1;
//   translate(width/2,height/2);
//   rotate(i);
//   angle = TWO_PI / num;

//   if (radius < 0) {
//    //reset radius
//    clear();
//    radius = height/2;

//    // radius = 0;
//    // noLoop();
//   } else { 
//    radius = height/2 - i;
//   }

//   fill(col);

//   beginShape();
//   for (a = 0; a < TWO_PI; a += angle) {
//    sx = cos(a) * radius + (Math.random()*2);
//    sy = sin(a) * radius + (Math.random()*2);
//    vertex(sx, sy);
//   }

//  endShape(CLOSE);
// }

function addChat(e) {
  if (messages.firstChild) 
        messages.removeChild(messages.firstChild);
  let li = document.createElement('li');
  let liapp = messages.appendChild(li);
  liapp.innerHTML = e;
}



// function setup() {

//   canvas = createCanvas(windowWidth, windowHeight);
//   // const synth = new Tone.Synth().toDestination();

    

//   frameRate(30);

socket = io({
  transports: ['websocket'],
  autoConnect: true
});

socket.on('connected', function(data) {
    s = data[0];
    players= data[1];

    // display en la interfaz
    playerTitle.innerHTML = s.toString();
    playersTitle.innerHTML= players.toString();
    statusTitle.innerHTML = 'connected';
    if(initialized) {

    } else {

    }

    // habilitar sintes para todos los players
    // caso 1 player:
    //    solamente estoy conectado yo,
    //    habilitar mi sinte solamente
    
    // caso 2 o mas:
    //    para todos los players aparte de mi,
    //    habilitar sus sintes
 
});

socket.on('userdata', function(data) {
    userData = data;
    connectedSintes = userData.filter(function(x) { return x !==0 ; });
    console.log(connectedSintes);

});


socket.on('disconnected', function() {
    playerTitle.innerHTML = -1;
    statusTitle.innerHTML = 'disconnected';
});

socket.on('users', function(s) {
    playersTitle.innerHTML = s.toString();
});

// socket.on('sliders', (data) => {
//   // console.log(data.length);
//   for(var i=0;i<data.length;i++){
//     // players[i].slider.value = data[i];
//     // players[i].dial.value = data[i];
//     // players[i].toggle.value = data[i];
//     players[i].osc.volume.rampTo(data[i],0.1);
//     // oscils[i].volume.rampTo(data[i],0.1);
//   }
//   // console.log(data);
//   // oscils[0].volume.value = val;
//   // set_vol1(data.value[0]);
//   // set_vol2(data.value[1]);
// });

chatbox.addEventListener("submit", function(evt) {
  evt.preventDefault();
  if(socket.connected) {
    socket.emit('chat', chat.value);
    addChat(chat.value);
    chat.value = '';
  }

});

for (i=0;i<MAXCHATS;i++) {
  let li = document.createElement('li');
  let liapp = messages.appendChild(li);
  liapp.innerHTML = '.';
}

socket.on('chat', function(e) {
    addChat(e);
});

socket.on('position', (data) => {
  // console.log(data);
  let player = sintes[data[0]];
  let x  = data[1][1].x;
  let y  = data[1][1].y;
  player.synth.frequency.rampTo(x, 0.1);
  player.synth.modulationIndex.rampTo(y, 0.1);
  player.frequency = x;
  console.log(player, x, y);
});
socket.on('trigger', (data) => {
  let player = sintes[data[0]];
  let v = data[1];
  if(v) {
      player.synth.triggerAttack();
  } else {
      player.synth.triggerRelease();
  };
  console.log(player,v);
})
// }
// let k=0,t=0,m=0;
// function loadingDots(w,h) {
//   background(255);
//   translate(w/2,h/2);
//   noStroke();
//   fill(0);
//   ellipse(100*sin(radians(k)),0,20*cos(radians(m)),20*cos(radians(m)));
//   ellipse(100*sin(radians(k)+PI/3),0,20*cos(radians(m)+PI/3),20*cos(radians(m)+PI/3));
//   ellipse(100*sin(radians(k)+PI/6),0,20*cos(radians(m)+PI/6),20*cos(radians(m)+PI/6));
//   if(k<360) {
//     k+=4;
//     if(180<k) {
//       if(m<360) {
//         m+=8;
//       } else m = 0;
//     }
//   } else {
//     k=0;
//     m=0;
//   }
// }

// if (players.length >= 1) {
//   for (var player of players) {
//     player.
//   }
// }


// function draw() {



//   if (socket.connected) {

    

//     if (Motion.running) {

//       if(players.length>=1) socket.emit('poll');
     
//       // background('rgba(0,255,0, 0.11)');
     
//       if (Motion.device === 'mouse') {
//         Motion.x = map(mouseX, 0, width, 1, 0);
//         Motion.y = map(mouseY, 0, height, 1, 0);
//         Motion.z = map(mouseY+mouseX, 0, height, 1, 0);
//         socket.emit('event', {
//           header:'/xyz',
//           values: [ Motion.x, Motion.y, Motion.z ]
//         });
//         // let frequency = Motion.x * 500 + 100;
        

        
//         // gainNode.gain.rampTo(Motion.y, 0.1);
//         // console.log(x,y,z);
//       }


      
//       if (Motion.device === 'controller') {
//         socket.emit('event', {
//           header:'/xyz',
//           values: [ Motion.x, Motion.y, Motion.z ]
//         });
//         socket.emit('event', {
//           header:'/act',
//           values: [ Motion.t, Motion.s, Motion.m]
//         });
//         // signal.value = Motion.x * 500 + 100;
//         // gainNode.gain.rampTo(Motion.y, 0.1);

//       }
      
//       // draw a hexagon
//       col = Motion.x * 255;
//       num = Motion.y * 14;

//       hexagon(col, num, i);
//     } 
//     else { // not playing
//     // background(255);
//      loadingDots(width, height);
//     }
//   } else { // socket disconnected

//   }
// }
