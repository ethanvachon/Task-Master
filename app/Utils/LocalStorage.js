import { ProxyState } from "../AppState.js"

export function saveToLocalStorage() {
  window.localStorage.setItem("lists", JSON.stringify(ProxyState.lists))
  window.localStorage.setItem("index", JSON.stringify(ProxyState.index))
}

export function loadFromLocalStorage() {
  let lists = JSON.parse(window)
}