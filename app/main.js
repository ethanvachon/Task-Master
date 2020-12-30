import { ListController } from "./Controllers/ListController.js"

class App {

  listController = new ListController()
}

window["app"] = new App();
