<template>
  <div id="app">
    <div class="linkBar">
      <router-link class="map" to="/map">累计确诊</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
  #app{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .map{
   color: #ccc;
   font-size: 20px;
   margin: 0 auto;
  }
  .linkBar{
    margin-top: 50px;
  }
  .router-link-active{
    color: rgb(96, 174, 138);
  }
</style>
