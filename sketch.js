
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Defined X/Y, instead of window.innerHeight
var wX = 1000;
var wY = 600;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Events = Matter.Events;

// create an engine
var engine = Engine.create();
var world = engine.world;
// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: wX,
        height: wY,
        wireframes: false
    }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80, {
    render: {
        fillStyle: 'red',
        strokeStyle: 'blue',
        lineWidth: 3
    }
});

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(world, [boxA, ground]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: wX, y: wY }
});


// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

//UPDATE LOOP
Events.on(engine, "afterUpdate", function () {
    var xDistance = mouse.position.x - boxA.position.x;
    var yDistance = mouse.position.y - boxA.position.y;
    var mVector = Vector.create(xDistance, yDistance);

    //Wander if close
    if (Math.abs(xDistance) < 50 && Math.abs(yDistance) < 50) {
        wanderVector = Vector.create(getRandomArbitrary(-1, 1), getRandomArbitrary(-1, 1));
        Body.setVelocity(boxA, wanderVector);
    } else {
        Body.setVelocity(boxA, Vector.mult(mVector,0.09));
    }
    
});

