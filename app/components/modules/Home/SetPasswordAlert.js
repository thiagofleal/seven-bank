import { Component } from "../../../../js/semi-reactive/core.js";
import { ModalComponent } from "../../../../js/semi-reactive/utils.js";

class ModalContent extends Component
{
	constructor(parent) {
		super({
			header: '',
			body: '',
			icon: 'info-circle',
			className: 'btn-secondary'
		});
		this.parent = parent;

		parent.register({
			setHeader: header => this.setHeader(header),
			setBody: body => this.setBody(body),
			setIcon: icon => this.setIcon(icon),
			setBtnClass: className => this.setBtnClass(className),
			showFail: fail => this.showFail(fail),
			showSuccess: message => this.showSuccess(message)
		});
	}

	setHeader(header) {
		this.header = header;
	}

	setBody(body) {
		this.body = body;
	}

	setIcon(icon) {
		this.icon = icon;
	}

	setBtnClass(className) {
		this.className = className;
	}

	showFail(fail) {
		this.setHeader("Falha ao alterar senha");
		this.setIcon("ban");
		this.setBody(fail);
		this.setBtnClass("btn-danger");
		this.open();
	}

	showSuccess(message) {
		this.setHeader("Sucesso");
		this.setIcon("check");
		this.setBody(message);
		this.setBtnClass("btn-success");
		this.open();
	}

	open() {
		this.parent.open();
	}

	close() {
		this.parent.close();
	}

	render() {
		return `
			<div class="modal-header justify-content-center">
				<div class="h5">
					${ this.header }
				</div>
			</div>

			<div class="modal-body text-center">
				<div class="h3">
					<span class="fa fa-${ this.icon }"></span>
				</div>
				${ this.body }
			</div>
			
			<div class="modal-footer justify-content-center">
				<button class="btn ${ this.className }" onclick="this.component.close()">
					<span class="fa fa-check-circle"></span>
					Entendi
				</button>
			</div>
		`
	}
}

export default class SetPasswordAlert extends ModalComponent
{
	constructor() {
		super(ModalContent);
	}
}