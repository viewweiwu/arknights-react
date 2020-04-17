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
    path: '/',
    element: lazy(() => import('./page/Home')),
    meta: {
      title: '主页'
    }
  }
]

export default function App () {
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
