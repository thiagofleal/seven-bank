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

	async request(url, method, body, args)
	{
		if (args === null || args === undefined) {
			args = {};
		}

		args.method = method;

		if (body) {
			args.body = JSON.stringify(body);
		}

		if (!("headers" in args)) {
			args.headers = {};
		}

		if (!("Authorization" in args.headers)) {
			args.headers["Authorization"] = `Bearer ${ this.token }`;
		}

		if (!("Content-Type" in args.headers)) {
			args.headers["Content-Type"] = `application/json`;
		}

		const ret = await fetch(url, args);

		if (ret.status === 401) {
			this.logout();
			return false;
		}

		return ret;
	}

	async getResponse(url, args)
	{
		return await this.request(url, "GET", null, args);
	}

	async get(url, args)
	{
		const response = await this.getResponse(url, args);
		
		if (response !== false) {
			return await response.json();
		}
		return false;
	}

	async postResponse(url, body, args)
	{
		return await this.request(url, "POST", body, args);
	}

	async post(url, body, args)
	{
		const response = await this.postResponse(url, body, args);
		
		if (response !== false) {
			return await response.json();
		}
		return false;
	}

	async putResponse(url, body, args)
	{
		return await this.request(url, "PUT", body, args);
	}

	async put(url, body, args)
	{
		const response = await this.putResponse(url, body, args);
		
		if (response !== false) {
			return await response.json();
		}
		return false;
	}

	async deleteResponse(url, body, args)
	{
		return await this.request(url, "DELETE", body, args);
	}

	async delete(url, body, args)
	{
		const response = await this.deleteResponse(url, body, args);
		
		if (response !== false) {
			return await response.json();
		}
		return false;
	}

	getUrl(key)
	{
		const base = `${ baseUrl }`;
		const urls = {
			"login": `${ base }/login`,
			"accounts": `${ base }/contas`
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