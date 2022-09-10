class AsteroidSystem {

  //Creates arrays to store each asteroid's data
    constructor() {

        this.locations = [];
        this.velocities = [];
        this.accelerations = [];
        this.diams = [];

        this.colors = [];
    }

    run(game) {

        this.spawn(game);
        this.move();
        this.draw();
    }

    //Spawns asteroid at random intervals
    spawn(game) {

        //DifficultyScaling, capped
        if (random(2) < game.gameTime * 0.001) {

            this.accelerations.push(new createVector(0,random(0.1,1)));
            this.velocities.push(new createVector(0, 0));
            this.locations.push(new createVector(random(width), 0));
            this.diams.push(random(30,50));

            this.colors.push(new createVector(random(0, 255), random(0, 255), random(0, 255)));
        }
    }

    //Moves all asteroids
    move() {

        for (var i = 0; i < this.locations.length; i++) {

            this.velocities[i].add(this.accelerations[i]);
            this.locations[i].add(this.velocities[i]);
            this.accelerations[i].mult(0);
        }
    }

    applyForce(f) {

        for (var i = 0; i < this.locations.length; i++) {

            this.accelerations[i].add(f);
        }
    }

    //Draws all asteroids
    draw() {

        noStroke();

        for (var i = 0; i < this.locations.length; i++) {

            fill(this.colors[i].x, this.colors[i].y, this.colors[i].z);
            ellipse(this.locations[i].x, this.locations[i].y, this.diams[i], this.diams[i]);
        }
    }

    //Function that calculates effect of gravity on each asteroid and accelerates it
    calcGravity(centerOfMass) {

        for (var i = 0; i < this.locations.length; i++) {

            var gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
            gravity.normalize();
            gravity.mult(.001);
            this.applyForce(gravity);
        }
    }

    //Destroys all data associated with each asteroid
    destroy(index) {

        this.locations.splice(index,1);
        this.velocities.splice(index,1);
        this.accelerations.splice(index,1);
        this.diams.splice(index,1);
        this.colors.splice(index, 1);
    }
}
