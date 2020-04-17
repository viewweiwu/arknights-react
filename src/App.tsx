import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const routes = [
  {
    path: '/home',
    element: lazy(() => import('./Home')),
    meta: {
      name: 1
    }
  }
  // {
  //   path: '/test',
  //   element: lazy(() => import('./Test')),
  //   meta: {
  //     name: 2
  //   }
  // }
]

export default function BasicExample() {
  return (
    <Router>
      <Switch>
        {
          routes.map(route => {
            return (
              <Route
                path={route.path}
                key={route.path}
                render={
                  (props:any) => (
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
