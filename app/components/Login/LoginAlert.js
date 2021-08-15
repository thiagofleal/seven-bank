const { Component } = await SemiReactive.import("core.js");
const { ModalComponent } = await SemiReactive.import("utils.js");

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
			setBtnClass: className => this.setBtnClass(className)
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

export default class LoginAlert extends ModalComponent
{
	constructor() {
		super(ModalContent);
	}
}