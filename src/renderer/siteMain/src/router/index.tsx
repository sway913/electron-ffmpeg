import React, { useEffect } from "react"
import { lazy, Suspense } from "react"
import { Routes, Route, HashRouter, Navigate } from "react-router-dom"
import AppLoading from "@renderer/components/AppLoading"
import { ROUTERS } from "./ROUTERS"
import Nav from "@siteMain/components/Nav"
import AppHeader from "@siteMain/components/AppHeader"
import KeepAlive from "@renderer/components/KeepAlive"
import "./index.module.less"
import Home from "@siteMain/pages/Home"
import Transcode from "@siteMain/pages/Transcode"
import Setting from "@siteMain/pages/Setting"


export default function BaseRouter() {
  return (
    <HashRouter>
      <Nav />
      <div styleName="container">
        <AppHeader />
        <div styleName="content">
          <Routes>
            <Route path={"/"} element={<KeepAlive />}>
              <Route path={ROUTERS.HOME} element={<Home />} />
              <Route path={ROUTERS.TRANSCODE} element={<Transcode />} />
              <Route path={ROUTERS.SETTING} element={<Setting />} />
            </Route>
            {/* 通配符路由处理不匹配的情况 */}
            <Route path="*" element={<Navigate to={ROUTERS.HOME} replace />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
