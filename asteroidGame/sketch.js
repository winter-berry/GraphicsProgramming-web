var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var game;
var counter = 0;
var seconds = 0;
var minutes = 0;

//////////////////////////////////////////////////
function setup() {

    createCanvas(1200,800);
    spaceship = new Spaceship();
    asteroids = new AsteroidSystem();
    game = new Game();

    //location and size of earth and its atmosphere
    atmosphereLoc = new createVector(width/2, height*2.9);
    atmosphereSize = new createVector(width*3, width*3);
    earthLoc = new createVector(width/2, height*3.1);
    earthSize = new createVector(width*3, width*3);

    setInterval(timer, 1000);
}
//////////////////////////////////////////////////
function draw() {

    background(0);
    sky();

    spaceship.run();
    asteroids.run(game);
    game.run();

    drawEarth();
    //Checks collision between various elements
    checkCollisions(spaceship, asteroids);

    push();
    textSize(25);
    textFont('Helvetica');
    textFont('monospace');
    fill(255, 255, 255, 240);
    text("Time: " + minutes + "m " + seconds + "s", 10, 30);
    pop();
}
//////////////////////////////////////////////////
//Draws earth and atmosphere
function drawEarth() {

    noStroke();
    //Draw atmosphere

    push();
    fill(0, 0, 255, 50);
    ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
    pop();

    //Draw earth
    push();
    fill(0, 0, 255, 255);
    ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
    pop();
}
//////////////////////////////////////////////////
//Checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {

    for(var i = 0; i < asteroids.locations.length; i++) {

        if(isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])) {

            gameOver();
        }

        else if(isInside(earthLoc, earthSize.y, asteroids.locations[i], asteroids.diams[i])) {

            gameOver();
        }

        for(var y = 0; y < spaceship.bulletSys.bullets.length; y++) {

            if(isInside(asteroids.locations[i], asteroids.diams[i], spaceship.bulletSys.bullets[y], spaceship.bulletSys.diam)) {

                asteroids.destroy(i);
                game.asteroidsHit += 1;
                break;
            }
        }
    }

        if(isInside(spaceship.location, spaceship.size, earthLoc, earthSize.y)) {
            gameOver();
        }

        if(isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.y)) {

            spaceship.setNearEarth();
        }
}
//////////////////////////////////////////////////
//Helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {

    if(dist(locA.x, locA.y, locB.x, locB.y) < ((sizeA * 0.5) + (sizeB * 0.5))) {

        return true;
    }

    else {

        return false;
    }
}
//////////////////////////////////////////////////
function keyPressed() {

    //If spacebar is pressed, fire!
    if(keyIsPressed && keyCode === 32) {

        spaceship.fire();
    }
}
//////////////////////////////////////////////////
//Function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {

    push();
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("GAME OVER ( ͡° ͜ʖ ͡°)", width/2, height/2)
    noLoop();
    pop();
}
//////////////////////////////////////////////////
//Function that creates a star lit sky
function sky() {

    push();
    while(starLocs.length < 300) {

        starLocs.push(new createVector(random(width), random(height)));
    }

    fill(255);

    for(var i = 0; i < starLocs.length; i++) {

        rect(starLocs[i].x, starLocs[i].y,2,2);
    }

    if(random(1) < 0.3) starLocs.splice(int(random(starLocs.length)),1);
    pop();
}
//////////////////////////////////////////////////
function timer() {

    if (counter >= 0) {

        counter++;
    }

    minutes = floor(counter/60);
    seconds = counter % 60;
}
