/*
 * @Author: your name
 * @Date: 2021-12-12 14:02:45
 * @LastEditTime: 2021-12-12 17:52:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /new-employee/src/pages/user/user.tsx
 */
import { Outlet } from "react-router-dom";
import { routerItem } from "../../router";
interface Props {
  route: routerItem[]
}
const User: React.FC<Props> = (Props) => {
  return (
    <div>
      我的信息
        <Outlet />
    </div>
  )
}

export default User