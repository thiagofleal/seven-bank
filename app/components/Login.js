import { EventEmitter } from "../../js/semi-reactive/core.js";
import { FormComponent } from "../../js/semi-reactive/utils.js";

export default class Login extends FormComponent
{
	constructor(auth) {
		super({
			title: "Seven Bank",
			loading: false
		});
		this.auth = auth;

		this.account = '';
		this.password = '';
		this.onLogin = new EventEmitter('login', this);
		this.onSelect = new EventEmitter('select', this);

		this.onSelect.then(() => {
			this.loading = false;
		});

		this.setFieldsControls({
			account: {
				get: () => this.account,
				set: value => {
					let account = value.replaceAll(/\D/gi, '');
					
					if (account.length >= 7) {
						account = account.substr(0, 6) + '-' + account.substr(6, 1);
					}
					this.account = account;
				}
			},
			password: {
				get: () => this.password,
				set: value => this.password = value
			}
		});
	}

	async enter() {
		this.loading = true;
		const response = await this.auth.login(this.account, this.password);

		if (response.success) {
			this.onLogin.emit();
		} else {
			if ("error" in response) {
				alert(response.error);
			} else {
				alert("Falha no login");
			}
			this.loading = false;
		}
	}

	clear(event) {
		event.target.form.reset();
	}

	render() {
		this.pageTitle(this.title);

		return `
			<div class="bg-light w-100 h-100">
				<div class="container">
					<div class="jumbotron bg-light text-light w-100 text-dark mt-5 shadow">
						<div class="h2 mb-5">
							Entre na sua conta Seven Bank
						</div>

						<form class="form-group">
							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<label for="login-username" class="input-group-text">
										Conta
									</label>
								</div>
								${
									this.input({
										id: "login-username",
										type: "text",
										class: "form-control",
										fieldControlName: "account"
									})
								}
							</div>

							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<label for="login-password" class="input-group-text">
										Senha
									</label>
								</div>
								${
									this.input({
										id: "login-password",
										type: "password",
										class: "form-control",
										fieldControlName: "password"
									})
								}
							</div>
							<hr>
							
							<div class="">
								<button type="button" class="btn btn-primary mr-2" onclick="this.component.enter()" style="width: 100px;">
									<div class="${ this.loading ? 'd-none' : 'd-block' }">
										<span class="fa fa-sign-in" aria-hidden="true"></span>
										Entrar
									</div>

									<div class="${ this.loading ? 'd-block' : 'd-none' }">
										<img src="./images/load.grey.gif" height="20px" />
									</div>
								</button>
								
								<button type="button" class="btn btn-danger" onclick="this.component.clear(event)">
									<span class="fa fa-eraser" aria-hidden="true"></span>
									Limpar
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		`;
	}
}