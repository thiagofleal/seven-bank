export default class AccountService
{
	constructor(auth)
	{
		this.auth = auth;
	}

	async getAccount(id)
	{
		id = id || this.auth.getId();
		return await this.auth.get(`${ this.auth.getUrl("accounts") }/${ id }`);
	}

	async search(code) {
		return await this.auth.get(`${ this.auth.getUrl("search") }/${ code }`);
	}

	async transfer(account, value) {
		value = +value.replace(',', '.');
		console.log({account, value});
		return await this.auth.post(this.auth.getUrl("pix"), {
			account, value
		});
	}
}