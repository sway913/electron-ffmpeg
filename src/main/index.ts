import { app, BrowserWindow } from "electron"
import { electronApp, optimizer } from "@electron-toolkit/utils"
import "@main/plugin/mainModule"
import { createMainWin, createMainWin1 } from "@main/helper"
import { createWindow } from "./container/window"
import { DesktopService } from "./container/desktopService"

const addSubModel = () => {
  setTimeout(async () => {
    await import("@main/plugin/subModule")
  }, 1000)
}

app.whenReady().then(async () => {
  console.log("electron whenReady")
  electronApp.setAppUserModelId("com.electron")
  DesktopService.shared.init()
  // createWindow()
  app.on("browser-window-created", (_, window) => {
    console.log("watchWindowShortcuts created")
    optimizer.watchWindowShortcuts(window)
  })

  createMainWin1().then((win) => {
    win.on("show", addSubModel)
  })
  app.on("activate", async function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWin().then((win) => {
        addSubModel()
      })
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
