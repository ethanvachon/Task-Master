import { ProxyState } from "../AppState.js"
import { List } from "../Models/List.js"
import { ListItem } from "../Models/List.js"
import { _drawListItems } from "../Controllers/ListController.js"
export function saveToLocalStorage() {
  window.localStorage.setItem("lists", JSON.stringify(ProxyState.lists))
  window.localStorage.setItem("index", JSON.stringify(ProxyState.index))
}

export function loadFromLocalStorage() {
  let lists = JSON.parse(window.localStorage.getItem("lists"))
  let index = JSON.parse(window.localStorage.getItem("index"))
  if (lists) {
    lists.forEach(i => {
      let listItems = []
      i.listItems.forEach(x => {
        listItems = [...listItems, new ListItem(x.item, i.index, x.name, i.id, x.checked)]

      })
      ProxyState.lists = [...ProxyState.lists, new List({ name: i.name, color: i.color, listItems: listItems, id: i.id, completed: i.completed, quantity: i.quantity, index: i.index })]

      for (let y = 0; y < ProxyState.lists.length; y++) {
        _drawListItems(y, ProxyState.lists[y].id, i.name)
      }
      console.log(ProxyState.lists)
    })
    for (let i = 0; i < ProxyState.lists.length; i++) {
      ProxyState.lists[i].listItems.forEach(x => {
        if (x.checked == true) {
          document.getElementById(x.id).checked = true
        }
      })
    }
  }
  if (index) {
    ProxyState.index = index
  }
}