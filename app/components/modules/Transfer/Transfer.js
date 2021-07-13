import { FormComponent } from "../../../../js/semi-reactive/utils.js";

import AccountService from "../../../services/AccountService.js";

export default class Transfer extends FormComponent
{
	constructor(auth) {
		super({
			searching: false
		});

		this.code = '';
		this.account = {};
		this.value = '';
		this.service = new AccountService(auth);

		this.setFieldsControls({
			account: {
				get: () => this.code,
				set: async value => {
					let account = value.replaceAll(/\D/gi, '');
					
					if (account.length >= 7) {
						account = account.substr(0, 6) + '-' + account.substr(6, 1);
					}
					this.code = account;

					if (account.length == 8) {
						this.searching = true;
						this.account = await this.service.search(this.code);
						this.searching = false;
					}
				}
			},
			value: {
				get: () => this.value,
				set: value => {
					value = value.replaceAll(/\D/gi, '');

					while (/^0/gi.test(value)) {
						value = value.substr(1);
					}
					
					if (value.length == 0) {
						value = '000';
					}
					if (value.length == 1) {
						value = '00' + value;
					}
					if (value.length == 2) {
						value = '0' + value;
					}
					value = value.substr(0, value.length - 2) + ',' + value.substr(value.length - 2, 2);
					this.value = value;
				}
			}
		});
	}

	btnEnabled() {
		return this.account.id !== undefined;
	}

	async transfer() {
		const ret = await this.service.transfer(this.account.id, this.value);

		if (ret.error !== undefined) {
			alert(ret.error);
		} else {
			alert("Transferência realizada com sucesso");
		}
	}

	render() {
		return `
			<div class="p-5 h-100 text-center">
				<h4>Transferir</h4>
				<hr>
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<label class="input-group-text" for="transfer-account">
							Conta
						</label>
					</div>
					${
						this.input({
							type: 'text',
							id: 'transfer-account',
							class: 'form-control',
							fieldControlName: 'account'
						})
					}
				</div>

				<div class="${ this.searching ? 'd-block' : 'd-none' }">
					<img class="img-fluid" src="./images/load.grey.gif" />
				</div>

				<div class="${ this.searching ? 'd-none' : 'd-block' }">
					<div class="${ this.account.owner ? 'd-block' : 'd-none' }">
						<h6>Nome: ${ this.account.owner }</h6>
						<h6>Agência: ${ this.account.agency }</h6>
						<h6>Conta: ${ this.account.account }</h6>
					</div>

					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<label class="input-group-text" for="transfer-value">
								Valor (G$)
							</label>
						</div>
						${
							this.input({
								type: 'text',
								id: 'transfer-value',
								class: 'form-control',
								fieldControlName: 'value'
							})
						}
					</div>

					<button class="btn btn-secondary btn-block" ${ this.btnEnabled() ? '' : 'disabled="disabled"' } onclick="this.component.transfer()">
						Transferir
					</button>
				</div>
			</div>
		`;
	}
}