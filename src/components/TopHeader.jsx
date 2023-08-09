import React, { useState } from 'react'
import { Layout, theme, Button, Avatar, Dropdown, Space } from 'antd';
const { Header } = Layout;
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
export default function TopHeader(props) {
  // let [collapsed, setCollapsed] = useState(false)
  let {onTopHeaderClick,collapsed} = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menus = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          个人中心
        </a>
      ),
      icon: <UserOutlined />,
      disabled: false,
    }, {
      key: 2,
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          退出登录
        </a>
      ), icon: <UserOutlined />,
    },

  ]
  return (
    <div className='TopHeader'>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onTopHeaderClick(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        > </Button>

        <div style={{ float: 'right', marginRight: "50px", display: 'flex', alignItems: "center" }}>
          <span style={{ marginRight: '15px', fontSize: "16px", fontWeight: "700" }}>欢迎xx登录企商平台 </span>

          <Dropdown menu={{items:menus}} placement='bottomRight'>
            <a onClick={(e) => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} />
            </a>

          </Dropdown>
        
        </div>
      </Header>
    </div>
  )
}
