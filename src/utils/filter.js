import {deepCopy } from './copy'

// 根据身份呢过滤routes方式
export function filterRoutes(arr, role) {
  let res = [];
  // 1：深拷贝arr 为了不修改原数组。
  // let routes = JSON.parse(JSON.stringify(arr));
  let routes = deepCopy(arr);
  if(routes == undefined) {
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
    if(Array.isArray(route.children)){
      route.children = filterRoutes(route.children,role)
    }
  }

  return res
}