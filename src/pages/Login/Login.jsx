import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

const onFinish = (values) => {
  console.log('Success', values);
  window.localStorage.setItem('token', '123');
  window.location.href = '/home';
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed', errorInfo);
}

// antd 自定义验证
const valName = (res, val) => {
  if (val == undefined || val.trim() === '') {
    return Promise.reject(new Error('用户名不能为空'))
  }
  let reg = /^[\w]{3,10}$/
  if (!reg.test(val)) {
    return Promise.reject(new Error('请输入3-10数字或字母'))
  }
  return Promise.resolve('验证成功')
}

const valPad = (res, val) => {
  if (val == undefined || val.trim() === '') {
    return Promise.reject(new Error('密码不能为空'))
  }
  let reg = /^[\w]{3,10}$/
  if (!reg.test(val)) {
    return Promise.reject(new Error('请输入3-10数字或字母'))
  }
  return Promise.resolve('验证成功')
}

export default function Login() {
  return (
    <div>
      {/* <button onClick={()=>window.localStorage.setItem('token','safs')}>登录</button> */}

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              validator: valName,
              // max min required validator pattern ...
              // massage 是验证不通过的提示信息
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"  // onFinish 设置 成功时的key名字
          rules={[
            {
              validator: valPad,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
