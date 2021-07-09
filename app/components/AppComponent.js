import { Component, Switch, EventEmitter } from "../../js/semi-reactive/core.js";

import Header from "./theme/Header.js";
import SideBar from "./theme/SideBar.js";
import AppRouter from "./AppRouter.js";

export default class AppComponent extends Component
{
	constructor(auth) {
		super({
			title: "Seven Bank"
		});

		this.header = new Header(auth);
		this.sidebar = new SideBar(auth);
		this.switch = new Switch();
		this.router = new AppRouter(auth);
		this.onSelect = new EventEmitter('select', this);

		this.appendChild(
			this.header,
			"d-header"
		);

		this.appendChild(
			this.sidebar,
			"d-sidebar"
		);

		this.appendChild(
			this.router,
			"app-page"
		)
	}

	headerToggle() {
		this.sidebar.toggle();
	}

	render() {
		this.pageTitle(this.title);

		return `
			<d-header onToggle="this.component.headerToggle()"></d-header>
			<d-sidebar></d-sidebar>

			<div id="content" class="bg-light">
				<div class="container-fluid">
					<app-page class="card mt-3 mb-3"></app-page>
				</div>
			</div>
		`;
	}
}