<template>
  <div class="wrap">
      <div>
          <span @click="maskFlag = true">显示遮罩层</span>
      </div>
      <div>卡片2</div>
      <div>
        <Card3 />
      </div>
      <div>
          <Card4 :options="optionsWrap.options" :name="name"></Card4>
          <Card4 :options="optionsWrap.options" :name="obj.name.value"></Card4>
          <template v-for="(item,index) in arr" :key="index" >
              <Card4 :options="optionsWrap.options" :name="item.name.value"></Card4>
          </template>
      </div>
      <div>
        <Card5 />
      </div>
      <div>卡片5</div>
      <div>卡片6</div>
      <div>卡片7</div>
      <button @click="change">修改传递属性的ref的值</button>
      <!-- Teleport将子元素插入到指定元素的里面的最后
            将section元素放到body元素里面的最后
       -->
      <Teleport to="body">
        <section class="mask" v-if="maskFlag" @click="maskFlag = false">
        </section>
      </Teleport>
  </div>
</template>

<script>
// 异步加载组件
import { defineAsyncComponent, h, ref } from 'vue'
import Loading from './componets/loading.vue'
import ErrorC from './componets/error.vue'
import { delay } from '../../utils/todoStorage'

const Card3 = defineAsyncComponent({
    loader: async() => {
        await delay() // 模拟异步延迟
        if(Math.random() < 0.5){ // 模拟加载出错的情况
            throw new Error()
        }
        return import('./componets/card3.vue')
    },
    loadingComponent: Loading, // 加载时的显示的组件
    errorComponent: { // 加载出错时的组件
        render(){
            return h(ErrorC, '出错啦！')
        }
    }
})

// 不配置直接异步加载组件
const Card4 = defineAsyncComponent(()=>import('./componets/card4.vue'))

const Card5 = defineAsyncComponent({
    loader: async() => { // 
        await delay() // 模拟异步延迟
        return import('./componets/card5.vue')
    },
    loadingComponent: Loading,
    errorComponent: {
        render(){
            return h(ErrorC, '出错啦！')
        }
    }
})
export default {
    components: {
        Card3,
        Card4,
        Card5,
    },
    setup(){
        const options = [
            { 
                name: '1',
                value: ref(''),
            },
            { 
                name: '2',
                value: ref(''),
            },
            { 
                name: '3',
                value: ref(''),
            },
        ]
        const maskFlag = ref(false)

        const optionsWrap = {
            options
        }

        const obj = {
            name: ref('我是对象name')
        }
        const name =  ref('我是字符串name')

        const arr = [
            {
                name: ref('我是对象name')
            },
            {
                name: ref('我是对象name2')
            }
        ]

        const change = () => {
            optionsWrap.options.forEach(item=>{
                item.value.value = 6
            })
            console.log('3',options)
        }

        return {
            maskFlag,
            options,
            change,
            optionsWrap,
            obj,
            name,
            arr,
        }
    }
}
</script>

<style scope>
.wrap{
    display: flex;
    width: 500px;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 50px auto 0;
}
.wrap > div{
    width: 100px;
    height: 100px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    border: 1px solid #ccc;
    line-height: 100px;
    margin-bottom: 20px;
}
.mask{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
}
</style>