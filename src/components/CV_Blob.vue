

<template>
<v-hover>
    <div class="cv-container"
    slot-scope="{ hover }"
    :class="`elevation-${hover ? 12 : 2}`"
    @click="router('CV')">
      {{title}}
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
    line-height: 400px;
    text-align: center;
    color: white;
    font-family: 'consolas';
    text-shadow: gray 2px 2px;  
    font-size: 38px;
    font-weight: 300;
}

</style>


<script>
export default {
  name: 'CV_Blob',
  props: ['router','title'],
  data () {
    return {
    }
  }
}

</script>