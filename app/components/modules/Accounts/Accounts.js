import { Component } from "../../../../js/semi-reactive/core.js";
import { TableComponent } from "../../../../js/semi-reactive/utils.js";

class Table extends TableComponent
{
	constructor() {
		super("#table-accounts", {
			data: [
				{
					account: "123",
					name: "Teste"
				},
				{
					account: "1234",
					name: "Teste 2"
				}
			]
		});
	}

	open() {
		alert("Não implementado");
	}

	render() {
		return this.create({
			id: "table-accounts",
			header: [
				"Conta", "Titular"
			],
			data: this.data,
			fields: {
				account: v => v || "",
				name: v => v || ""
			},
			tr_classes: 'clickable',
			tr: row => `onclick="this.component.open()"`
		});
	}
}

export default class Accounts extends Component
{
	constructor() {
		super();

		this.table = new Table();

		this.appendChild(this.table, "table-accounts");
	}

	render() {
		return `
			<div class="container-fluid p-5 h-100">
				<div class="row">
					<div class="col">
						<h5>Gerenciar contas</h5>
						<hr>
						<table-accounts></table-accounts>
					</div>
				</div>
			</div>
		`;
	}
}