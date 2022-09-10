class Spaceship {

    constructor() {

        this.velocity = new createVector(0, 0);
        this.location = new createVector(width/2, height/2);
        this.acceleration = new createVector(0, 0);
        this.maxVelocity = 5;
        this.bulletSys = new BulletSystem();
        this.size = 50;
        this.timer = 0;
        this.system = new ThrusterSystem(createVector(0, 0));
    }

    run() {

        this.bulletSys.run();
        this.draw();
        this.move();
        this.edges();
        this.interaction();
        this.timer += deltaTime * 0.001;

        if(this.timer > 0.4) {

            this.r = random(100, 255);
            this.g = random(100, 255);
            this.b = random(100, 255);
            this.timer = 0;
        }
    }

    draw() {

        fill(this.r, this.g, this.b);

        push();
        translate(this.location.x, this.location.y);
        triangle(-this.size/2, this.size/2, this.size/2, this.size/2, 0, -this.size/2);
        rect(-15, 20, 10, 10);
        rect(5, 20, 10, 10);
        pop();

        this.system.origin.set(this.location.x, this.location.y + 40);
        this.system.run();
    }

    move() {

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(f) {

        this.acceleration.add(f);
    }

    interaction() {

        if (keyIsDown(LEFT_ARROW)) {

            this.applyForce(createVector(-0.1, 0));;
            this.system.addParticle();
        }

        if (keyIsDown(RIGHT_ARROW)) {

            this.applyForce(createVector(0.1, 0));
            this.system.addParticle();
        }

        if (keyIsDown(UP_ARROW)) {

            this.applyForce(createVector(0, -0.1));
            this.system.addParticle();
        }

        if (keyIsDown(DOWN_ARROW)) {

            this.applyForce(createVector(0, 0.1));
        }
    }

    fire() {

        this.bulletSys.fire(this.location.x, this.location.y);
    }

    edges() {

        if (this.location.x<0) this.location.x=width;
        else if (this.location.x>width) this.location.x = 0;
        else if (this.location.y<0) this.location.y = height;
        else if (this.location.y>height) this.location.y = 0;
    }

    setNearEarth() {

        var downVec = createVector(0, 0.05);
        var friction = this.velocity.copy();
        friction.div(30);
        friction.mult(-1);
        this.applyForce(downVec);
        this.applyForce(friction);
    }
}
