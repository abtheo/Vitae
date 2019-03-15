<template>
    <div id="canvas"
    class="penrose-canvas"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"></div>
    <!--<v-card
    :hover="true"
    class="primary">
        Hello World
    </v-card>-->

</template>
<style>
.penrose-canvas {
  border-radius: 50%;
  width: 400px;
  height: 400px;
  overflow: hidden;
  border-color: white;
  margin: 10px;
}


</style>
<script>
import p5 from 'p5'

export default {
  name: 'Home',
  data () {
    return {
      canvas: null
    }
  },
  created: function(){
    this.canvas = new p5(s, 'canvas');
  },
  methods: {
      mouseEnter: function(){
        this.canvas.start();
      },
      mouseLeave: function(){
        this.canvas.remove();
        this.canvas = new p5(s, 'canvas');
      }
  }
}

var s = function (sketch) {
  let ds;
  //Setup
  sketch.setup = function(){
    sketch.createCanvas(400, 400);
    ds = new sketch.PenroseLSystem();

  };

  sketch.start = function(){
    //Randomises colour
    sketch.r=0;
    sketch.g=0;
    sketch.b=0;
    var rColors = [getRandomInt(0,1), getRandomInt(0,1), getRandomInt(0,1)];
    //Disables black
    if (!rColors.includes(1)){
        rColors[getRandomInt(0,2)] = 1;
    }

    if (rColors[0] == 1) sketch.r = 255;
    if (rColors[1] == 1) sketch.g = 255;
    if (rColors[2] == 1) sketch.b = 255;

    //Begin Simulation
    ds.simulate(3);
  };

  sketch.getMouse = function(){
      console.log(sketch.mouseX, sketch.mouseY);
  };

  //Draw
  sketch.draw = function(){
    sketch.background(0);
    ds.render();
  };

  //Penrose System
  sketch.PenroseLSystem = 
  function() {
    this.steps = 0;

   //these are axiom and rules for the penrose rhombus l-system
   //a reference would be cool, but I couldn't find a good one
    this.axiom = "[X]++[X]++[X]++[X]++[X]";
    //this.ruleW = "YF++ZF----XF[-YF----WF]++"; REALRULE   
    this.ruleW = "YF++ZF----XF[-YF----WF]++";
    this.ruleX = "+YF--ZF[---WF--XF]+";
    this.ruleY = "-WF++XF[+++YF++ZF]-";
    this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";

    //please play around with the following two lines
    this.startLength = 500.0;
    this.theta = sketch.TWO_PI / 6.0; //36 degrees, try TWO_PI / 6.0, ...
    this.reset();
}

sketch.PenroseLSystem.prototype.simulate = function (gen) {
  while (this.getAge() < gen) {
    this.iterate(this.production);
  }
}

sketch.PenroseLSystem.prototype.reset = function () {
    this.production = this.axiom;
    this.drawLength = this.startLength;
    this.generations = 0;
  }

sketch.PenroseLSystem.prototype.getAge = function () {
    return this.generations;
  }

//apply substitution rules to create new iteration of production string
sketch.PenroseLSystem.prototype.iterate = function() {
    let newProduction = "";

    // check if the mouse is inside the bounding box and tickle if so
    for(let i=0; i < this.production.length; ++i) {
      let step = this.production.charAt(i);
      //if current character is 'W', replace current character
      //by corresponding rule
      if (step == 'W') {
        newProduction = newProduction + this.ruleW;
      }
      else if (step == 'X') {
        newProduction = newProduction + this.ruleX;
      }
      else if (step == 'Y') {
        newProduction = newProduction + this.ruleY;
      }
      else if (step == 'Z') {
        newProduction = newProduction + this.ruleZ;
      }
      else {
        //drop all 'F' characters, don't touch other
        //characters (i.e. '+', '-', '[', ']'
        if (step != 'F') {
          newProduction = newProduction + step;
        }
      }
    }

    this.drawLength = this.drawLength * 0.5;
    this.generations++;
    this.production = newProduction;
}

//convert production string to a turtle graphic
sketch.PenroseLSystem.prototype.render = function () {
    sketch.translate(sketch.width / 2, sketch.height / 2);

    this.steps += 30;
    if(this.steps > this.production.length) {
      this.steps = this.production.length;
    }

    for(let i=0; i<this.steps; ++i) {
      let step = this.production.charAt(i);

      //'W', 'X', 'Y', 'Z' symbols don't actually correspond to a turtle action
      if( step == 'F') {
        
        sketch.stroke(sketch.r,sketch.g, sketch.b);

        for(let j=0; j < this.repeats; j++) {
          sketch.line(0, 0, 0, -this.drawLength);
          sketch.noFill();
          sketch.translate(0, -this.drawLength);
        }
        this.repeats = 1;
      }
      else if (step == '+') {
        sketch.rotate(this.theta);
      }
      else if (step == '-') {
        sketch.rotate(-this.theta);
      }
      else if (step == '[') {
        sketch.push();
      }
      else if (step == ']') {
        sketch.pop();
      }
    }
  }

}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

</script>