import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入图标样式
// import './styles/icon.less'
//动态设置REM基准值
import 'amfe-flexible'
//导入vant所有组件
import Vant from 'vant';
import 'vant/lib/index.css';

//引入全局样式
import './styles/index.less'

//加载dayjs初始化配置
import './utils/dayjs'

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
