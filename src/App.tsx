import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps
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
  }
]

export default function App () {
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
                  (props:RouteComponentProps) => (
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
