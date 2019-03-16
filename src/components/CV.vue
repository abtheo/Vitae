<template>
<v-hover>
    <div class="cv-container"
    slot-scope="{ hover }"
    :class="`elevation-${hover ? 12 : 2}`">
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
    margin-left: 50px;
    background-color: black;
    display: inline-block;
}


.cv-banner {
    color: white;
    font-size: 38px;
    font-weight: 300;
    z-index: 100;
    top: 180px;
    left: 500px;
    max-width: 400px;
    text-align: center;
    position: absolute;
    font-family: 'consolas';
    text-shadow: gray 2px 2px;
}

</style>

<script>
export default {
  name: 'CV',
  data () {
    return {

    }
  }
}

</script>