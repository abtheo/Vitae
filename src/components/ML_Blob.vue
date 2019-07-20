<template>
<v-hover>
  <div class="ml-container"
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`">
      <div id="canvas"
      class="penrose-canvas"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave"
      @click="router('ML')"/>
      
      <p id="ml-banner" class="ml-banner">Machine Learning</p>

  </div>
</v-hover>

</template>

<style>
.penrose-canvas {
  border-radius: 50%;
  overflow: hidden;
  border-color: white;
  width: 400px;
  height: 400px;
  
}

.ml-banner {
    color: white;
    font-size: 38px;
    font-weight: 300;
    z-index: 1000;
    top: -230px;
    left: 36px;
    position: relative;
    display: inline-flex;
    max-width: 400px;
    text-align: center;
    font-family: 'consolas';
}

.ml-container{
    display: inline-block;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    overflow: hidden;
    border-color: white;
    margin: 10px;
}


</style>
<script>
import p5 from 'p5'
import $ from 'jquery'
import { setTimeout } from 'timers';

export default {
  name: 'ML_Blob',
  props: ['router'],
  data () {
    return {
      canvas: null,
      showMLBanner: true,
      pLock: false
    }
  },
  created: function(){
    this.canvas = new p5(s, 'canvas');
  },
  methods: {
      //TODO: Hover only on Circular Border
      //center div to mouse:
      //sqrt((x2 - x1)^2 + (y2 - y1)^2)
      mouseEnter: function(){
        if (this.pLock) return;
        this.pLock = true;
        this.canvas.remove();
        this.canvas = new p5(s, 'canvas');
        this.canvas.start();
        this.showMLBanner = true;
        var colours = this.canvas.getColors();
        //Forces black shadow for white only
        if (!colours.includes(0)){
            colours = [0,0,0];
        }
        //Lazy force after loaded into DOM
        setTimeout(function(){
            $("#ml-banner").css('textShadow',`rgb(${colours[0]},${colours[1]},${colours[2]}) 1px 1px`);
        },1);      
      },
      mouseLeave: function(){
        this.pLock = false;
      },  
  }
}

var s = function (sketch) {
  let ds;
  //Setup
  sketch.setup = function(){
    sketch.createCanvas(400, 400);
    //Generate new geometry each spawn
    sketch.rTheta = getRandomInt(3,19);
    ds = new sketch.PenroseLSystem();

  };

//Sets all context variables
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

    sketch.loopMulti = Math.ceil(sketch.rTheta / 10);

    //Begin Simulation
    ds.simulate(3);
  };

  //Draw
  sketch.draw = function(){
    sketch.background(0);
    ds.render();
  };

  sketch.getColors = function(){
      return [sketch.r || 0, sketch.g || 0 , sketch.b || 0];
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
    this.theta = sketch.TWO_PI / sketch.rTheta; //36 degrees, try TWO_PI / 6.0, ...
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
    //Sets background colour
    sketch.background("#aaaaaa");
    var baseL = this.production.length;
    this.steps += 30;
    if(this.steps > baseL) {
      this.steps = baseL;
    }

    for(let i=0; i<this.steps*sketch.loopMulti; ++i) {
      let step = this.production.charAt(i%baseL);

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