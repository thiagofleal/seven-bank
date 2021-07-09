import { SimpleRouter } from "../../js/semi-reactive/core.js";

import NotFoundComponent from "./modules/Default/NotFoundComponent.js";
import Home from "./modules/Home/Home.js";

export default class AppRouter extends SimpleRouter
{
	constructor(auth) {
		super();

		this.setRoutes([
			{ path: "", component: new Home(auth) },
			{ path: "home", component: new Home(auth) },
			{ path: "*", component: new NotFoundComponent() }
		]);
	}
}