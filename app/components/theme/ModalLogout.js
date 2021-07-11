import { Component, EventEmitter } from "../../../js/semi-reactive/core.js";
import { ModalComponent } from "../../../js/semi-reactive/utils.js";

class ModalContent extends Component
{
	constructor(parent) {
		super();
		this.parent = parent;
		this.onLogout = new EventEmitter("logout", this);
	}

	registerListener(listener) {
		this.onLogout.then(listener);
	}

	close() {
		this.parent.close();
	}

	logout() {
		this.onLogout.emit();
		this.close();
	}

	render(item) {
		return `
			<div class="modal-header">
				<h4>Confirmação</h4>
			</div>

			<div class="modal-body">
				<div class="container">
					<div class="row">
						<div class="col">
							Deseja realmente sair da sua conta?
						</div>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<button class="btn btn-danger" onClick="this.component.logout()">
					Sim
				</button>

				<button class="btn btn-secondary" onClick="this.component.close()">
					Não
				</button>
			</div>
		`;
	}
}

export default class ModalLogout extends ModalComponent
{
	constructor() {
		super(ModalContent);
	}

	onFirst(item) {
		const content = this.getContent();
		const logout = this.getFunctionAttribute("onLogout", item, "event");
		content.registerListener(logout);
	}
}