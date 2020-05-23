import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps
} from "react-router-dom";
import { useMount } from 'react-use'

const routes = [
  {
    path: '/',
    exact: true,
    element: lazy(() => import('./page/Login')),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    exact: true,
    element: lazy(() => import('./page/Home')),
    meta: {
      title: '主页'
    }
  },
  {
    path: '/chapter',
    element: lazy(() => import('./page/Chapter'))
  },
  {
    path: '/stage',
    element: lazy(() => import('./page/Stage'))
  },
  {
    path: '/member',
    element: lazy(() => import('./page/Member'))
  },
  {
    path: '/recruit',
    element: lazy(() => import('./page/Recruit'))
  },
  {
    path: '/gameitem',
    element: lazy(() => import('./page/GameItem'))
  },
  {
    path: '/shop',
    element: lazy(() => import('./page/Shop'))
  },
  {
    path: '/live',
    element: lazy(() => import('./page/Live'))
  }
]

const isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  return flag;
 }

export default function () {
  useMount(() => {
    if (isMobile()) {
      let s = window.innerWidth / 1920
      document.body.style.zoom = s + ''
      let media = document.createElement('link')
      media.rel = 'stylesheet'
      media.href = '/media.css'
      document.body.appendChild(media)
    }
  })
  return (
    <Router>
      <div className="media-tip">
        <p>移动端的同学，请先<mark>旋转屏幕</mark>，再<mark>刷新</mark>，来访问此站。</p>
      </div>
      <Switch>
        {
          routes.map(route => {
            return (
              <Route
                exact={route.exact}
                path={route.path}
                key={route.path}
                render={
                  (props: RouteComponentProps) => (
                    <Suspense fallback={<div>...</div>}>
                      <route.element {...props} />
                    </Suspense>   
                  )
                }
              />
            )
          })
        }
      </Switch>
    </Router>
  );
}
