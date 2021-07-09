import { Component, EventEmitter } from "../../../js/semi-reactive/core.js";

import ModalLogout from "./ModalLogout.js";

export default class Header extends Component
{
	constructor(auth) {
		super({
			username: ''
		});
		this.auth = auth;
		this.onToggle = new EventEmitter('toggle', this);
		this.modal = new ModalLogout();

		this.appendChild(this.modal, "modal-logout");
	}

	onFirst(item) {
		const onToggle = this.getFunctionAttribute("ontoggle", item, "event");
		this.onToggle.then(onToggle);
		this.loadUsername();
	}

	async loadUsername() {
		const user = await this.auth.getUserData();
		this.username = user.name;
	}

	toggleSidebar() {
		this.onToggle.emit();
	}

	logout() {
		this.modal.open();
	}

	onLogout() {
		this.auth.logout();
		window.location.reload();
	}

	render() {
		return `
			<nav class="navbar navbar-light bg-light fixed-top shadow-bottom">
				<div class="container-fluid">
					<a class="navbar-brand" href="#/">
						<button class="btn" onClick="this.component.toggleSidebar()">
							<span class="navbar-toggler-icon"></span>
						</button>
						Seven Bank
					</a>
				</div>
			</nav>

			<modal-logout onLogout="this.component.onLogout()"></modal-logout>
		`;
	}
}