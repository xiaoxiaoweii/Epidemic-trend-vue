<template>
  <div class="root">
    <div id="chart1"></div>
  </div>
</template>

<script>
// 但是在后端的话还是建议使用axios  因为后端上就可以成功获取到axios请求的数据 不会跨域
// 导入jsonp插件
import jsonp from 'jsonp'
// 导入echarts
import echarts from 'echarts'
// 导入中国地图
import 'echarts/map/js/china'
// 导入世界地图
import 'echarts/map/js/world'

const option = {
  title:{
    text:'vue实现疫情地图',
    show:true,
    // x轴居中
    x:'center',
    textStyle:{
      color:'#e74c3c'
    }
  },
  tooltip:{
    //   鼠标移入时的提示信息，  一定要知道的是它和series数据是平级的
    tigger:'item',
    formatter:'地区：{b}<br />感染人口: {c}'
  },
  series:[
//   series配置出来了以后才会有地图显示  所以series是关键
    {
      type:'map',
    //   图标类型
      map:'china',
    //   什么图标
      data:[
        { name:'北京', value:'200'}
      ],
      label:{
        //   设置地图每一个角落的名字
        show:true,
        color:'red'
      },
      itemStyle:{
        borderColor:'blue'
      },
      emphasis:{
        label:{
          color:'#fff',
          fontSize:'10px'
        },
        itemStyle:{
          areaColor:'green'
        }
      }
    }
  ],
  visualMap:{
    //   设置类型为分段类型
    type:'piecewise',
    show:true,
    // 设置不用的段位
    pieces: [
      // 不指定 max，表示 max 为无限大（Infinity）。
      {min: 20000},
      {min: 10000, max: 20000},
      {min: 1000, max: 9999},
      {min: 500, max: 999},
      {min: 100, max: 500},
      {min: 10, max: 99},
      {min: 1, max: 9},
      {value:0}
    ],
    inRange: {
    // 范围所对应的颜色
      color: ['#fff', '#ffaa85', '#ff7b69', '#cc2929', '#FF7F50', '#8c0d0d', '#660208']
    }
  }
}
export default {
  mounted(){
    this.getMsg()
    // this.$http.get('http://www.baidu.com', (res)=>{
    //   console.log(res.data)
    // })
    //   这个是生命周期函数
    this.mycharts = echarts.init(document.getElementById('chart1'))
  },
  data(){
    return {
      mycharts:''
    }
  },
  methods:{
    getMsg(){
      jsonp('http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427', (err, data)=>{
        const list = data.data.list.map((item)=>{
          return {
            name:item.name,
            value:item.value
          }
        })
        option.series[0].data = list
        this.mycharts.setOption(option)
      })
    }  
  }
}
</script>

<style lang="less" scoped>
  .root{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #chart1{
    width: 100vw;
    height: 800px;
    margin-top: 20px;
  }
</style>
