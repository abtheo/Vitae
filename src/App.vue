<template>
  <v-app>
    <v-content>
    
      <div id="app">
        <Home/>
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
    "Home" : Home
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
