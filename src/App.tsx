import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
  Redirect
} from "react-router-dom";

const routes = [
  {
    path: '/',
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

export default function () {
  return (
    <Router>
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
