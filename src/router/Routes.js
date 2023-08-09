import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import Nopermiasion from '@/pages/Layout/nopermasion/Nopermiasion'    // 没有访问权限
import Home from '@/pages/Layout/Home/Home'                    // 首页
import RightList from '@/pages/Layout/right-manager/RightList' // 权限列表
import RoleList from '@/pages/Layout/right-manager/RoleList'   // 角色列表
import ShopList from '@/pages/Layout/shop-manager/ShopList'    // 商品列表
import UserList from '@/pages/Layout/user-manager/UserList'    // 用户列表
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
// console.log(Home);
export function deepCopy(data) {
  let res;
  if (!(data instanceof Object) || data.constructor === Function) {
    res = data;
    return res
  }
  if (Array.isArray(data)) {
    res = [];
  }
  if (data.constructor === Object) {
    res = []
  }
  for (let k in data) {
    res[k] = (data[k] instanceof Object) ? deepCopy(data[k]) : data[k]
  }

  return res
}

// 根据身份呢过滤routes方式
export function filterRoutes(arr, role) {
  let res = [];
  // 1：深拷贝arr 为了不修改原数组。
  // let routes = JSON.parse(JSON.stringify(arr));
  let routes = arr;
  if (routes == undefined) {
    return
  }
  for (let i = 0; i < routes.length; i++) {
    // 获取每个路由配置对象
    let route = routes[i];
    // 验证当前role是否可以访问当前路由对象
    let index = route.roles.indexOf(role);
    // console.log(index);
    if (index !== -1) {
      // 当前身份可以访问这个组路由。
      res.push(route);
    }
    if (Array.isArray(route.children)) {
      route.children = filterRoutes(route.children, role)
    }
  }

  return res
}
export let routes = [{
  key: '/home', //key具有唯一性
  // icon: <UserOutlined />,
  label: '首页',
  roles: ['admin', 'editor', 'putong'],
  component: Home,
},
{
  key: '/right-manage',
  // icon: <VideoCameraOutlined />,
  label: '权限管理',
  roles: ['admin', 'editor'],
  children: [{
    key: '/right-manage/right/list',
    // icon: <VideoCameraOutlined />,
    label: '权限列表',
    roles: ['admin'],
    component: RightList
  }, {
    key: '/right-manage/role/list',
    // icon: <VideoCameraOutlined />,
    label: '角色列表',
    roles: ['admin', 'editor'],
    component: RoleList

  },]
},
{
  key: '/shop',
  // icon: <UploadOutlined />,
  label: '商品管理',
  roles: ['admin', 'editor', 'putong'],
  children: [{
    key: '/shop/list',
    // icon: <UploadOutlined />,
    label: '商品列表',
    roles: ['admin', 'editor', 'putong'],
    component: ShopList

  }]
},
{
  key: '/user-manage',
  // icon: <UploadOutlined />,
  label: '用户管理',
  roles: ['admin', 'editor'],
  children: [{
    key: '/user-manage/list',
    // icon: <UploadOutlined />,
    label: '用户列表',
    roles: ['admin', 'editor'],
    component: UserList
  }]
},
]
console.log(routes);
/**
 * roles 
 * 作用：配置，哪些身份可以访问路由页面
 *      没有roles 表示所有身份都可以方式
 * roles:
 *    admin 企业管理
 *    editor 企业普通员工
 *    putong  客户 
 * admin: 可以访问所有路由
 * editor ：/home /shop /user-list /right-manager/role/list
 * puton　：/home /shop
 */


// 测试身份字段动态修改
export let asyncRoute = filterRoutes(deepCopy(routes), 'admin')
/**
 * 数组扁平化处理
 * @param {*} arr 
 * @param {*} key 
 * @returns 
 */
function flatten(arr, key) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let r = arr[i];
    let obj = {};
    for (let k in r) {
      if (k === key) {
        continue
      }
      obj[k] = r[k]
    }
    res.push(obj);
    if (Array.isArray(r[key])) {
      res = res.concat(flatten(r[key]))
    }
  }
  return res
}
/**
 * 1:根据身份过过滤得到数组
 * 2：将数组扁平化
 * 3：过滤没有组件的对象。导出
 */
let flattenAsyncRoute = flatten(asyncRoute, 'children');
console.log(flattenAsyncRoute, '---------------------------');
export let renderRoute = flattenAsyncRoute.filter(item => {
  return item.component
})
