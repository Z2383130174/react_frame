import { Route, Routes, Navigate } from 'react-router-dom'
import { routerItem } from './router'
interface Props {
  routers: routerItem[]
}
const RouterView: React.FC<Props> = (Props) => {
  const { routers } = Props

  return (
    <Routes>
      {/* element属性就是展示我们当前地址的组件内容 */}
      <Route path="*" element={<Navigate to="/404" />} />
        {
          routers.map(({key, Component, children, path})=>{
            return <Route
              key={key}
              path={path} 
              element={<Component />} >
                {
                  children ? children.map((item)=>{
                    return <Route key={item.key} path={item.path} element={<item.Component />} />
                  }):null
                }
              </Route>
          })
        } 
    </Routes>
   )
}
export default RouterView