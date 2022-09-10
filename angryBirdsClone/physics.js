////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller()
{
    propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true, angle: angle});
    World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//Updates and draws the propeller
function drawPropeller()
{
  push();
    drawVertices(propeller.vertices);
    Body.setAngle(propeller, angle);
    Body.setAngularVelocity(propeller, angleSpeed);
    angle += angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird()
{
    var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0, restitution: 0.95 });
    Matter.Body.setMass(bird, bird.mass*10);
    World.add(engine.world, [bird]);
    birds.push(bird);

}
////////////////////////////////////////////////////////////////
function drawBirds()
{
  push();
    for(var i = this.birds.length - 1; i >= 0; i--)
    {
        fill(255, 0, 0);
        drawVertices(birds[i].vertices);

        if(isOffScreen(birds[i]))
        {
            removeFromWorld(birds[i]);
            birds.splice(i, 1);
        }

        //console.log("birds on screen: " + birds.length);
    }
  pop();
}
////////////////////////////////////////////////////////////////
//Creates a tower of boxes
function setupTower()
{
    for (var y = 0; y < 6; y++)
    {
        for (var j = 0; j < 3; j++)
        {
            var box = Bodies.rectangle(700 + (80 * j), 50 + (80 * y), 80, 80);
            World.add(engine.world, [box]);
            boxes.push(box);
            colors.push(random(255));
        }
    }
}
////////////////////////////////////////////////////////////////
//Draws tower of boxes
function drawTower() {
  push();
    for(var i = 0; i < boxes.length; i++){

        fill(0, colors[i], 0);
        drawVertices(boxes[i].vertices);

        if(isOffScreen(boxes[i]))
        {
            removeFromWorld(boxes[i]);
            boxes.splice(i, 1);
            colors.splice(i, 1);
        }

        if(boxes.length == 0 && timerValue > 0)
        {
            youWin();
        }

        else if (boxes.length > 0 && timerValue == 0)
        {
            youLose();
        }
    }
    //console.log("boxes on screen: " + boxes.length);
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
    var gravity = engine.world.gravity;
    slingshotBird = Bodies.circle(200, 200, 50, {friction: 0, restitution: 0.95});
    Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);

    slingshotConstraint = Constraint.create({
        pointA: { x: 200, y: 140 },
        bodyB: slingshotBird,
        pointB: { x: 0, y: -30 },
        stiffness: 0.01,
        damping: 0.0001
    });

    World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//Draws slingshot bird and its constraint
function drawSlingshot() {
  push();
    push();
    fill(255, 150, 0);
    //drawVertices(slingshotBird.vertices);
    const pos = slingshotBird.position;
    translate(pos.x, pos.y);
    imageMode(CENTER);
    image(birdImg, 0, 0, 100, 100);
    pop();

    stroke(128);
    strokeWeight(2);
    drawConstraint(slingshotConstraint);
  pop();
}
////////////////////////////////////////////////////////////////
function setupTNT() {
    boomboom = Bodies.rectangle(450, 500, 100, 100);
    Matter.Body.setMass(boomboom, boomboom.mass*10);

    World.add(engine.world, [boomboom]);
}
////////////////////////////////////////////////////////////////
//Draws slingshot bird and its constraint
function drawTNT() {
    push();
    fill(255, 150, 0);
    const pos = boomboom.position;
    translate(pos.x, pos.y);
    imageMode(CENTER);
    image(tntImg, 0, 0, 100, 100);
    pop();
}
/////////////////////////////////////////////////////////////////
function detonate() {

    Body.setVelocity(boomboom, {x:  25, y: -25});

    if(isOffScreen(boomboom)) {
        removeFromWorld(boomboom);
    }
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

////////////////////////////////////////////////////////////////
function timer()
{
    if(timerValue > 0)
    {
        timerValue--;
    }
}
