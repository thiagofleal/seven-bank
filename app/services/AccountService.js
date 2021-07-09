export default class AccountService
{
	constructor(auth)
	{
		this.auth = auth;
	}

	async getAccount()
	{
		const id = this.auth.getId();
		return await this.auth.get(`${ this.auth.getUrl("accounts") }/${ id }`);
	}
}