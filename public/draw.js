var canvas
var i, a;
var sx,sy,angle,radius,click;
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	frameRate(30);
}
function draw() {
	col = map(mouseY, 0, height, 1, 0);
	num = map(mouseX, 0, width, 1, 0);
	// console.log(col,num);
}






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





// function hexagon(col,num,i) {
// 	i = frameCount * 0.1;
// 	translate(width/2,height/2);
// 	rotate(i);
// 	angle = TWO_PI / num;
// 	if (radius < 0) {
// 		radius = 0;
// 		noLoop();
// 	} else { 
// 	radius = height/2 - i;
// 	}
// 	fill(col);
// 	beginShape();
// 	for (a = 0; a < TWO_PI; a += angle) {
// 		sx = cos(a) * radius + (Math.random()*2);
// 		sy = sin(a) * radius + (Math.random()*2);
// 		vertex(sx, sy);
// 	}
// 	endShape(CLOSE);
// }

/////// old draw from previous collidpd

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
