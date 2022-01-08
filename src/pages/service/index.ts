import request from "./request"

/*
 * @Author: zancun
 * @Date: 2021-12-12 18:33:39
 * @LastEditors: zancun
 * @LastEditTime: 2021-12-13 14:04:44
 * @Description: 
 */


// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
request.defaults.headers.post['Content-Type'] = 'application/json'

/* 统一封装get请求 */
export const Get = (url: any, params: any, config = {}) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url: any, data: any, config = {}) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}