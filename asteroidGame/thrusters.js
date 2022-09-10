class Thrusters {

    constructor(_position) {

        this.acceleration = createVector(0, 0.5);
        this.velocity = createVector(random(-1, 1), random(-1, 0));
        this.position = _position.copy();
        this.lifespan = 150;

        this.r = random(100, 255);
        this.g = random(100, 255);
        this.b = random(100, 255);
    }

    run() {

        this.update();
        this.display();
    }

    update() {

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
    }

    display() {

        strokeWeight(2);
        fill(this.r, this.g, this.b, this.lifespan);
        ellipse(this.position.x, this.position.y, 12, 12);
    }

    isDead() {

        return this.lifespan < 0;
    }
};

class ThrusterSystem {

    constructor(_position) {

        this.origin = _position.copy();
        this.particles = [];
    }

    run() {

        for (var i = this.particles.length-1; i >= 0; i--) {

            var p = this.particles[i];
            p.run();

            if (p.isDead()) {

                this.particles.splice(i, 1);
            }
        }
    }

    addParticle() {

        this.particles.push(new Thrusters(this.origin));
    }
};
