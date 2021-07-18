export default class AuthService
{
	constructor(callback)
	{
		this.__id = 0;
		this.reset();
		this.callback = callback;
	}

	reset()
	{
		this.token = null;
		this.permissions = [];
	}

	logout()
	{
		this.reset();
		this.callback();
	}

	getUrl(key)
	{
		const base = `${ baseUrl }`;
		const urls = {
			"login": `${ base }/login`,
			"agency": `${ base }/agencia`,
			"agencies": `${ base }/agencias`,
			"account": `${ base }/conta`,
			"accounts": `${ base }/contas`,
			"search": `${ base }/contas/buscar`,
			"pix": `${ base }/pix`
		};

		if (key in urls) {
			return urls[key];
		}

		return null;
	}

	async getResult(response)
	{
		const json = await response.json();
		
		if (response.ok) {
			this.token = json.token;
			this.__id = json.id;
			this.permissions = json.permissions;
			setTimeout(() => this.logout(), json.expires * 1000);
			return {
				success: true,
				status: response.status
			};
		} else {
			return {
				success: false,
				status: response.status,
				error: json.error
			};
		}
	}

	async login(username, password)
	{
		const response = await fetch(
			this.getUrl("login"),
			{
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					account: username,
					password: password
				})
			}
		);
		
		return await this.getResult(response);
	}

	isLogged()
	{
		return this.token ? true : false;
	}

	getToken()
	{
		return this.token;
	}

	getId()
	{
		return this.__id;
	}

	savedLogin()
	{
		if (this.isLogged()) {
			return this.token;
		}
		return false;
	}

	hasPermission(permission) {
		return this.permissions.indexOf(permission) !== -1;
	}
}