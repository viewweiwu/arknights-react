import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps
} from "react-router-dom";
import Dust from './components/Dust'

const routes = [
  {
    path: '/home',
    element: lazy(() => import('./page/Home')),
    meta: {
      title: '主页'
    }
  }
]

export default function BasicExample() {
  return (
    <Router>
      <Dust />
      <Switch>
        {
          routes.map(route => {
            return (
              <Route
                path={route.path}
                key={route.path}
                render={
                  (props:RouteComponentProps) => (
                    <Suspense fallback={<div>...</div>}>
                      <route.element {...props} meta={route.meta} />
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
