import { ProxyState } from "../AppState.js"
import { listService } from "../Services/ListService.js"
import { saveToLocalStorage } from "../Utils/LocalStorage.js"
import { loadFromLocalStorage } from "../Utils/LocalStorage.js"

export function _drawListItems(index, ids) {
  let template = ''
  let items = ProxyState.lists[index].listItems
  items.forEach(i => {
    template += i.Template
  })
  document.getElementById(ids).innerHTML = template
  document.getElementById(`quan${ProxyState.lists[index].id}`).innerText = ProxyState.lists[index].quantity
  items.forEach(x => {
    if (x.checked == true) {
      document.getElementById(`item${x.id}`).classList.add("completed")

    }
  })
}
function _drawLists() {
  let template = ''
  let lists = ProxyState.lists
  lists.forEach(i => template += i.Template)
  document.getElementById('lists').innerHTML = template
}
function _drawCompleted(index) {
  document.getElementById(index).innerText = ProxyState.lists[index].completed
}

export class ListController {
  constructor() {
    ProxyState.on("lists", _drawLists)
    loadFromLocalStorage()
  }
  deleteList(index) {
    if (window.confirm("Do you really want to delete this list?")) {
      listService.deleteList(index)
      _drawLists()
      for (let i = 0; i < ProxyState.lists.length; i++) {
        _drawListItems(i, ProxyState.lists[i].id)
        ProxyState.lists[i].listItems.forEach(x => {
          if (x.checked == true) {
            document.getElementById(x.id).checked = true
          }
        })
      }
      saveToLocalStorage()
    }
  }
  addListItem(index, name, id) {
    window.event.preventDefault()
    let item = window.event.target['item'].value
    listService.addListItem(item, index, name, id)
    window.event.target.reset()
    _drawListItems(index, id)
    let items = ProxyState.lists[index].listItems
    items.forEach(i => {
      if (i.checked == true) {
        document.getElementById(i.id).checked = true
      }
    })
    saveToLocalStorage()
  }

  addList() {
    window.event.preventDefault()
    let list = window.event.target
    let newList = {
      name: list['list-name'].value,
      color: list['list-color'].value
    }
    list.reset()
    listService.addList(newList)
    for (let i = 0; i < ProxyState.lists.length; i++) {
      _drawListItems(i, ProxyState.lists[i].id)
      ProxyState.lists[i].listItems.forEach(x => {
        if (x.checked == true) {
          document.getElementById(x.id).checked = true
        }
      })
    }
    saveToLocalStorage()
  }

  listIncrement(id, index) {
    listService.listIncrement(id, index)
    _drawCompleted(index)
    saveToLocalStorage()
  }
  deleteListItem(index, id, ids) {
    if (window.confirm("Do you really want to delete this list item?")) {
      listService.deleteListItem(index, id)
      _drawCompleted(index)
      _drawListItems(index, ids)
      let items = ProxyState.lists[index].listItems
      items.forEach(i => {
        if (i.checked == true) {
          document.getElementById(i.id).checked = true
        }
      })
      saveToLocalStorage()
    }
  }
}