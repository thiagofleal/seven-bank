import { Switch } from "./../../js/semi-reactive/core.js";

import AppComponent from "./AppComponent.js";
import Login from "./Login.js";
import Loading from "./Loading.js";

import AuthService from "./../services/AuthService.js";

export default class Controller extends Switch
{
	constructor() {
		super();

		const auth = new AuthService(() => this.selectComponent());
		const login = new Login(auth);

		login.addEventListener('login', () => this.selectComponent());

		this.setComponent("app", new AppComponent(auth));
		this.setComponent("login", login);
		this.setComponent("load", new Loading());

		this.auth = auth;
		this.selectComponent();
	}

	selectComponent() {
		this.select("load");

		const saved = this.auth.savedLogin();
		
		if (saved !== false) {
			const app = this.getComponent("app");
			app.onSelect.emit();
			return this.select("app");
		}
		const login = this.getComponent("login");
		login.onSelect.emit();
		this.select("login");
	}
}