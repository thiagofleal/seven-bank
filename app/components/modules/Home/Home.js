import { Component } from "../../../../js/semi-reactive/core.js";
import { formatMoney, formatDateHour } from "../../../functions.js";

import AccountService from "../../../services/AccountService.js";

export default class Home extends Component
{
	constructor(auth) {
		super({
			owner: '',
			agency: '',
			account: '',
			balance: '0',
			loading: false,
			data: []
		});
		this.auth = auth;
		this.service = new AccountService(auth);
	}

	onInit() {
		this.loadData();
	}

	async loadData() {
		this.loading = true;

		const json = await this.service.getAccount();

		this.owner = json.owner;
		this.agency = json.agency;
		this.account = json.code;
		this.balance = json.balance;
		this.data = await this.service.transfers();
		this.loading = false;
	}

	render() {
		return `
			<div class="container-fluid p-3 h-100">
				<div class="row">
					<div class="col">
						<button class="btn btn-light float-right" onclick="this.component.loadData()">
							<span class="fa fa-refresh"></span>
						</button>

						<div class="${ this.loading ? 'd-none' : 'd-block' }">
							<div class="jumbotron bg-light p-3 text-center">
								<div class="h5">
									${ this.owner }
								</div>
								<div>
									Agência: ${ this.agency }
								</div>
								<div>
									Conta: ${ this.account }
								</div>
								<hr>

								<div class="h6">
									Saldo: G$ ${ this.balance.replace('.', ',') }
								</div>
							</div>

							<div class="card bg-light">
								<div class="card-header">
									<h6>Transferências</h6>
								</div>

								<div class="card-body container-fluid" style="overflow: auto; max-height: 25vh">
									<ul class="list-group list-group-flush bg-light">
									${
										this.data.map(
											t => `
												<li class="list-group-item w-100">
													<div class="row mb-1">
														<div class="col text-${ t.from.id == this.auth.getId() ? 'danger' : 'success' }">
															<span class="fa fa-arrow-circle-${ t.from.id == this.auth.getId() ? 'left' : 'right' }"></span>
															${ t.to.id == this.auth.getId() ? t.from.owner : t.to.owner }
														</div>
													</div>
													
													<div class="row">
														<div class="col h6">
															${ formatMoney(t.value) }
														</div>
													</div>

													<div class="row">
														<div class="col">
															<small>${ formatDateHour(t.at) }</small>
														</div>
													</div>
												</li>
											`
										).join("")
									}
								</div>
							</div>
						</div>

						<div class="${ this.loading ? 'd-block' : 'd-none' }">
							<img class="img-fluid" src="./images/load.grey.gif" />
						</div>
					</div>
				</div>
			</div>
		`;
	}
}