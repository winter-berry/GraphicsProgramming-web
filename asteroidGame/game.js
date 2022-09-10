//further development

class Game  {

    constructor() {

        this.gameTime = 0;
        this.asteroidsHit = 0;
    }

    run() {

        textSize(25);
        textFont('Helvetica');
        textFont('monospace');
        fill(255, 255, 255, 240);

        this.scoreTracking();
        this.difficultyScaling();
    }

    scoreTracking() {

        text("Current Score: " + this.asteroidsHit, 10, 60);
    }

    difficultyScaling() {
        //Time in seconds
        this.gameTime += deltaTime * 0.001;
    }
}
