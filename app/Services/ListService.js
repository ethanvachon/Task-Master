import { ProxyState } from "../AppState.js"
import { List, ListItem } from "../Models/List.js"

class ListService {
  addListItem(item, index, name, id) {
    ProxyState.lists[index].listItems = [...ProxyState.lists[index].listItems, new ListItem(item, index, name, id)]
    ProxyState.lists[index].quantity++
  }
  addList(newList) {
    ProxyState.lists = [...ProxyState.lists, new List(newList)]
    ProxyState.index++
  }
  listIncrement(id, index) {
    if (document.getElementById(id).checked) {
      ProxyState.lists[index].completed++
      ProxyState.lists[index].listItems.forEach(element => {
        if (element.id == id) {
          element.checked = true
          console.log(element.checked)
        }
      });
    } else {
      ProxyState.lists[index].completed--
      ProxyState.lists[index].listItems.forEach(element => {
        if (element.id == id) {
          element.checked = false
          console.log(element.checked)
        }
      });
    }
  }

  deleteListItem(index, id) {
    ProxyState.lists[index].listItems = ProxyState.lists[index].listItems.filter(item => item.id != id)
    ProxyState.lists[index].quantity--
    if (document.getElementById(id).checked) {
      ProxyState.lists[index].completed--
    }
  }


  deleteList(index) {
    ProxyState.lists.splice(index, 1)
    ProxyState.index--
    for (let i = 0; i < ProxyState.lists.length; i++) {
      if (i >= index) {
        ProxyState.lists[i].index--
        ProxyState.lists[i].listItems.forEach(i => {
          i.index--
        })


      }
    }
  }
}


export const listService = new ListService()