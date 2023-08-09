import React, { useState } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Slider from '../../components/Slider'
import TopHeader from '../../components/TopHeader'
import Nopermiasion from './nopermasion/Nopermiasion'    // 没有访问权限
// import Home from './Home/Home'                    // 首页
// import RightList from './right-manager/RightList' // 权限列表
// import RoleList from './right-manager/RoleList'   // 角色列表
// import ShopList from './shop-manager/ShopList'    // 商品列表
// import UserList from './user-manager/UserList'    // 用户列表

import { renderRoute } from '../../router/Routes'


import { Layout,  theme } from 'antd';

const {  Content } = Layout;
import './layout.scss'

export default function ILayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const onTopHeaderClick = (data)=>{
    console.log('top clic run');
    setCollapsed(data)
  }
  return (
    <div className='layout'>
      <Layout>
        <Slider collapsed={collapsed}></Slider>
        <Layout>
          <TopHeader collapsed={collapsed} onTopHeaderClick={onTopHeaderClick}></TopHeader>

          <Content
            style={{
              margin: '20px 12px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer, 
            }}
          >
            <Switch>
              {/* <Route path="/home" component={Home} />
              <Route path="/user-manage/list" component={UserList} />
              <Route path="/right-manage/role/list" component={RoleList} />
              <Route path="/right-manage/right/list" component={RightList} />
              <Route path="/shop/list" component={ShopList}></Route> */}
              {
                renderRoute.map(item=>{
                  return (
                    <Route key={item.key} path={item.key} component={item.component} />
                  )
                })
              }
              <Redirect from="/" to="/home" exact />
              <Route path="*" component={Nopermiasion} />
            </Switch>
          </Content>
        </Layout>
      </Layout>

    </div>
  )
}
