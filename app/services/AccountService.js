import RequestService from "./RequestService.js";

export default class AccountService
{
	constructor(auth)
	{
		this.auth = auth;
		this.request = new RequestService(auth);
	}

	async getAccount(id)
	{
		id = id || this.auth.getId();
		return await this.request.get(`${ this.auth.getUrl("accounts") }/${ id }`);
	}

	async search(code) {
		return await this.request.get(`${ this.auth.getUrl("search") }/${ code }`);
	}

	async transfer(account, value) {
		value = +value.replace(',', '.');
		return await this.request.post(this.auth.getUrl("pix"), {
			account, value
		});
	}
}