<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>
        <div class="map">
          <Map />
          <Lines />
        </div>
      </a-layout-content>
      <a-layout-footer>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import Map from '../views/map'
import Lines from '../views/line'
export default {
  components: {
    Map,
    Lines
  }
}
</script>
<style>
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.map {
  width: 90%;
}
.MultipleXAxes {
  width: 40%;
}
</style>
