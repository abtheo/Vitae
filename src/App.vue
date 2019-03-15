<template>
  <v-app>
    <v-content>
      <!--<Home/>-->
      <div id="app">
        <div id="canvas"/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home'
import Theme from '../styles/theme.js'

export default {
  name: 'App',
  components: {
    //Home
  },
  data () {
    return {
      canvas: null
    }
  },
  created: function(){
    this.$vuetify.theme = Theme.themeBlack;
    this.canvas = new p5(s, 'canvas');
  },
}
</script>
