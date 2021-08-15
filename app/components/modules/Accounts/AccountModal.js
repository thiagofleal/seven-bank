const { ModalComponent, FormComponent } = await SemiReactive.import("utils.js");

class ModalContent extends FormComponent
{
	constructor(parent, service) {
		super({
			title: '',
			editing: false,
			creating: false
		});

		this.parent = parent;
		this.service = service;

		this.id = '';
		this.code = '';
		this.owner = '';
		this.agency = '';
		this.password = '';
		this.confirm = '';

		this.setFieldsControls({
			id: {
				get: () => this.id,
				set: value => this.id = value
			},
			owner: {
				get: () => this.owner,
				set: value => this.owner = value
			},
			code: {
				get: () => this.code,
				set: value => this.code = value
			},
			agency: {
				get: () => this.agency,
				set: value => this.agency = value
			},
			password: {
				get: () => this.password,
				set: value => this.password = value
			},
			confirm: {
				get: () => this.confirm,
				set: value => this.confirm = value
			}
		});

		parent.register({
			setTitle: title => this.setTitle(title),
			setAccount: data => this.setAccount(data),
			editMode: () => this.editMode(),
			createMode: () => this.createMode(),
			viewMode: () => this.viewMode(),
			onClose: () => this.onClose()
		});
	}

	setTitle(title) {
		this.title = title;
	}

	setAccount(data) {
		this.id = data.id || '';
		this.owner = data.owner || '';
		this.code = data.code || '';
		this.agency = data.agency || '';
	}

	viewMode() {
		this.creating = false;
		this.editing = false;
	}

	editMode() {
		this.creating = false;
		this.editing = true;
	}

	createMode() {
		this.editing = false;
		this.creating = true;
	}

	open() {
		this.parent.open();
	}

	onClose() {
		this.password = this.confirm = '';
	}

	close() {
		this.parent.close();
	}

	async save() {
		if (this.password != this.confirm) {
			alert("A senha e a confirmação não conferem");
		} else {
			if (this.creating) {
				const ret = await this.service.createAccount(this.owner, this.password);
				
				if (ret.error) {
					alert(ret.error);
				} else {
					const insert = await this.service.getAccount(ret.id);

					if (insert.error) {
						alert(insert.error);
					} else {
						this.setAccount(insert);
					}
				}
			}
			if (this.editing) {
				const ret = await this.service.editAccount(this.id, this.owner, this.password);

				if (ret.error) {
					alert(ret.error);
				} else {
					const edited = await this.service.getAccount(this.id);

					if (edited.error) {
						alert(edited.error);
					} else {
						this.setAccount(edited);
					}
				}
			}
		}
		this.viewMode();
	}

	edit() {
		this.editMode();
	}

	render() {
		const ownerInput = {
			id: "account-modal-owner",
			class: "form-control",
			disabled: true,
			fieldControlName: "owner"
		};

		if (this.editing || this.creating) {
			delete ownerInput.disabled;
		}

		return `
			<div class="modal-header h-4">
				${ this.title }
			</div>

			<div class="modal-body">
				<form class="container">
					<div class="row form-group">
						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<label for="account-modal-id" class="input-group-text">
									ID
								</label>
							</div>
							${
								this.input({
									id: "account-modal-id",
									class: "form-control",
									disabled: true,
									fieldControlName: "id"
								})
							}
						</div>

						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<label for="account-modal-owner" class="input-group-text">
									Titular
								</label>
							</div>
							${
								this.input(ownerInput)
							}
						</div>

						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<label for="account-modal-code" class="input-group-text">
									Código
								</label>
							</div>
							${
								this.input({
									id: "account-modal-code",
									class: "form-control",
									disabled: true,
									fieldControlName: "code"
								})
							}
						</div>

						<div class="input-group mb-2">
							<div class="input-group-prepend">
								<label for="account-modal-agency" class="input-group-text">
									Agência
								</label>
							</div>
							${
								this.input({
									id: "account-modal-agency",
									class: "form-control",
									disabled: true,
									fieldControlName: "agency"
								})
							}
						</div>

						<div class="${ this.creating || this.editing ? 'd-block' : 'd-none'}">
							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<label for="account-modal-password" class="input-group-text">
										Senha
									</label>
								</div>
								${
									this.input({
										id: "account-modal-password",
										type: "password",
										class: "form-control",
										fieldControlName: "password"
									})
								}
							</div>

							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<label for="account-modal-confirm" class="input-group-text">
										Confirmar
									</label>
								</div>
								${
									this.input({
										id: "account-modal-confirm",
										type: "password",
										class: "form-control",
										fieldControlName: "confirm"
									})
								}
							</div>
						</div>
					</div>
				</form>
			</div>

			<div class="modal-footer">
				<button class="btn btn-primary ${ this.editing || this.creating ? 'd-block' : 'd-none' }" onclick="this.component.save()">
					<span class="fa fa-save"></span>
					Salvar
				</button>

				<button class="btn btn-primary ${ this.editing || this.creating ? 'd-none' : 'd-block' }" onclick="this.component.edit()">
					<span class="fa fa-edit"></span>
					Editar
				</button>

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
	constructor(service) {
		super(ModalContent, service);
	}
}