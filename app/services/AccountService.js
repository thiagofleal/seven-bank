import RequestService from "./RequestService.js";

export default class AccountService
{
	constructor(auth) {
		this.auth = auth;
		this.request = new RequestService(auth);
	}

	async getAccount(id) {
		if (!id) {
			id = this.auth.getId();
		}
		return await this.request.get(`${ this.auth.getUrl("accounts") }/${ id }`);
	}

	async search(code) {
		return await this.request.get(`${ this.auth.getUrl("search") }/${ code }`);
	}

	async transfer(account, value) {
		value = parseFloat(value.replace('.', '').replace(',', '.'));
		return await this.request.post(this.auth.getUrl("pix"), {
			account, value
		});
	}

	async transfers() {
		const transfers = await this.request.get(this.auth.getUrl("transfers"));
		
		if (Array.isArray(transfers)) {
			return await Promise.all(
				transfers.map(async t => {
					const from = await this.getAccount(t.from);
					const to = await this.getAccount(t.to);
					return {
						from, to, at: t.at, value: t.value
					};
				})
			);
		}
		return [];
	}

	async listAccounts() {
		const logged = await this.getAccount();

		if (logged) {
			return await this.request.get(`${ this.auth.getUrl('agencies') }/${ logged.agency }/contas`);
		} else {
			return [];
		}
	}

	async createAccount(owner, password) {
		return await this.request.post(this.auth.getUrl('account'), { owner, password });
	}

	async editAccount(id, owner, password) {
		return await this.request.put(`${ this.auth.getUrl('accounts') }/${ id }`, { owner, password });
	}

	async changePassword(oldPassword, newPassword) {
		const logged = await this.getAccount();

		return await this.request.put(this.auth.getUrl('setPassword'), {
			account: logged.code,
			password: oldPassword,
			newPassword
		});
	}

	async addAdmin(account) {
		return await this.request.post(this.auth.getUrl('admin'), { account });
	}

	async removeAdmin(account) {
		return await this.request.delete(this.auth.getUrl('admin'), { account });
	}
}