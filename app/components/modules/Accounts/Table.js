const { TableComponent } = await SemiReactive.import("utils.js");

export default class Table extends TableComponent
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
		$("#div-d-table").css({
			visibility: "hidden"
		});
		this.data = await this.service.listAccounts();
		setTimeout(() => {
			$("#div-d-table").css({
				visibility: "visible"
			});
		}, 1000);
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
		const width = $(window).width();
		this.setOption("scrollY", ($(window).height() - 425) + "px");

		return `
			<div class="${ this.loading ? 'd-none' : 'd-block' }">
				<div id="div-d-table">
					${ this.create({
						id: "table-accounts",
						header: [
							"Conta", "Titular", "Administrador", "Injeção"
						],
						data: this.data,
						fields: {
							code: v => v || "",
							owner: v => v || "",
							admin: v => v ? "Sim" : "Não",
							injection: v => v ? "Sim" : "Não"
						},
						columns: [
							{ width: "200px", visible: true },
							{ width: "auto", visible: true },
							{ width: "10%", visible: width > 425 },
							{ width: "10%", visible: width > 425 }
						],
						classes: "table-sm table-striped table-hover table-info bg-light",
						thead_classes: "bg-info text-light",
						tr_classes: 'clickable',
						tr: row => `onclick="this.component.open(${ row.id })"`
					}) }
				</div>
			</div>

			<div class="${ this.loading ? 'd-block' : 'd-none' } text-center">
				<img class="img-fluid" src="./images/load.grey.gif" />
			</div>
		`;
	}
}