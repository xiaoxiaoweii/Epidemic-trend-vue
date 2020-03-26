<template>
  <div class="root" style="background:#ECECEC; padding:10px">
    <a-card class="card" :bordered="false" style="width: 80%">
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
/* eslint-disable */
const nameMap = {
  'Singapore Rep.': '新加坡',
  'Dominican Rep.': '多米尼加',
  'Palestine': '巴勒斯坦',
  'Bahamas': '巴哈马',
  'Timor-Leste': '东帝汶',
  'Afghanistan': '阿富汗',
  'Guinea-Bissau': '几内亚比绍',
  "Côte d'Ivoire": '科特迪瓦',
  'Siachen Glacier': '锡亚琴冰川',
  "Br. Indian Ocean Ter.": '英属印度洋领土',
  'Angola': '安哥拉',
  'Albania': '阿尔巴尼亚',
  'United Arab Emirates': '阿联酋',
  'Argentina': '阿根廷',
  'Armenia': '亚美尼亚',
  'French Southern and Antarctic Lands': '法属南半球和南极领地',
  'Australia': '澳大利亚',
  'Austria': '奥地利',
  'Azerbaijan': '阿塞拜疆',
  'Burundi': '布隆迪',
  'Belgium': '比利时',
  'Benin': '贝宁',
  'Burkina Faso': '布基纳法索',
  'Bangladesh': '孟加拉国',
  'Bulgaria': '保加利亚',
  'The Bahamas': '巴哈马',
  'Bosnia and Herz.': '波斯尼亚和黑塞哥维那',
  'Belarus': '白俄罗斯',
  'Belize': '伯利兹',
  'Bermuda': '百慕大',
  'Bolivia': '玻利维亚',
  'Brazil': '巴西',
  'Brunei': '文莱',
  'Bhutan': '不丹',
  'Botswana': '博茨瓦纳',
  'Central African Rep.': '中非',
  'Canada': '加拿大',
  'Switzerland': '瑞士',
  'Chile': '智利',
  'China': '中国',
  'Ivory Coast': '象牙海岸',
  'Cameroon': '喀麦隆',
  'Dem. Rep. Congo': '刚果民主共和国',
  'Congo': '刚果',
  'Colombia': '哥伦比亚',
  'Costa Rica': '哥斯达黎加',
  'Cuba': '古巴',
  'N. Cyprus': '北塞浦路斯',
  'Cyprus': '塞浦路斯',
  'Czech Rep.': '捷克',
  'Germany': '德国',
  'Djibouti': '吉布提',
  'Denmark': '丹麦',
  'Algeria': '阿尔及利亚',
  'Ecuador': '厄瓜多尔',
  'Egypt': '埃及',
  'Eritrea': '厄立特里亚',
  'Spain': '西班牙',
  'Estonia': '爱沙尼亚',
  'Ethiopia': '埃塞俄比亚',
  'Finland': '芬兰',
  'Fiji': '斐',
  'Falkland Islands': '福克兰群岛',
  'France': '法国',
  'Gabon': '加蓬',
  'United Kingdom': '英国',
  'Georgia': '格鲁吉亚',
  'Ghana': '加纳',
  'Guinea': '几内亚',
  'Gambia': '冈比亚',
  'Guinea Bissau': '几内亚比绍',
  'Eq. Guinea': '赤道几内亚',
  'Greece': '希腊',
  'Greenland': '格陵兰',
  'Guatemala': '危地马拉',
  'French Guiana': '法属圭亚那',
  'Guyana': '圭亚那',
  'Honduras': '洪都拉斯',
  'Croatia': '克罗地亚',
  'Haiti': '海地',
  'Hungary': '匈牙利',
  'Indonesia': '印度尼西亚',
  'India': '印度',
  'Ireland': '爱尔兰',
  'Iran': '伊朗',
  'Iraq': '伊拉克',
  'Iceland': '冰岛',
  'Israel': '以色列',
  'Italy': '意大利',
  'Jamaica': '牙买加',
  'Jordan': '约旦',
  'Japan': '日本',
  'Kazakhstan': '哈萨克斯坦',
  'Kenya': '肯尼亚',
  'Kyrgyzstan': '吉尔吉斯斯坦',
  'Cambodia': '柬埔寨',
  'Korea': '韩国',
  'Kosovo': '科索沃',
  'Kuwait': '科威特',
  'Lao PDR': '老挝',
  'Lebanon': '黎巴嫩',
  'Liberia': '利比里亚',
  'Libya': '利比亚',
  'Sri Lanka': '斯里兰卡',
  'Lesotho': '莱索托',
  'Lithuania': '立陶宛',
  'Luxembourg': '卢森堡',
  'Latvia': '拉脱维亚',
  'Morocco': '摩洛哥',
  'Moldova': '摩尔多瓦',
  'Madagascar': '马达加斯加',
  'Mexico': '墨西哥',
  'Macedonia': '马其顿',
  'Mali': '马里',
  'Myanmar': '缅甸',
  'Montenegro': '黑山',
  'Mongolia': '蒙古',
  'Mozambique': '莫桑比克',
  'Mauritania': '毛里塔尼亚',
  'Malawi': '马拉维',
  'Malaysia': '马来西亚',
  'Namibia': '纳米比亚',
  'New Caledonia': '新喀里多尼亚',
  'Niger': '尼日尔',
  'Nigeria': '尼日利亚',
  'Nicaragua': '尼加拉瓜',
  'Netherlands': '荷兰',
  'Norway': '挪威',
  'Nepal': '尼泊尔',
  'New Zealand': '新西兰',
  'Oman': '阿曼',
  'Pakistan': '巴基斯坦',
  'Panama': '巴拿马',
  'Peru': '秘鲁',
  'Philippines': '菲律宾',
  'Papua New Guinea': '巴布亚新几内亚',
  'Poland': '波兰',
  'Puerto Rico': '波多黎各',
  'Dem. Rep. Korea': '朝鲜',
  'Portugal': '葡萄牙',
  'Paraguay': '巴拉圭',
  'Qatar': '卡塔尔',
  'Romania': '罗马尼亚',
  'Russia': '俄罗斯',
  'Rwanda': '卢旺达',
  'W. Sahara': '西撒哈拉',
  'Saudi Arabia': '沙特阿拉伯',
  'Sudan': '苏丹',
  'S. Sudan': '南苏丹',
  'Senegal': '塞内加尔',
  'Solomon Is.': '所罗门群岛',
  'Sierra Leone': '塞拉利昂',
  'El Salvador': '萨尔瓦多',
  'Somaliland': '索马里兰',
  'Somalia': '索马里',
  'Serbia': '塞尔维亚',
  'Suriname': '苏里南',
  'Slovakia': '斯洛伐克',
  'Slovenia': '斯洛文尼亚',
  'Sweden': '瑞典',
  'Swaziland': '斯威士兰',
  'Syria': '叙利亚',
  'Chad': '乍得',
  'Togo': '多哥',
  'Thailand': '泰国',
  'Tajikistan': '塔吉克斯坦',
  'Turkmenistan': '土库曼斯坦',
  'East Timor': '东帝汶',
  'Trinidad and Tobago': '特里尼达和多巴哥',
  'Tunisia': '突尼斯',
  'Turkey': '土耳其',
  'Tanzania': '坦桑尼亚',
  'Uganda': '乌干达',
  'Ukraine': '乌克兰',
  'Uruguay': '乌拉圭',
  'United States': '美国',
  'Uzbekistan': '乌兹别克斯坦',
  'Venezuela': '委内瑞拉',
  'Vietnam': '越南',
  'Vanuatu': '瓦努阿图',
  'West Bank': '西岸',
  'Yemen': '也门',
  'South Africa': '南非',
  'Zambia': '赞比亚',
  'Zimbabwe': '津巴布韦',
  'Comoros': '科摩罗'
}
/* eslint-disable */
const option = {
  title: {
    // 地图标题
    text: '全球疫情',
    // 是否显示标题
    show: true,
    // 副标题
    top: 20,
    subtext: '累计确诊病例数，包含治愈、死亡',
    x: 'center',
    // 标题样式
    textStyle: {
      color: '#e74c3c',
      fontStyle: 'normal',
      fontFamily: 'Microsoft YaHei'
    }
  },
  nameMap: nameMap,
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
      map: 'world',
      // 移动位置
      layoutCenter: ['50%', '40%'],
      layoutSize: 650,
      // 地图显示的数据
      data: [{ name: '', value: '' }],
      // 在地图上添加标签 坐标轴指示器的文本标签。
      label: {
        show: false,
        color: '#000000',
        position: 'top'
      },
      // 地图区域的多边形 图形样式。
      itemStyle: {
        borderColor: '#b1b1b1'
      },
      // 当前视角的缩放比例比例
      zoom: 1,
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
    itemHeight: 10,
    bottom: 150,
    left: 300

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
      mycharts: '',
      nameMap: ''
    };
  },
  methods: {
    getMsg () {
      jsonp(
        'http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',
        (err, data) => {
          // console.log(data.data);
          const list = data.data.worldlist.map(item => {
            return {
              name: item.name,
              value: item.value
            };
          });
          // console.log(list);
          // 将数据给到地图
          option.series[0].data = list;
          // console.log(option.series[0]);
          // console.log(option.series[0].map);
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
