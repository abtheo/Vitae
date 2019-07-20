<style>
.cv-multi-blobs {
  width: 200px;
  height: 200px;
  line-height: 200px;
  font-size: 200%;
  position: absolute;
}
</style>


<template>
  <div id="cv-multi-container">
      <CV-Blob class="cv-multi-blobs" v-for="l in list" 
      v-bind:key="l.id" :title="l.title" 
      :style="multiblobStyle(l)"
      :router="router"> </CV-Blob>
  </div>

</template>


<script>

import CV_Blob from './CV_Blob'

export default {
  name: 'CV_Multi_Blob',
  props: ['router'],
  components: {
    "CV-Blob" : CV_Blob
  },
  data () {
    return {
      list: [
        {
          id: 0,
          title: "Curriculum Vitae",
          color: 'black'
        },
        {
          id: 1,
          title: 'Education',
          color: 'yellow'
        },
        {
          id: 2,
          title: 'Background',
          color: 'red'
        },
        {
          id: 3,
          title: 'Statistics',
          color: 'green'
        },
        {
          id: 4,
          title: 'Other',
          color: 'black'
        }

      ],

    }
  },
  methods: {
      multiblobStyle: function(l) {
        var style = {};

        var w = 200;

        var x = 0;
        var y = 0;
        switch(l.id){
          case 0:
            x = 100;
            y = -100;
            style.width = "400px";
            style.height = "400px";
            style.lineHeight = "400px";
            style.zIndex = 1000;
            break;
          case 1:
            x = 0;
            y = 0;
            break;
          case 2:
            x = w;
            y = w;
            break;
          case 3:
            x = 2*w ;
            y = 0;
            break;
          case 4:
            x = w;
            y = -w;
            break;
          default:
            break;
        }

        style.backgroundColor = l.color;

        style.top = 150 + x + "px";
        style.left = 300 + y + "px";

        return style;
      }
    
  },
  
}

</script>