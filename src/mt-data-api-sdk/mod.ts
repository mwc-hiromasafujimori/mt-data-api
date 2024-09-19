import { authentication } from './authentication.ts';

export class Client {
	readonly clientId: string;
	readonly baseURL: string;
	readonly username: string;
	readonly password: string;

	/**
	 * @param clientId なんでもいい
	 * @param baseURL http(s)://path/to/mt-data-api.cgi/v6/
	 * @param username ログインユーザーの名前
	 * @param password Webサービスパスワード
	 */
	constructor(
		clientId: string,
		baseURL: string,
		username: string,
		password: string,
	) {
		this.clientId = clientId;
		this.baseURL = baseURL;
		this.username = username;
		this.password = password;
	}

	createAccessToken = async () => {
		const authResult = await authentication(
			this.baseURL,
			this.clientId,
			this.username,
			this.password,
		);
		return authResult.accessToken;
	};
}
