import { uploadFile, type UploadFileBody } from './assets.ts';
import { authentication } from './authentication.ts';
import {
	createContentData,
	type CreateContentDataBody,
	fetchSingleContentData,
} from './contentData.ts';

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

	createAccessToken = async () => {
		const authRes = await authentication(
			this.baseURL,
			this.clientId,
			this.username,
			this.password,
		);
		this.token = authRes.accessToken;
	};

	createContentData = async (
		siteId: number,
		contentTypeId: number,
		body: CreateContentDataBody,
	) => {
		return await createContentData(
			this.baseURL,
			siteId,
			contentTypeId,
			this.token,
			body,
		);
	};

	fetchContentTypeData = async (
		siteId: number,
		contentTypeId: number,
		contentDataId: number,
	) => {
		return await fetchSingleContentData(
			this.baseURL,
			siteId,
			contentTypeId,
			contentDataId,
			this.token,
		);
	};

	uploadFile = async (siteId: number, body: UploadFileBody) => {
		return await uploadFile(this.baseURL, siteId, this.token, body);
	};
}
