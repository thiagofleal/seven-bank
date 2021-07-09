import { Component } from "../../../../js/semi-reactive/core.js";

import AccountService from "../../../services/AccountService.js";

export default class Home extends Component
{
	constructor(auth) {
		super({
			owner: '',
			balance: '0'
		});
		this.service = new AccountService(auth);
	}

	async onFirst() {
		const json = await this.service.getAccount();

		this.owner = json.owner_name;
		this.balance = json.balance;
	}

	render() {
		return `
			<div class="container-fluid p-5 h-100">
				<div class="row">
					<div class="col">
						<div class="h4">
							${ this.owner }
						</div>
						<hr>

						<div class="h5">
							Saldo: G$ ${ this.balance.replace('.', ',') }
						</div>
					</div>
				</div>
			</div>
		`;
	}
}