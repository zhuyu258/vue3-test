import { createApp } from 'vue'
import Route from './router/index.js'
import App from './App.vue'
import 'nprogress/nprogress.css'
// import NProgress from 'nprogress'
import './index.css'
import store from './vuex/index'
import {provideStore} from './vuex/userLoginProvideInject'


// 进度条配置
// NProgress.configure({
//     trickleSpeed: 50, //增长速度

// })

// window.NProgress = NProgress

/*
vue3中不再提供vue构造函数，而是提供一个createApp函数，
并且返回一个vue应用实例(去除了vue2中实例提供的一些方法)，
不再是vue组件实例
*/
const app = createApp(App)
app.use(Route).use(store)
provideStore(app) // provide和inject实现全局数据共享
app.mount('#app')
// 自定义指令
app.directive('highlight', {
    beforeMount(el, binding, vnode) {
      el.style.background = binding.value
    }
})