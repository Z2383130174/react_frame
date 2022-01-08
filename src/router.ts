import Details from './pages/Details'
import User from './pages/user/user'
import Order from './pages/user/order'
import Home from './pages/Home'
import Info from './pages/user/userInfo'
import PageNotFound from './pages/PageNotFound'

export interface routerItem {
  key: string,
  title: string,
  path: string,
  path2?: string,
  Component:any,
  index?: boolean,
  children?: routerItem[],
}

export const routers: routerItem[] = [
  {
    key: 'notFound',
    title: '找不到',
    path: '/404',
    Component: PageNotFound
  },
  {
    key: 'Login',
    title: '登陆',
    path: '/',
    Component: Home,
  },
  {
    key: 'home',
    title: '首页',
    path: '/detail',
    Component: Details
  },{
    key: 'user',
    title: '个人信息',
    path: '/user',
    Component: User,
    children: [
      {
        key: 'info',
        title: '姓名',
        path: 'info',
        index: true,
        Component: Info
      },
      {
        key: 'order',
        title: '订单',
        path: 'order',
        Component: Order
      },
    ],
  }
]