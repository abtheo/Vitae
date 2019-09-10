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

        <button @click="getRq('/hello')">Hello World</button>

      <img src="@/assets/logo.png" id="logo"/>
    </v-toolbar>

  

<!--
    <v-carousel fill-height class="carousel" height="90%" :cycle="false">
      <v-carousel-item >
          <CV-Blob class="md" :router="router"> </CV-Blob>
      </v-carousel-item>
      <v-carousel-item>
          <ML-Blob class="md" :router="router"> </ML-Blob>
      </v-carousel-item>
    </v-carousel>-->
      </div>


    </v-content>
  </v-app>
</template>

<style>
#app { 
  height: 100%;
}
.md {
  left: 39%;
  top: 50%;
}

</style>

<script>
import ML_Blob from './components/ML_Blob'
import CV_Blob from './components/CV_Blob'

import CV_Page from './pages/CV'
import ML_Page from './pages/ML'

import Theme from '../styles/theme.js'

import http from "./http.js"

/* eslint-disable */
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
      route: 'Home',

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
    },
    getRq: function(path) {
      //var basepath = "http://127.0.0.1:5000/";
      http.get({
        url:path,
        }).then(response => {
          this.status = response.statusCode;
          console.log(response)
          alert(response.responseText)
      });
    }
  }
}
</script>
