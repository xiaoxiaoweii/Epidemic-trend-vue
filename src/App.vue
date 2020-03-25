<template>
  <div id="app">
    <div class="linkBar">
      <!-- <router-link class="map" to="/map">累计确诊</router-link>
      <router-link class="basicLayout" to="/basicLayout">布局</router-link> -->
    </div>
    <div class="chart">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
  /* #app{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  } */
  #app {
    text-align: center;
  }
  /* .map{
   color: #ccc;
   font-size: 20px;
   margin: 0 auto;
   text-align: center;
  } */
  .linkBar{
    margin-top: 50px;
  }
  .router-link-active{
    color: rgb(96, 174, 138);
  }
</style>
