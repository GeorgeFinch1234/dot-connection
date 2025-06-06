const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let circleX = 0
let circleY = 0
let dotsInCircle = []
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



function circle(){
ctx.beginPath()
ctx.arc(circleX,circleY,200,0,Math.PI *2)
ctx.fillStyle="rgb(0 0 0 / 1%)"
ctx.fill();

}











function setup(){

for(let i=0; i<40; i++){
   //to stop it being able to be zero eg not move 
  let zeroX = 0;
   while(zeroX==0){
    //-0.5 so can go back
//2 is speed bascially
zeroX =  (Math.random()-0.5)*2

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
ctx.fillStyle = "#0b0c10"
ctx.fillRect(0,0,window.innerWidth,window.innerHeight)

//floor to stop any issue with being floating point
Math.floor(Math.random() *window.innerHeight)
//clear dotsInCirle, so if leave no longer effected
dotsInCircle = []
for(let i=dots.length-1; i>=0; i--){


  //-0.5 so get positive and negs
  //changes 2 for movement speed
dots[i].x += dots[i].VX
dots[i].y += dots[i].VY

//dont like this so it just changes direction
if(dots[i].x <=0){
    dots[i].VX =   (Math.random())*2
}
if(dots[i].x >=window.innerWidth){
    dots[i].VX =   (Math.random()-1)*2
}
if(dots[i].y <=0){
    dots[i].VY =  (Math.random())*2
}
if(dots[i].y >=window.innerHeight){
    dots[i].VY =  (Math.random()-1)*2
}

ctx.beginPath()
ctx.arc(dots[i].x,dots[i].y,1,0,Math.PI *2)
ctx.fillStyle="#ffffff"
ctx.fill();

if(dots[i].x >  circleX -200 &&dots[i].x <  circleX +200 &&dots[i].y >  circleY -200 &&dots[i].y <  circleY +200 ){
dotsInCircle.push(dots[i]);
}
dotsInCircle.forEach(inCircle=>{
    for(let i=dotsInCircle.length-1; i>=0; i--){
if((inCircle.x -dotsInCircle[i].x)<20 &&(inCircle.y -dotsInCircle[i].y)<20 ||(inCircle.x -dotsInCircle[i].x)>20 &&(inCircle.y -dotsInCircle[i].y)>20){
    ctx.beginPath()
    ctx.moveTo(inCircle.x,inCircle.y)
    ctx.lineTo(dotsInCircle[i].x,dotsInCircle[i].y)
    ctx.strokeStyle="rgba(255, 255, 255, 0.1)"
    ctx.stroke()

}
}

})


}

console.log(dotsInCircle)
circle()

setTimeout(draw,25)
}

addEventListener("mousemove",e=>{
circleX = e.clientX
circleY = e.clientY
})


setup();