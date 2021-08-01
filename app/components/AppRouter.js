import { SimpleRouter } from "../../js/semi-reactive/core.js";

import NotFoundComponent from "./modules/Default/NotFoundComponent.js";
import Home from "./modules/Home/Home.js";
import Transfer from "./modules/Transfer/Transfer.js";
import Accounts from "./modules/Accounts/Accounts.js";

export default class AppRouter extends SimpleRouter
{
	constructor(auth) {
		super();

		const home = new Home(auth);

		this.setRoutes([
			{ path: "", component: home },
			{ path: "home", component: home },
			{ path: "transferir", component: new Transfer(auth) },
			{ path: "contas", component: new Accounts(auth) },
			{ path: "*", component: new NotFoundComponent() }
		]);
	}
}