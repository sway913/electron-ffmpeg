import { BrowserWindow } from "electron"
import { getPreloadPath, getSendEventJS, handleOpenWindow, startDevToolsIfNeed } from "./web"
import { GNBEventBus } from "./event-bus"
import { eventKey } from "../utils/const"

export let mainWindow: BrowserWindow

export function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: getPreloadPath(),
    },
  })

  win.loadURL("http://localhost:5173")

  const handler = (data: any) => {
    win.webContents?.executeJavaScript(getSendEventJS(eventKey, data))
  }
  GNBEventBus.shared.subscribe(handler)

  handleOpenWindow(win.webContents)

  startDevToolsIfNeed(win.webContents)

  mainWindow = win
}
