/*
 * @Author: zancun
 * @Date: 2021-12-13 10:53:07
 * @LastEditors: zancun
 * @LastEditTime: 2021-12-13 15:07:24
 * @Description: 
 */
import axios from "axios";
import { message, Spin } from 'antd'
import ReactDOM from "react-dom";

const devBaseURL = `http://10.94.28.99:6788`  //开发环境
const proBaseURL = `http://10.94.28.99:6788`  //生产环境
const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL

const time_out = 5000
const request = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
  timeout: time_out, // 设置超时时间5s
  baseURL: BASE_URL   //根据自己配置的反向代理去设置不同环境的baeUrl
})

//当前请求数量
let requestCount = 0
let isLoading = true  //是否展示loading
// 显示loading
const showLoading = () => {
  let dom = document.createElement('div')
  dom.setAttribute('id', 'loading')
  document.body.appendChild(dom)
  ReactDOM.render(<Spin tip="正在拼命获取数据，请稍后..." size="large"/>, dom);
  requestCount ++
}

// 隐藏loading
const hideLoading = () => {
  requestCount --
  if (requestCount === 0) {
    const dom = document.getElementById('loading')
    if(dom){
      document.body.removeChild(dom)
    }
  }
}

//请求拦截  axios.interceptors.request
//响应拦截  axios.interceptors.response;
request.interceptors.request.use((config: any)=>{
  isLoading = config.isLoading
  if(isLoading){
    showLoading()
  }
  //发送网络请求时，在界面中间显示loading
  //某一些请求要求用户必须携带token，如果没有携带，直接添砖登陆页面
  //对参数做一些序列化操作
  // sessionStorage.setItem("lastname", "Smith");
  // const a=sessionStorage.getItem('token') 
  config.headers = {
    // Authorization:'eyJlbl9uYW1lIjoiWmhhb3poaSBZdSIsIm5hbWUiLkv57mmK3lv5ciLCJhY2Nlc3NfdG9rZW4iOiJ1LVZnMk1TRW13a0RTUVlTNm03ekwxcWYiLCJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9zMy1pbWZpbGUuZmVpc2h1Y2RuLmNvbS9zdGF0aWMtcmVzb3VyY2UvdjEvZDBkMzk1NWYtZTg5ZS00ZWU4LTlkYWYtZGQyMmVkZDA1YTdnfj9pbWFnZV9zaXplPTcyeDcyXHUwMDI2Y3V0X3R5cGU9XHUwMDI2cXVhbGl0eT1cdTAwMjZmb3JtYXQ9aW1hZ2VcdTAwMjZzdGlja2VyX2Zvcm1hdD0ud2VicCIsIm9wZW5faWQiOiJvdV8zMjE0ZjI1MThjZTRhMzNmNTcxNjFhMzRiNTQ0NjBhZiIsInVuaW9uX2lkIjoib25fYWE0ZThmZDBkNmE4Y2RhOTI4NDMyZWY3YTc1MWQwODciLCJleHBpcmVzX2luIjowLCJleHAiOjE2Mzc3NDQ2OTh9'
  }
  return config
}, err=>{
  //请求失败
});


let httpCode = {        //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
}

request.interceptors.response.use(res=>{
  if(isLoading){
    hideLoading()
  }
  return res.data  //返回请求数据真实结果
}, err=>{
  if(isLoading){
    hideLoading()
  }
  //错误码
  if(err && err.response){
    const tips = err.response in httpCode ? httpCode[err.response] : err.response.data.message
    message.error(tips)
  }
})

export default request

