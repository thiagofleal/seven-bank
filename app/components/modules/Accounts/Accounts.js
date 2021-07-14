import { Component } from "../../../../js/semi-reactive/core.js";

export default class Home extends Component
{
	constructor() {
		super({});
	}

	async onFirst() {
	}

	render() {
		return `
			<div class="container-fluid p-5 h-100">
				<div class="row">
					<div class="col">
						<h5>Gerenciar contas</h5>
						<hr>
						Em breve...
					</div>
				</div>
			</div>
		`;
	}
}