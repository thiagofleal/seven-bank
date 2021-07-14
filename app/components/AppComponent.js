import { Component, Switch, EventEmitter } from "../../js/semi-reactive/core.js";

import Header from "./theme/Header.js";
import SideBar from "./theme/SideBar.js";
import ModalLogout from "./theme/ModalLogout.js";
import AppRouter from "./AppRouter.js";

export default class AppComponent extends Component
{
	constructor(auth) {
		super({
			title: "Seven Bank"
		});

		this.auth = auth;
		this.header = new Header(auth);
		this.sidebar = new SideBar(auth);
		this.modal = new ModalLogout();
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

		this.appendChild(
			this.modal,
			"modal-logout"
		)
	}

	onFirst() {
		const items = [];

		if (this.auth.hasPermission('ACC')) {
			items.push({
				id: 'menu-account',
				icon: "fa fa-user",
				title: "Conta",
				href: "#"
			});
		}
		if (this.auth.hasPermission('TRANSF')) {
			items.push({
				id: 'menu-transfer',
				icon: "fa fa-usd",
				title: "Transferir",
				href: "#/transferir"
			});
		}
		if (this.auth.hasPermission('ADM_ACC')) {
			items.push({
				id: 'menu-manage-accounts',
				icon: "fa fa-address-card-o",
				title: "Contas",
				href: "#/contas"
			});
		}
		items.push({
			id: 'menu-exit',
			icon: "fa fa-sign-out",
			title: "Sair"
		});
		
		this.sidebar.menu = items;
	}

	selectMenuItem(event) {
		if (event.data && event.data.id == 'menu-exit') {
			this.modal.open();
		}
	}

	logout() {
		this.auth.logout();
	}

	headerToggle() {
		this.sidebar.toggle();
	}

	render() {
		this.pageTitle(this.title);

		return `
			<d-header onToggle="this.component.headerToggle()"></d-header>
			<d-sidebar onSelect="this.component.selectMenuItem(event)"></d-sidebar>

			<div id="content" class="bg-light">
				<div class="container-fluid">
					<app-page class="card mt-3 mb-3"></app-page>
				</div>
			</div>

			<mdal-logout onLogout="this.component.logout()"></modal-logout>
		`;
	}
}