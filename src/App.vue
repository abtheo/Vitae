<template>
  <v-app>
    <v-content>
    
      <div id="app">
        <ML-Blob/>
        <CV-Blob/>
        
      </div>
    </v-content>
  </v-app>
</template>

<script>
import ML_Blob from './components/ML_Blob'
import CV_Blob from './components/CV_Blob'
import Theme from '../styles/theme.js'

export default {
  name: 'App',
  components: {
    "ML-Blob" : ML_Blob,
    "CV-Blob" : CV_Blob,
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
