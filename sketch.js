
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Defined X/Y, instead of window.innerHeight
var wX = window.innerWidth;
var wY = window.innerHeight;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Composites = Matter.Composites,
    Common = Matter.Common,
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

var boxA = Bodies.rectangle(400, 200, 80, 80, {
    render: {
        fillStyle: 'red',
        lineWidth: 3
    }

});
boxA.collisionFilter.group = -1;
World.add(world,boxA)

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: true
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

var stack = Composites.stack(20, 20, 20, 5, 0, 0, function (x, y) {
    var b = Bodies.circle(x, y, Common.random(0.5, 2), { friction: 0.00001, restitution: 0.5, density: 0.001, curiosity: Math.random() });
    b.collisionFilter.group = -1;
    console.log(b.collisionFilter.group);
    return b;
});

World.add(world, stack);

//Gravity off
engine.world.gravity.y = 0;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

var xDistance, yDistance, mVector;
//UPDATE LOOP
Events.on(engine, "afterUpdate", function () {
    boxA.render.fillStyle = Colour.positionColour(boxA);
    //Iterate through balls
    for (var i in stack.bodies) {
        self = stack.bodies[i];
        //Poisitioning
        xDistance = mouse.position.x - self.position.x;
        yDistance = mouse.position.y - self.position.y;
        mVector = Vector.create(xDistance, yDistance);
        //console.log(Colour.positionColour(self));
        self.render.fillStyle = Colour.positionColour(self);

        //Wander if close
        if (Math.abs(xDistance) < 100*self.curiosity && Math.abs(yDistance) < 100*self.curiosity) {
            wanderVector = Vector.create(getRandomArbitrary(-1, 1), getRandomArbitrary(-1, 1));
            Body.setVelocity(self, wanderVector);
        }
        //Track mouse if far
        else {
            Body.setVelocity(self, Vector.mult(mVector, 0.15));
        }
    }    
});

