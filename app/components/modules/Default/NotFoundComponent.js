const { Component } = await SemiReactive.import("core.js");

export default class NotFoundComponent extends Component
{
	constructor() {
		super();
	}

	render() {
		return `
			<div class="container-fluid p-5 h-100" style="min-height: 80vh">
				<div class="row">
					<div class="col">
						<div class="h1">
							<span class="fa fa-exclamation-triangle"></span>
							Erro 404
						</div>
					</div>
				</div>

				<hr>
				
				<div class="row">
					<div class="col">
						<div class="h5">
							A página solicitada não foi encontrada
						</div>
					</div>
				</div>
				
				<div class="row mt-5">
					<div class="col">
						<ul>
							<li>
								<a href="#">
									Ir para a página inicial
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		`;
	}
}