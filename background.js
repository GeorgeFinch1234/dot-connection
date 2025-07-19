const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let circleX = 0
let circleY = 0
let dotsInCircle = []
let circleSize;
let dotCount;
let dots = [];
//they move in a strught line, when hit the wall they change direction
class Dot {
    constructor(initialX, initialY, initialVX, initialVY) {
        this.x = initialX;
        this.y = initialY;
        //velocity x,
        this.VX = initialVX
        this.VY = initialVY
    }
}




function circle() {
    ctx.beginPath()
    ctx.arc(circleX, circleY, 200, 0, Math.PI * 2)
    ctx.fillStyle = "rgb(40 42 54 / 10%)"
    ctx.fill();

}








function createDots(){
    dots = [];
    dotCount = Math.floor(window.innerWidth / 15);
    for (let i = 0; i < dotCount; i++) {
        //to stop it being able to be zero eg not move 
        let zeroX = 0;
        while (zeroX == 0) {
            //-0.5 so can go back
            //2 is speed bascially
            zeroX = (Math.random() - 0.5) * 2

        }
        let zeroY = 0;
        while (zeroY == 0) {
            zeroY = (Math.random() - 0.5) * 2
        }






        dots.push(
            new Dot(
                Math.floor(Math.random() * window.innerWidth),
                Math.floor(Math.random() * window.innerHeight),
                zeroX,
                zeroY
            )
        )

    }
}


function setup() {
canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createDots()
    draw()
}

function draw() {
    console.log(dots.length)
    ctx.fillStyle = "rgb(11,12,16)"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    //floor to stop any issue with being floating point
    
    //clear dotsInCirle, so if leave no longer effected
    dotsInCircle = []
    for (let i = dots.length - 1; i >= 0; i--) {


        //-0.5 so get positive and negs
        //changes 2 for movement speed
        dots[i].x += dots[i].VX
        dots[i].y += dots[i].VY

        //dont like this so it just changes direction
        if (dots[i].x <= 0) {
            dots[i].VX = (Math.random()) * 2
        }
        if (dots[i].x >= window.innerWidth) {
            dots[i].VX = (Math.random() - 1) * 2
        }
        if (dots[i].y <= 0) {
            dots[i].VY = (Math.random()) * 2
        }
        if (dots[i].y >= window.innerHeight) {
            dots[i].VY = (Math.random() - 1) * 2
        }

        ctx.beginPath()
        ctx.arc(dots[i].x, dots[i].y, 1, 0, Math.PI * 2)
        ctx.fillStyle = "#ffffff"
        ctx.fill();

        if (dots[i].x > circleX - 200 && dots[i].x < circleX + 200 && dots[i].y > circleY - 200 && dots[i].y < circleY + 200) {
            dotsInCircle.push(dots[i]);
        }



//f as in first loop
        for (let f = 0; f < dotsInCircle.length;f++) {

//so only do a check once
//s for second
            for (let s = f; s <dotsInCircle.length; s++) {


                let dx = dotsInCircle[f].x - dotsInCircle[s].x;
                let dy = dotsInCircle[f].y - dotsInCircle[s].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 125) {
                    ctx.beginPath()
                    ctx.moveTo(dotsInCircle[f].x, dotsInCircle[f].y)
                    ctx.lineTo(dotsInCircle[s].x, dotsInCircle[s].y)
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
                    ctx.stroke()
                }
                // sqrt((x2 - x1)^2 + (y2 - y1)^2)
                let mdx = circleX - dotsInCircle[s].x;
                let mdy = circleY - dotsInCircle[s].y;
                let mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mouseDistance < 125) {
                    ctx.beginPath()
                    ctx.moveTo(circleX, circleY)
                    ctx.lineTo(dotsInCircle[s].x, dotsInCircle[s].y)
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
                    ctx.stroke()
                }





                /*
                                if (((inCircle.x - dotsInCircle[i].x) < 20  
                                && (inCircle.x - dotsInCircle[i].x) > -20 )
                                || ((inCircle.y - dotsInCircle[i].y) < 20 
                                && (inCircle.y - dotsInCircle[i].y) > -20)) {
                                    ctx.beginPath()
                                    ctx.moveTo(inCircle.x, inCircle.y)
                                    ctx.lineTo(dotsInCircle[i].x, dotsInCircle[i].y)
                                    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
                                    ctx.stroke()
                
                
                                }
                  
                                if (((circleX - dotsInCircle[i].x) < 20  
                                && (circleX - dotsInCircle[i].x) > -20 )
                                || ((circleY - dotsInCircle[i].y) < 20 
                                && (circleY - dotsInCircle[i].y) > -20)) {
                                    ctx.beginPath()
                                    ctx.moveTo(circleX, circleY)
                                    ctx.lineTo(dotsInCircle[i].x, dotsInCircle[i].y)
                                    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
                                    ctx.stroke()
                
                
                                }
                */

            }

        }


    }

    
    circle()

    setTimeout(draw, 25)
}

addEventListener("mousemove", e => {
    circleX = e.clientX
    circleY = e.clientY
})
addEventListener("touchmove", (e) => {
   
    e.preventDefault();
    //prevent default so can scroll
    circleX = e.touches[0].clientX
    circleY = e.touches[0].clientY

     
})

addEventListener("resize",()=>{
canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
     createDots()
    
})
setup();