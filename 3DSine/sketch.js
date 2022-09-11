var distance;
var length;

var xLoc;
var zLoc;

var confLocs;
var confTheta;

var slider;
var noiseSpeed;

function setup() {
    createCanvas(900, 800, WEBGL);
    
    //Confetti
    confLocs = [];
    confTheta = [];
    
    for (var i = 0; i < 200; i++) {
        var x = random(-500, 500);
        var y = random(-800, 0);
        var z = random(-500, 500);
        confLocs.push(createVector(x, y, z));
        confTheta.push(random(0, 360));
    }
    
    //Slider
    slider = createSlider(1, 200, 100);
    slider.position(10, 10);
}

function draw() {
    background(125);
    angleMode(DEGREES);
    
    //Slider
    noiseSpeed = slider.value();
    
    //Camera
    xLoc = cos(frameCount/3) * 1200;
    zLoc = sin(frameCount/3) * 1200;
    
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);
    
    for (var i = -400; i < 400; i+= 50) {
        for(var y = -400; y < 400; y += 50) {
            push();
            //Base style
            specularMaterial(255);
            
            //Lights
            pointLight(255, 192, 203, 0, -200, 0);
            pointLight(255, 0, 0, 900, 0, 0);
            pointLight(0, 255, 0, -900, 0, 0);
            pointLight(0, 0, 255, 0, 0, 900);
            pointLight(255, 255, 0, 0, 0, -900);
            stroke(0);
            strokeWeight(2);
            
            //base
            distance = dist(0, 0, i, y) + frameCount;    
            /*length = map(sin(distance), -1, 1, 100, 300);*/
            
            var boxNoise = noise(sin(distance), frameCount/noiseSpeed);
            var boxMap = map(boxNoise, 0, 1, 100, 300);
            
            translate(i, 0, y);
            box(50, boxMap, 50);
            pop();
        } 
    }
    
    //Confetti style
    push();
    normalMaterial();
    noStroke();
    confetti();
    pop();
}

function confetti() {
    for (var i = 0; i < confLocs.length; i++) {
        push();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15, 15);
        
        //Animation
        confLocs[i].y += 1;
        confTheta[i] += 10;
        
        //Reset confetti
        if (confLocs[i].y > 0) {
            confLocs[i].y = -800;
        }
        pop();
    }
}

