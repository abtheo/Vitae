<template>
  <v-app>
    <v-content>
    
      <div id="app">
        <ML/>
        <CV/>
        
      </div>
    </v-content>
  </v-app>
</template>

<script>
import ML from './components/ML'
import CV from './components/CV'
import Theme from '../styles/theme.js'

export default {
  name: 'App',
  components: {
    "ML" : ML,
    "CV" : CV
  },
  data () {
    return {
      canvas: null
    }
  },
  created: function(){
    this.$vuetify.theme = Theme.themeBlack;
  },
}
</script>
