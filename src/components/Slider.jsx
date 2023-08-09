import React, { useState } from 'react'
import { useHistory, withRouter, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import { UserOutlined } from '@ant-design/icons';
import { asyncRoute } from '../router/Routes'
// console.log(asyncRoute);
function Slider(props) {
  // console.log(props);
  let { collapsed } = props;
  let $router = useHistory();
  let $route = useLocation();
  let logoCSS = { minHeight: "45px", color: "#fff", fontSize: "22px", lineHeight: "40px", textAlign: "center" }
  const onCheckItem = (data) => {
    console.log(data);
    $router.push(data.key);
  }

  let select = $route.pathname;
  const openKeys = ["/" + $route.pathname.split("/")[1]]

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" style={logoCSS}>
        {/* {<UserOutlined />} */}
        uu-react-admin
      </div>
      <Menu
        theme="dark"
        mode="inline"
        // 默认打开submenu  数组，key
        defaultOpenKeys={openKeys}
        // 选中哪个menu-item 绑定是key
        selectedKeys={[select]}
        items={asyncRoute}
        onClick={(e) => onCheckItem(e)}
      />
    </Sider>
  )
}

// export default withRouter(Slider)
export default Slider