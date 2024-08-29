import { type MTDataApiError } from './utils/error.ts';
import { unauthorizedHeader } from './utils/header.ts';

type AuthenticationSuccess = {
	accessToken: string;
	expiresIn: number;
	remember: boolean;
	sessionId: string;
};

/**
 * 認証、アクセストークンの取得を行う
 * @see https://movabletype.github.io/mt-docs-data-api-reference/v6.html#tag/Authentication/paths/~1authentication/post
 * @throws 400 Bad Request
 * @throws 401 Invalid Login
 */
export const authentication = async (
	baseURL: string,
	clientId: string,
	username: string,
	password: string,
): Promise<AuthenticationSuccess> => {
	const endpoint = 'authentication';
	const requestURL = new URL(baseURL + endpoint);
	const requestBody = new URLSearchParams();
	requestBody.set('clientId', clientId);
	requestBody.set('password', password);
	requestBody.set('remember', '1');
	requestBody.set('username', username);

	const response = await fetch(requestURL, {
		method: 'POST',
		headers: unauthorizedHeader(),
		body: requestBody,
	});

	if (response.status === 200) {
		const json: AuthenticationSuccess = await response.json();
		console.log(`Success Authentication: ${json.accessToken.slice(0, 5)}...`);

		return json;
	}

	const json: MTDataApiError = await response.json();
	throw new Error(`${json.error.code} ${json.error.message}`);
};
