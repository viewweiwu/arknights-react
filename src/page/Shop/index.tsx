import React, { useState, lazy, LazyExoticComponent, Suspense } from 'react'
import { useHistory, Redirect } from 'react-router'

import {
  Switch,
  Route,
  RouteComponentProps
} from 'react-router-dom'

import './shop.less'

interface TabItem {
  id: string,
  path: string
  name: string,
  icon: string,
  element: LazyExoticComponent<any>
}

const tabs: Array<TabItem> = [
  {
    id: '1',
    path: '/shop/featured',
    name: '可露希尔的推荐',
    icon: 'good',
    element: lazy(() => import('./ShopFeatured'))
  },
  {
    id: '2',
    path: '/shop/stone',
    name: '源石交易所',
    icon: 'stone',
    element: lazy(() => import('./ShopStone'))
  },
  {
    id: '3',
    path: '/shop/package',
    name: '组合包',
    icon: 'package',
    element: lazy(() => import('./ShopPackage'))
  },
  {
    id: '4',
    path: '/shop/fashion',
    name: '时装商店',
    icon: 'hanger',
    element: lazy(() => import('./ShopFashion'))
  },
  {
    id: '5',
    path: '/shop/voucher',
    name: '凭证交易所',
    icon: 'voucher',
    element: lazy(() => import('./ShopVoucher'))
  },
  {
    id: '6',
    path: '/shop/featured',
    name: '家具商店',
    icon: 'furniture',
    element: lazy(() => import('./ShopFeatured'))
  },
  {
    id: '7',
    path: '/shop/credit',
    name: '信用交易所',
    icon: 'money',
    element: lazy(() => import('./ShopCredit'))
  }
]

export default function () {
  const [active, setActive] = useState<string>('1')
  const history = useHistory()
  
  const changeTab = (tab: TabItem) => {
    history.replace(tab.path)
    setActive(tab.id)
  }

  return (
    <div className="shop">
      <Redirect from="/shop" to="/shop/featured" />
      <div className="tool">
        <button className="tool-item btn" onClick={() => history.goBack()}>
          <i className="iconfont icon-back"></i>
        </button>
      </div>
      <header className="shop-header">
        <div className="shop-tab">
          {
            tabs.map((tab: TabItem) => {
              return <div className={`shop-tab-item ${tab.id === active && 'active'}`} onClick={() => changeTab(tab)} key={tab.id}>
                <i className={`iconfont icon-${tab.icon}`}></i>
                <span className="item-name">{tab.name}</span>
              </div>
            })
          }
        </div>
      </header>
      <article className="shop-body">
        <Switch>
          {
            tabs.map(route => {
              return (
                <Route
                  path={route.path}
                  key={route.path}
                  render={
                    (props: RouteComponentProps) => (
                      <Suspense fallback={<div>...</div>}>
                        <route.element />
                      </Suspense>   
                    )
                  }
                />
              )
            })
          }
        </Switch>
      </article>
    </div>
  )
}