const { Component } = await SemiReactive.import("core.js");
import { formatMoney, formatDateHour } from "../../../functions.js";

import SetPasswordModal from "./SetPasswordModal.js";
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
			transfers: []
		});
		this.auth = auth;
		this.service = new AccountService(auth);
		this.changePass = new SetPasswordModal(this.service);

		this.appendChild(this.changePass, "change-password");
	}

	onSelected() {
		if (!this.auth.hasPermission('ACC')) {
			window.location.hash = '';
		}
		this.loadData();
	}

	setPassword() {
		this.changePass.open();
	}

	async loadData() {
		this.loading = true;

		const json = await this.service.getAccount();

		this.owner = json.owner;
		this.agency = json.agency;
		this.account = json.code;
		this.balance = json.balance;
		this.transfers = await this.service.transfers();
		this.loading = false;
	}

	render() {
		return `
			<div class="container-fluid p-3" style="height: calc(100vh - 125px)">
				<div class="row mb-2 ${ this.loading ? 'd-none' : 'd-block' }" style="100px">
					<div class="col">
						<button class="btn btn-info" onclick="this.component.setPassword()">
							<span class="fa fa-key"></span>
							Alterar senha
						</button>

						<button class="btn btn-info float-right" onclick="this.component.loadData()">
							<span class="fa fa-refresh"></span>
						</button>
					</div>
				</div>

				<div class="row mb-2 ${ this.loading ? 'd-none' : 'd-block' }" style="height: calc(70vh - 225px)">
					<div class="col">
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

							<div class="h6" style="overflow: auto; height: 5vh">
								Saldo: G$ ${ formatMoney(this.balance) }
							</div>
						</div>
					</div>
				</div>

				<div class="row ${ this.loading ? 'd-none' : 'd-block' }" style="height: 30vh">
					<div class="col">
						<div class="card text-center card-info">
							<div class="card-header">
								<h6>Transferências</h6>
							</div>

							<div class="card-body container-fluid" style="overflow: auto; max-height: 25vh">
								<ul class="list-group list-group-flush">
								${
									this.transfers.length
										? this.transfers.map(
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
										: `
											<li class="list-group-item">
												Nenhuma transferência realizada
											</li>
										`
								}
							</div>
						</div>
					</div>
				</div>

				<div class="${ this.loading ? 'd-block' : 'd-none' } text-center">
					<img class="img-fluid" src="./images/load.grey.gif" />
				</div>
			</div>

			<change-password></change-password>
		`;
	}
}