const { FormComponent, ModalComponent } = await SemiReactive.import("utils.js");

import SetPasswordAlert from "./SetPasswordAlert.js";

class ModalContent extends FormComponent
{
	constructor(parent, service) {
		super();
		this.parent = parent;
		this.service = service;
		this.__currentPass = '';
		this.__newPassword = '';
		this.__confirmPass = '';
		this.alert = new SetPasswordAlert();

		this.setFieldsControls({
			currentPass: {
				get: () => this.__currentPass,
				set: value => this.__currentPass = value
			},
			newPassword: {
				get: () => this.__newPassword,
				set: value => this.__newPassword = value
			},
			confirmPass: {
				get: () => this.__confirmPass,
				set: value => this.__confirmPass = value
			}
		});

		this.appendChild(this.alert, "set-password-alert");
	}

	open() {
		this.parent.open();
	}

	close() {
		this.parent.close();
	}

	async setPassword() {
		if (this.__newPassword == this.__confirmPass) {
			const ret = await this.service.changePassword(this.__currentPass, this.__newPassword);

			if (ret.error) {
				this.alert.showFail(ret.error);
			} else {
				this.alert.showSuccess("Senha alterada");
				this.alert.setOnClose(() => {
					this.close();
					this.alert.setOnClose(() => {});
				})
			}
		} else {
			alert("A senha e a confirmação não conferem");
		}
	}

	render() {
		return `
			<div class="modal-header">
				<div class="h4">
					Alterar senha
				</div>
			</div>

			<div class="modal-body">
				<div class="input-group mb-2">
					<div class="input-group-prepend">
						<label for="change-pass-old" class="input-group-text">
							Senha atual
						</label>
					</div>
					${
						this.input({
							id: "change-pass-old",
							type: "password",
							class: "form-control",
							fieldControlName: "currentPass"
						})
					}
				</div>

				<div class="input-group mb-2">
					<div class="input-group-prepend">
						<label for="change-pass-current" class="input-group-text">
							Nova senha
						</label>
					</div>
					${
						this.input({
							id: "change-pass-current",
							type: "password",
							class: "form-control",
							fieldControlName: "newPassword"
						})
					}
				</div>

				<div class="input-group">
					<div class="input-group-prepend">
						<label for="change-pass-confirm" class="input-group-text">
							Confirmar senha
						</label>
					</div>
					${
						this.input({
							id: "change-pass-confirm",
							type: "password",
							class: "form-control",
							fieldControlName: "confirmPass"
						})
					}
				</div>
			</div>

			<div class="modal-footer">
				<button class="btn btn-primary" onclick="this.component.setPassword()">
					Alterar
				</button>

				<button class="btn btn-secondary" onclick="this.component.close()">
					Cancelar
				</button>
			</div>

			<set-password-alert data-classes="modal-dialog-centered"></set-password-alert>
		`;
	}
}

export default class SetPasswordModal extends ModalComponent
{
	constructor(service) {
		super(ModalContent, service);
	}
}