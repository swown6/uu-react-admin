import React from 'react'
import { HashRouter,Route,Redirect,Switch } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Layout from '../pages/Layout/Layout'
import Nopermiasion from '../pages/Layout/nopermasion/Nopermiasion'
// import Home from '../pages/Layout/Home/Home'
// import RightList from '../pages/Layout/right-manager/RightList'
// import ShopList from '../pages/Layout/shop-manager/ShopList'
// import UserList from '../pages/Layout/user-manager/UserList'

export default function Router() {
  return (
    <div>
        <HashRouter>
            {/* 注册路由组件：根据页面 */}
            {/* 
            cms管理系统：
            一级路由；两个页面：
             1：登录页面
             2：主要布局页面 （登录后才能访问）
            
            */}
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/" render={()=>{
                let token  =  window.localStorage.getItem("token");
                if(!token) {
                  return <Redirect to='/login' />
                }
                return <Layout />
              }}></Route>
            </Switch>
        </HashRouter>
    </div>
  )
}
