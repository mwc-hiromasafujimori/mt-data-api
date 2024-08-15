import { authentication } from './authentication.ts';
import { createContentData, fetchSingleContentData } from './contentType.ts';

export class Client {
	private clientId: string;
	private baseURL: string;
	private username: string;
	private password: string;
	private token: string = '';

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

	async createAccessToken() {
		const authRes = await authentication(
			this.baseURL,
			this.clientId,
			this.username,
			this.password,
		);
		this.token = authRes.accessToken;
	}

	async createContentTypeDataInMyFirstSite() {
		const title = 'テストデータ' + new Date().toISOString();
		await createContentData(this.baseURL, 1, 1, this.token, {
			// basename: 'iii',
			data: [
				{
					// label: 'Title',
					data: title,
					id: 1,
				},
				{
					// label: 'Body',
					data: 'あいうえお',
					id: 2,
				},
				{
					// label: 'Summary',
					data: 'かき',
					id: 3,
				},
				{
					// label: 'Tags',
					data: [],
					id: 5,
				},
			],
			// date: '20190824141522',
			label: title,
			// status: 'published',
			// unpublishedDate: '20190824141522',
		});
	}

	async fetchContentTypeDataInMyFirstSite() {
		await fetchSingleContentData(this.baseURL, 1, 1, 1, this.token, [
			'Title',
			'Body',
		]);
	}
}
