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
      let y = 0
      let listItems = []
      i.listItems.forEach(x => {
        listItems = [...listItems, new ListItem(x.item, i.index, x.name, i.id)]
      })
      ProxyState.lists = [...ProxyState.lists, new List({ name: i.name, color: i.color, listItems: listItems, id: i.id, completed: i.completed, quantity: i.quantity, index: i.index })]
      console.log(ProxyState.lists)
      _drawListItems(y, i.id, i.name)
      y++
    })
  }
  if (index) {
    ProxyState.index = index
  }
}