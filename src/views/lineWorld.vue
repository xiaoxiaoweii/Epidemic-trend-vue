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
    text: '全球疫情趋势'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['全球确诊总人数(除中国)', '全球治愈总人数(除中国)', '全球死亡总人数(除中国)', '全球疑似病例总人数(除中国)']
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
      name: '全球确诊总人数(除中国)',
      type: 'line',
      smooth: true,
      stack: '全球确诊总人数(除中国)',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    },
    {
      name: '全球治愈总人数(除中国)',
      type: 'line',
      smooth: true,
      stack: '全球治愈总人数(除中国)',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    },
    {
      name: '全球死亡总人数(除中国)',
      type: 'line',
      smooth: true,
      stack: '全球死亡总人数(除中国)',
      // `````data: [520, 132, 101, 134, 90, 230, 210],`````
      data: []
    },
    {
      name: '全球疑似病例总人数(除中国)',
      type: 'line',
      smooth: true,
      stack: '全球疑似病例总人数(除中国)',
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
          // console.log(data.data);
          // console.log(data.data.historylist);
          const list1 = data.data.otherhistorylist.map(item => {
            return {
              name: item.date,
              // 确诊总数
              certain: item.certain,
              recure: item.recure,
              die: item.die,
              uncertain: item.uncertain
              // cn_susNum: item.cn_susNum,
              // cn_cureNum: item.cn_cureNum,
              // cn_deathNum: item.cn_deathNum,
              // wuhan_conNum: item.wuhan_conNum,
              // wuhan_deathNum: item.wuhan_deathNum,
              // wuhan_cureNum: item.wuhan_cureNum
            };
          })
          console.log(list1);
          // 将数据给到地图
          // 全球确诊总人数
          option.series[0].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.certain
            }
          })
           // 国内疑似总人数
          option.series[1].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.recure
            }
          })
          // 国内治愈总人数
          option.series[2].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.die
            }
          })
          option.series[3].data = list1.slice(0, 30).reverse().map(item => {
            return {
              value: item.uncertain
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
