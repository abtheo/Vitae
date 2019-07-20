<template>
  <v-app>
    <v-content>    
      <div id="app">
        <v-toolbar class="app-main navbar">
        <v-toolbar-title id="navbar-title"
        @click="router('Home')">
          Home
        </v-toolbar-title>
        <v-spacer></v-spacer>
      <img src="@/assets/logo.png" id="logo"/>
    </v-toolbar>


        <!--HOME-->
        <template v-if="this.route==='Home'">
          <ML-Blob :router="router"> </ML-Blob>
          <CV-Blob :router="router"> </CV-Blob>
        </template>

        <!--ML-->
        <template v-else-if="this.route==='ML'">
          <ML />
        </template>

        <!--CV-->
        <template v-else-if="this.route==='CV'">
          <CV />
        </template>

        <template v-else>
          <p>Hi</p>
        </template>

      </div>


    </v-content>
  </v-app>
</template>

<script>
import ML_Blob from './components/ML_Blob'
import CV_Blob from './components/CV_Blob'

import CV_Page from './pages/CV'
import ML_Page from './pages/ML'

import Theme from '../styles/theme.js'

export default {
  name: 'App',
  components: {
    "ML-Blob" : ML_Blob,
    "CV-Blob" : CV_Blob,
    "CV" : CV_Page,
    "ML" : ML_Page
  },
  data () {
    return {
      canvas: null,
      route: 'Home'
    }
  },
  created: function(){
    this.$vuetify.theme = Theme.themeBlack;
    //console.log(this.route)
  },
  methods: {
    router: function(subj) {
      this.route = subj;
      console.log(this.route)
    }
  }
}
</script>
