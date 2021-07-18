import { Component } from "../../../../js/semi-reactive/core.js";
import { TableComponent } from "../../../../js/semi-reactive/utils.js";
import { adjustDataTables } from "../../../../app/functions.js";

import AccountModal from "./AccountModal.js";
import AccountService from "../../../services/AccountService.js";

class Table extends TableComponent
{
	constructor(parent, service) {
		super("#table-accounts", {
			data: [],
			loading: false
		});

		this.parent = parent;
		this.service = service;

		this.setOption("language", {
			"lengthMenu": "Registros por pagina: _MENU_",
			"zeroRecords": "Nenhum registro encontrado",
			"info": "Pagina _PAGE_ de _PAGES_",
			"infoEmpty": "Não há registros disponíveis",
			"infoFiltered": "(_TOTAL_ resultados encontrados)",
			"search": "Procurar: ",
			"loadingRecords": "Carregando...",
			"processing": "Processando...",
			"paginate": {
				"first": "Primeiro",
				"last": "Último",
				"next": "Próximo",
				"previous": "Anterior"
			}
		});
	}

	async loadData() {
		this.loading = true;
		this.data = await this.service.listAccounts();
		this.loading = false;
	}

	open(id) {
		const row = this.data.find(r => r.id == id);

		if (row) {
			this.parent.openAccount(row);
		} else {
			alert("Não encontrado");
		}
	}

	render() {
		return `
			<div class="${ this.loading ? 'd-none' : 'd-block' }">
				${ this.create({
					id: "table-accounts",
					header: [
						"Conta", "Titular"
					],
					data: this.data,
					fields: {
						code: v => v || "",
						owner: v => v || ""
					},
					tr_classes: 'clickable',
					tr: row => `onclick="this.component.open(${ row.id })"`
				}) }
			</div>

			<div class="${ this.loading ? 'd-block' : 'd-none' }">
				<img class="img-fluid" src="./images/load.grey.gif" />
			</div>
		`;
	}
}

export default class Accounts extends Component
{
	constructor(auth) {
		super();

		this.service = new AccountService(auth);
		this.table = new Table(this, this.service);
		this.modal = new AccountModal(this.service);

		this.appendChild(this.table, "table-accounts");
		this.appendChild(this.modal, "modal-accounts");
	}

	onInit() {
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
						<h5>Gerenciar contas</h5>
						<hr>
						<div>
							<button class="btn btn-secondary" onclick="this.component.newAccount()">
								<span class="fa fa-user-plus"></span>
								Nova conta
							</button>

							<button class="btn btn-secondary float-right" onclick="this.component.loadData()">
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