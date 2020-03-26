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
// 导入中国地图
import 'echarts/map/js/china';
// 导入江苏地图
import 'echarts/map/js/province/jiangsu';
// 导入世界地图
import 'echarts/map/js/world';

const option = {
  title: {
    // 地图标题
    text: '疫情地图',
    // 是否显示标题
    show: true,
    // 副标题
    subtext: '累计确诊病例数，包含治愈、死亡',
    x: 'center',
    // 标题样式
    textStyle: {
      color: '#e74c3c',
      fontStyle: 'normal',
      fontFamily: 'Microsoft YaHei'
    }
  },
  tooltip: {
    //  鼠标移入时的提示信息、
    // 类型
    tigger: 'item',
    // b 区域名称 c 合并数值 a 系列名称
    formatter: '地区：{b}<br />感染人口: {c}'
  },
  //  对应的数据
  series: [
    {
      //   地图类型
      type: 'map',
      //  地图内容
      map: 'china',
      // 移动位置
      layoutCenter: ['50%', '50%'],
      layoutSize: 650,
      // 地图显示的数据
      data: [{ name: '', value: '' }],
      // 在地图上添加标签 坐标轴指示器的文本标签。
      label: {
        show: true,
        color: '#000000',
        position: 'bottom'
      },
      // 地图区域的多边形 图形样式。
      itemStyle: {
        borderColor: '#b1b1b1'
      },
      // 当前视角的缩放比例比例
      zoom: 0.8,
      // 高亮状态下的地图颜色
      emphasis: {
        label: {
          color: '#000000',
          fontSize: '10px'
        },
        itemStyle: {
          areaColor: '#c7fffd'
        }
      }
    }
  ],
  visualMap: {
    //   设置类型为分段类型
    type: 'piecewise',
    show: true,
    // 设置不用的段位
    pieces: [
      // 不指定 max，表示 max 为无限大（Infinity）。
      { min: 10000 },
      { min: 1000, max: 9999 },
      { min: 100, max: 999 },
      { min: 10, max: 99 },
      { min: 1, max: 9 },
      { value: 0 }
    ],
    inRange: {
      // 范围所对应的颜色
      color: ['#fff', '#ffaa85', '#ff7b69', '#cc2929', '#8c0d0d', '#660208']
    },
    itemWidth: 10,
    itemHeight: 10
  },
  legend: {
    bottom: '500px'
  }
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
          const list = data.data.list.map(item => {
            return {
              name: item.name,
              value: item.value
            };
          });
          console.log(list);
          // 将数据给到地图
          option.series[0].data = list;
          console.log(option.series[0].map);
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
