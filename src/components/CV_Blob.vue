<template>
<v-hover>
    <div class="cv-container"
    slot-scope="{ hover }"
    :class="`elevation-${hover ? 12 : 2}`"
    @click="router">
        <p id="cv-banner" class="cv-banner">Curriculum Vitae</p>
    </div>
 </v-hover>

</template>

<style>

.cv-container{
    width: 400px;
    height: 400px;
    border-radius: 50%;
    overflow: hidden;
    border-color: white;
    margin: 10px;
    background-color: black;
    display: inline-block;
}


.cv-banner {
    color: white;
    font-size: 38px;
    font-weight: 300;
    z-index: 1000;
    top: 170px;
    left: 36px;
    display: inline-flex;
    position: relative;
    max-width: 400px;
    text-align: center;
    font-family: 'consolas';
    text-shadow: gray 2px 2px;
}

</style>

<script>
export default {
  name: 'CV_Blob',
  props: ['router'],
  data () {
    return {
      
    }
  }
}

</script>