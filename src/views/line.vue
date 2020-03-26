<template>
  <div class="root" style="background:#ECECEC; padding:10px">
    <a-card class="card" title="国内疫情" :bordered="false" style="width: 80%">
      <div>
        <div id="chart1"></div>
      </div>
    </a-card>
  </div>
</template>
<script>
// 但是在后端的话还是建议使用axios  因为后端上就可以成功获取到axios请求的数据 不会跨域
// 导入jsonp插件
import jsonp from 'jsonp';
// 导入echarts
import echarts from 'echarts';

const option = {
  title: {
    text: '国内疫情趋势'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['国内确诊总人数', '国内疑似总人数', '国内治愈总人数', '国内死亡总人数', '武汉确诊总人数', '武汉死亡总人数', '武汉治愈总人数']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '国内确诊总人数',
      type: 'line',
      smooth: true,
      stack: '国内确诊总人数',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    },
    {
      name: '国内疑似总人数',
      type: 'line',
      smooth: true,
      stack: '国内疑似总人数',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    },
    {
      name: '国内治愈总人数',
      type: 'line',
      smooth: true,
      stack: '国内治愈总人数',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    },
    {
      name: '国内死亡总人数',
      type: 'line',
      smooth: true,
      stack: '国内死亡总人数',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    },
    {
      name: '武汉确诊总人数',
      type: 'line',
      smooth: true,
      stack: '武汉确诊总人数',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    },
     {
      name: '武汉死亡总人数',
      type: 'line',
      smooth: true,
      stack: '武汉死亡总人数',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    }, {
      name: '武汉治愈总人数',
      type: 'line',
      smooth: true,
      stack: '武汉治愈总人数',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    }

  ]
};

export default {
  mounted () {
    this.getMsg();
    // this.$http.get('http://www.baidu.com', (res)=>{
    //   console.log(res.data)
    // })
    this.mycharts = echarts.init(document.getElementById('chart1'));
  },
  data () {
    return {
      mycharts: ''
    };
  },
  methods: {
    getMsg () {
      jsonp(
        'http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',
        (err, data) => {
          console.log(data.data);
          console.log(data.data.historylist);
          const list1 = data.data.historylist.map(item => {
            return {
              name: item.date,
              // 确诊总数
              cn_conNum: item.cn_conNum,
              cn_susNum: item.cn_susNum,
              cn_cureNum: item.cn_cureNum,
              cn_deathNum: item.cn_deathNum,
              wuhan_conNum: item.wuhan_conNum,
              wuhan_deathNum: item.wuhan_deathNum,
              wuhan_cureNum: item.wuhan_cureNum
            };
          })
          // console.log(list1);
          // 将数据给到地图
          // 国内确诊总人数
          option.series[0].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.cn_conNum
            }
          })
           // 国内疑似总人数
          option.series[1].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.cn_susNum
            }
          })
          // 国内治愈总人数
          option.series[2].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.cn_cureNum
            }
          })
          option.series[3].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.cn_deathNum
            }
          })
          // 武汉确诊总人数
          option.series[4].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.wuhan_conNum
            }
          })
          // 武汉死亡总人数
          option.series[5].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.wuhan_deathNum
            }
          })
          // 武汉治愈总人数
          option.series[6].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.wuhan_cureNum
            }
          })
          // 横坐标
          option.xAxis.data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.name
            }
          })
          // console.log(option.xAxis.data)
          // console.log(option.series[0].data)
          // 在mounted加载设置
          this.mycharts.setOption(option);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.root {
  display: flex;
  justify-content: center;
  align-items: center;
}
#chart1 {
  width: 100%;
  height: 800px;
  text-align: center;
}
</style>
