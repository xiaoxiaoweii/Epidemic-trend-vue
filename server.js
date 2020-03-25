const axios = require('axios')

axios.get('http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427').then((res) => { 
    console.log(res.data)
})