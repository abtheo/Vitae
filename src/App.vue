<template>
  <v-app>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home'
import Theme from '../styles/theme.js'

export default {
  name: 'App',
  components: {
    Home
  },
  data () {
    return {
      //
    }
  },
  created: function(){
    this.$vuetify.theme = Theme.themeBlack;
  }

}
</script>
