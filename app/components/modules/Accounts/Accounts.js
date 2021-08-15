const { Component } = await SemiReactive.import("core.js");
import { adjustDataTables } from "../../../../app/functions.js";

import Table from "./Table.js";
import AccountModal from "./AccountModal.js";
import AccountService from "../../../services/AccountService.js";

export default class Accounts extends Component
{
	constructor(auth) {
		super();

		this.auth = auth;
		this.service = new AccountService(auth);
		this.table = new Table(this, this.service);
		this.modal = new AccountModal(this.service);

		this.appendChild(this.table, "table-accounts");
		this.appendChild(this.modal, "modal-accounts");
	}

	onSelected() {
		if (!this.auth.hasPermission('ADM_ACC')) {
			window.location.hash = '';
		}
		this.loadData();
	}

	async loadData() {
		await this.table.loadData();
		adjustDataTables();
	}

	openAccount(data) {
		this.modal.setTitle(data.code);
		this.modal.setAccount(data);
		this.modal.viewMode();
		this.modal.open();
	}

	newAccount() {
		this.modal.setTitle("Nova conta");
		this.modal.setAccount({});
		this.modal.createMode();
		this.modal.open();
	}

	render() {
		return `
			<div class="container-fluid p-3 w-100 h-100">
				<div class="row">
					<div class="col">
						<h6>Gerenciar contas</h6>
						<hr>
						<div>
							<button class="btn btn-sm btn-secondary" onclick="this.component.newAccount()">
								<span class="fa fa-user-plus"></span>
								Nova conta
							</button>

							<button class="btn btn-sm btn-secondary float-right" onclick="this.component.loadData()">
								<span class="fa fa-refresh"></span>
							</button>
						<div>
						<hr>
						<table-accounts></table-accounts>
					</div>
				</div>
			</div>

			<modal-accounts data-classes="modal-dialog-centered"></modal-accounts>
		`;
	}
}