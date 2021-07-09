import { Component } from "../../../../js/semi-reactive/core.js";

export default class Home extends Component
{
	constructor(auth) {
		super({
			username: "Usuário"
		});
		this.auth = auth;
	}

	onFirst() {
		this.loadUsername();
	}

	async loadUsername() {
		const user = await this.auth.getUserData();
		this.username = user.name;
	}

	render() {
		return `
			<div class="container-fluid p-5 h-100">
				<div class="row">
					<div class="col-md-7">
						<div class="h1">
							<span class="fa fa-home"></span>
							Página inicial
						</div>
					</div>
				</div>
			</div>
		`;
	}
}