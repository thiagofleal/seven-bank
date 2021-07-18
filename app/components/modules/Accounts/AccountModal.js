import { Component } from "../../../../js/semi-reactive/core.js";
import { ModalComponent } from "../../../../js/semi-reactive/utils.js";

class ModalContent extends Component
{
	constructor(parent) {
		super({
			title: ''
		});

		this.parent = parent;

		parent.register({
			setTitle: title => this.setTitle(title)
		});
	}

	setTitle(title) {
		this.title = title;
	}

	open() {
		this.parent.open();
	}

	close() {
		this.parent.close();
	}

	render() {
		return `
			<div class="modal-header">
				${ this.title }
			</div>

			<div class="modal-body">
				...
			</div>

			<div class="modal-footer">
				<button class="btn btn-secondary" onclick="this.component.close()">
					<span class="fa fa-times"></span>
					Fechar
				</button>
			</div>
		`;
	}
}

export default class AccountModal extends ModalComponent
{
	constructor() {
		super(ModalContent);
	}
}