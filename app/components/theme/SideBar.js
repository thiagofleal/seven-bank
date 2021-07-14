import { Component, EventEmitter } from "../../../js/semi-reactive/core.js";

import AccountService from "../../services/AccountService.js";

export default class SideBar extends Component
{
	constructor(auth) {
		super({
			owner: '',
			agency: '',
			account: '',
			menu: []
		});

		this.isMobile = window.innerWidth <= 425;
		this.active = !this.isMobile;
		this.onSelect = new EventEmitter('select', this);
		this.auth = auth;
		this.service = new AccountService(auth);
	}

	async onFirst(item) {
		const onSelect = this.getFunctionAttribute("onselect", item, "event");
		const json = await this.service.getAccount();
		
		this.onSelect.then(onSelect);
		this.owner = json.owner;
		this.agency = json.agency;
		this.account = json.code;
	}

	toggle() {
		const sidebar = document.querySelector('#sidebar');
		sidebar.classList.toggle('active');
		this.active = !this.active;
	}

	open() {
		if (!this.active) {
			this.toggle();
		}
	}

	close() {
		if (this.active) {
			this.toggle();
		}
	}

	select(index) {
		if (this.isMobile) {
			this.close();
		}
		this.onSelect.emit(this.menu[index]);
	}

	renderMenu(menu, index) {
		menu = Object.assign({}, menu);

		const icon = menu.icon || "";
		const title = menu.title || "";
		let attributes = [];
		let childs = false, ul = false;

		delete menu.icon;
		delete menu.title;

		if ("childs" in menu) {
			childs = menu.childs;
			ul = menu.ul;

			delete menu.childs;
			delete menu.ul;
		}
		
		for (let key in menu) {
			attributes.push({
				name: key,
				value: menu[key]
			});
		}

		const link = `
			<a ${
				attributes.map(
					attr => `${ attr.name }="${ attr.value }"`
				).join(' ')
			} onclick="this.component.select(${ index })">
				<span class="${ icon }"></span>
				${ title }
			</a>
		`;
		
		if (childs) {
			if (!ul) {
				ul = {};
			}
			
			attributes = [];

			if (!("class" in ul)) {
				ul["class"] = "collapse list-unstyled";
			}

			for (let key in ul) {
				attributes.push({
					name: key,
					value: ul[key]
				});
			}

			return `
				<li>
					${ link }
					<ul
						${
							attributes.map(
								attr => `${ attr.name }="${ attr.value }"`
							).join(' ')
						}
					>
						${
							childs.map(
								(item, index) => this.renderMenu(item, index)
							).join('')
						}
					</ul>
				</li>
			`;
		} else {
			return `<li>${ link }</li>`;
		}
	}

	render() {
		return `
			<nav id="sidebar" class="${ this.active ? "active" : '' } bg-custom">
				<div class="sidebar-header text-light" style="height: calc(40vh - 125px)">
					<div class="p-2">
						<div>
							Titular: ${ this.owner }
						</div>
						<div>
							Agência: ${ this.agency }
						</div>
						<div>
							Conta: ${ this.account }
						</div>
					</div>
				</div>
				<hr class="bg-light">

				<ul class="list-unstyled components text-light" style="height: 55vh; overflow: auto;">
					${
						this.menu.map(
							(item, index) => `
								<div class="px-1">
									${ this.renderMenu(item, index) }
								</div>
							`
						).join('')
					}
				</ul>

				<div class="text-center text-light fs-sm" style="height: 5vh">
					Desenvolvido por
					<a href="https://www.thiagoleal.dev.br" target="_blank" class="text-light">
						Thiago Leal
					</a>
					- 2021
				</div>
			</nav>
		`;
	}
}