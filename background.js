const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//they move in a strught line, when hit the wall they change direction
class Dot {
    constructor(initialX, initialY,initialVX,initialVY){
        this.x = initialX;
        this.y = initialY;
        //velocity x,
       this.VX = initialVX
       this.VY = initialVY
    }
}
const dots = [];

function setup(){

for(let i=0; i<10; i++){
   //to stop it being able to be zero eg not move 
  let zeroX = 0;
   while(zeroX==0){
    //-0.5 so can go back
//2 is speed bascially
zeroX =  (Math.random()-0.5)*2
console.log(zeroX)
   }
   let zeroY = 0;
   while(zeroY==0){
zeroY =  (Math.random()-0.5)*2
   }
   
   




dots.push(
    new Dot(
        Math.floor(Math.random() *window.innerWidth),
        Math.floor(Math.random() *window.innerHeight),
        zeroX,
        zeroY
    )
)
    
}
draw()
}

function draw(){
     canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight ;
ctx.fillStyle = "white"
ctx.fillRect(0,0,window.innerWidth,window.innerHeight)

//floor to stop any issue with being floating point
Math.floor(Math.random() *window.innerHeight)

for(let i=dots.length-1; i>=0; i--){
  //-0.5 so get positive and negs
  //changes 2 for movement speed
dots[i].x += dots[i].VX
dots[i].y += dots[i].VY

console.log(dots[i].VY)
ctx.beginPath()
ctx.arc(dots[i].x,dots[i].y,4,0,Math.PI *2)
ctx.fillStyle="black"
ctx.fill();

}




setTimeout(draw,25)
}

setup();