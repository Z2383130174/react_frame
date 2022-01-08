import React from 'react';
import './App.css';
import { routers } from './router'
import RouterView from './routerView';

//在react-router-dom v6中所有的Route需要包含在Routes内
//在react-router-dom v6中新增属性useNavigate，取消了history
//useNavigate是一个function，参数1是一个路径，参数2是配置信息   useNavigate('/path',{state:id})
function App() {
  return (
    <div className="App">
      <RouterView routers={routers}></RouterView>
    </div>
  );
}

export default App;