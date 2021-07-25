import { Request } from "../../js/semi-reactive/request.js";

export default class RequestService extends Request
{
	constructor(auth) {
		super(args => {
			if (!("headers" in args)) {
				args.headers = {};
			}
			if (!("authorization" in args.headers)) {
				args.headers["authorization"] = `Bearer ${ auth.getToken() }`;
			}
			if (!("Content-Type" in args.headers)) {
				args.headers["Content-Type"] = `application/json`;
			}
		}, ret => {
			if (ret.status === 401) {
				this.auth.logout();
				return false;
			}
			return true;
		});
		this.auth = auth;
	}
}