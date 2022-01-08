/*
 * @Author: zancun
 * @Date: 2021-12-12 10:45:35
 * @LastEditors: zancun
 * @LastEditTime: 2021-12-13 16:10:48
 * @Description: 
 */
import { Button } from "antd"
import { Get } from "./service"
import { api } from './service/api'

const Home: React.FC<{}> = () => {
  const { login } = api
  const https= async()=> {
  const result = await Get(login,{booking_id:18},{isLoading:true})
  console.log(result);
  }
  return (
    <div onClick={https}>
      大家好
      <Button type="primary">Primary Button</Button>
    </div>
  )
}
export default Home