export default class RequestService
{
	constructor(auth) {
		this.auth = auth;
	}

	async request(url, method, body, args)
	{
		if (args === null || args === undefined) {
			args = {};
		}

		args.method = method;
		args.mode = "cors";

		if (body) {
			args.body = JSON.stringify(body);
		}

		if (!("headers" in args)) {
			args.headers = {};
		}

		if (!("authorization" in args.headers)) {
			args.headers["authorization"] = `Bearer ${ this.auth.getToken() }`;
		}

		if (!("Content-Type" in args.headers)) {
			args.headers["Content-Type"] = `application/json`;
		}

		const ret = await fetch(url, args);

		if (ret.status === 401) {
			this.auth.logout();
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
}