import { generateId } from "../Utils/IdGenerator.js"
import { ProxyState } from "../AppState.js"
export class ListItem {
    constructor(item, index, name, id) {
        this.item = item
        this.id = generateId()
        this.index = index
        this.name = name
        this.ids = id
        this.checked = false
    }

    get Template() {

        return /*html*/`
        <div class="d-flex justify-content-between max-width">
            <input class="form-check-input" type="checkbox" value="" id="${this.id}" onclick="app.listController.listIncrement('${this.id}', ${this.index})">
            <label class="form-check-label sick-font h5" for="defaultCheck1">
                ${this.item}
              
            </label>
                <i class="fas fa-trash text-danger pr-2" onclick="app.listController.deleteListItem(${this.index}, '${this.id}', '${this.name}', '${this.ids}')"></i>
        </div>
        `
    }
}

export class List {
    constructor({ name, color, listItems, id, completed, quantity, index }) {
        this.listItems = listItems || []
        this.name = name
        this.id = id || generateId()
        this.completed = completed || 0
        this.quantity = quantity || 0
        this.color = color
        this.index = index || ProxyState.index
    }

    get Template() {
        return `
        <div class="col-4 d-flex justify-content-center pt-5 ">
                <div class="card " style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        <div class="text-light pb-2" style="background-color:${this.color}">
                            <li class="text-center pt-3 h2 sick-font">${this.name}<i class="far fa-times-circle" onclick="app.listController.deleteList(${this.index})"></i></li>
                            <li class="text-center p-0 sick-font h5"><span id="${this.index}">${this.completed}</span>/<span id="${this.name}">${this.quantity}</span></li>
                        </div>
                        <div class="py-3 pl-5" id="${this.id}">

                        </div>

                        <form class="my-2  pb-2 border-bottom d-flex justify-content-around"
                            onsubmit="app.listController.addListItem(${this.index}, '${this.name}', '${this.id}')">
                            <input type="text" class="no-border" id="item" required>
                            <button type="submit" class="btn btn-outline-success py-1">+</button>
                        </form>
                    </ul>
                </div>
            </div>
        `
    }
}
