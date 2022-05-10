//
import Axios from "axios";

const request = Axios.create({
  // 本地测试环境
  baseURL:"http://localhost:8800",
  //  线上环境
  // baseURL: "",
  // 请求超时
  timeout: 5000
})

//请求拦截器
request.interceptors.request.use((config) => {
  return config
})

//响应拦截器
request.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  return err
})

export default request