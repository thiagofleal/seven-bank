import { SimpleRouter } from "../../js/semi-reactive/core.js";

import NotFoundComponent from "./modules/Default/NotFoundComponent.js";
import Home from "./modules/Home/Home.js";
import Transfer from "./modules/Transfer/Transfer.js";
import Accounts from "./modules/Accounts/Accounts.js";

export default class AppRouter extends SimpleRouter
{
	constructor(auth) {
		super();

		this.setRoutes([
			{ path: "", component: new Home(auth) },
			{ path: "home", component: new Home(auth) },
			{ path: "transferir", component: new Transfer(auth) },
			{ path: "contas", component: new Accounts(auth) },
			{ path: "*", component: new NotFoundComponent() }
		]);
	}

	initApp() {
		this.getAllComponents().forEach(c => {
			if (c.onInit) {
				c.onInit();
			}
		});
	}
}