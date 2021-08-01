import { Component, TextComponent } from "../../../../js/semi-reactive/core.js";
import { FormComponent } from "../../../../js/semi-reactive/utils.js";
import { formatMoney } from "../../../functions.js";

import EnableButton from "./EnableButton.js";
import TransferAlert from "./TransferAlert.js";
import AccountService from "../../../services/AccountService.js";

export default class Transfer extends FormComponent
{
	constructor(auth) {
		super({
			searching: false
		});

		this.code = '';
		this.account = {};
		this.value = '0,00';
		this.auth = auth;
		this.service = new AccountService(auth);

		this.button = new EnableButton();
		this.button.class = "btn btn-secondary btn-block";
		this.button.text = "Transferir";
		this.accountInfo = new TextComponent('');
		this.alert = new TransferAlert();

		this.checkButtonEnable();

		this.appendChild(this.button, 'btn-custom');
		this.appendChild(this.accountInfo, 'account-info');
		this.appendChild(this.alert, 'transfer-alert');

		this.setFieldsControls({
			account: {
				get: () => this.code,
				set: async value => {
					let account = value.replaceAll(/\D/gi, '');
					
					if (account.length >= 7) {
						account = account.substr(0, 6) + '-' + account.substr(6, 1);
					}
					this.code = account;
					this.accountInfo.setText("");

					if (account.length == 8) {
						this.showInfo = true;
						this.searching = true;
						this.account = await this.service.search(this.code);

						if (this.account.owner) {
							this.accountInfo.setText(`
								<h6>Nome: ${ this.account.owner }</h6>
								<h6>Agência: ${ this.account.agency }</h6>
								<h6>Conta: ${ this.account.account }</h6>
							`);
						} else {
							this.accountInfo.setText(`Conta não encontrada`);
						}
						this.searching = false;
					} else {
						this.account = {};
						this.accountInfo.setText('');
					}
					this.checkButtonEnable();
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
					value = value.substr(0, value.length - 2) + '.' + value.substr(value.length - 2, 2);
					this.value = formatMoney(value);
					this.checkButtonEnable();
				}
			}
		});
	}

	onSelected() {
		if (!this.auth.hasPermission('TRANSF')) {
			window.location.hash = '';
		}
	}

	checkButtonEnable() {
		this.button.setEnabled(this.account.id !== undefined && parseFloat(this.value.replace(',', '.')));
	}

	async transfer() {
		const ret = await this.service.transfer(this.account.id, this.value);

		if (ret.error !== undefined) {
			this.alert.showFail(ret.error);
		} else {
			this.alert.showSuccess("Transferência realizada com sucesso");
			document.getElementById('transfer-account').value = '';
			document.getElementById('transfer-value').value = '0,00';
		}
	}

	render() {
		return `
			<div class="p-5 h-100">
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
					<div class="mb-2">
						<account-info></account-info>
					</div>

					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<label class="input-group-text" for="transfer-value">
								Valor
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

					<btn-custom onclick="this.component.transfer()"></btn-custom>
				</div>
			</div>

			<transfer-alert data-classes="modal-dialog-centered"></transfer-alert>
		`;
	}
}