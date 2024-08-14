export class Client {
	private clientId: string;
	private baseURL: string;
	private username: string;
	private password: string;

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

	async authentication() {
		const endpoint = "authentication";
		const requestURL = new URL(this.baseURL + endpoint);
		const requestBody = new URLSearchParams();
		requestBody.set("clientId", this.clientId);
		requestBody.set("password", this.password);
		requestBody.set("remember", "1");
		requestBody.set("username", this.username);

		const res = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: requestBody,
		});

		const json: {
			accessToken: string;
			expiresIn: number;
			remember: boolean;
			sessionId: string;
		} = await res.json();

		console.log(json);
	}
}
