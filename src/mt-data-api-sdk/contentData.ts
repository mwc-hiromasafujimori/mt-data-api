import { type MTDataApiError } from './utils/error.ts';
import { authorizedHeader } from './utils/header.ts';

type ContentDataSuccess = {
	author: {
		displayName: string;
		id: number;
		userpicUrl: string | null;
	};
	basename: string;
	blog: {
		id: number;
	};
	createdDate: string;
	data: {
		data: string;
		id: number;
		label: string;
		type: string;
	}[];
	date: string;
	id: number;
	label: string;
	modifiedDate: string;
	/**like URL */
	permalink: string;
	status: 'Publish' | 'Draft';
	unpublishedDate: string | null;
	updatable: boolean;
};

export type CreateContentDataBody = {
	basename?: string;
	data: {
		data: string | string[];
		id: number;
		label?: string;
		type?: string;
	}[];
	/**date-time ISO8601 */
	date?: string;
	label: string;
	status?: string;
	/**date-time ISO8601 */
	unpublishedDate?: string;
};

/**
 * コンテンツデータを作る
 *
 * @see https://movabletype.github.io/mt-docs-data-api-reference/v6.html#tag/Content-Types/paths/~1sites~1%7Bsite_id%7D~1contentTypes~1%7Bcontent_type_id%7D~1data/post
 * @throws 400 Bad request
 * @throws 401 Invalid login
 * @throws 403 Do not have permission to create a content data.
 * @throws 404 Site or Content_type not found.
 */
export const createContentData = async (
	baseURL: string,
	site_id: number,
	content_type_id: number,
	token: string,
	body: CreateContentDataBody,
): Promise<ContentDataSuccess> => {
	const endpoint = `sites/${site_id}/contentTypes/${content_type_id}/data`;
	const requestURL = new URL(baseURL + endpoint);
	const requestBody = new URLSearchParams();

	requestBody.set('content_data', JSON.stringify(body));

	const response = await fetch(requestURL, {
		method: 'POST',
		headers: authorizedHeader(token),
		body: requestBody,
	});

	if (response.status === 200) {
		const json: ContentDataSuccess = await response.json();
		console.log(`Success create data`);
		console.log(JSON.stringify(json));

		return json;
	}

	const json: MTDataApiError = await response.json();
	throw new Error(`${json.error.code} ${json.error.message}`);
};

/**
 * コンテンツデータを一つ取得する
 * Draftはとれないっぽい
 *
 * @param fields string[] よくわかんないけど使えない
 *
 * @see https://movabletype.github.io/mt-docs-data-api-reference/v6.html#tag/Content-Types/paths/~1sites~1%7Bsite_id%7D~1contentTypes~1%7Bcontent_type_id%7D~1data~1%7Bcontent_data_id%7D/get
 * @throws 400 Bad request
 * @throws 401 Invalid login
 * @throws 403 Do not have permission to retrieve the requested content data.
 * @throws 404 Site or Content_type or Content_data not found
 */
export const fetchSingleContentData = async (
	baseURL: string,
	site_id: number,
	content_type_id: number,
	content_data_id: number,
	token: string,
	_fields?: string[],
) => {
	const endpoint =
		`sites/${site_id}/contentTypes/${content_type_id}/data/${content_data_id}`;
	const requestURL = new URL(baseURL + endpoint);

	const response = await fetch(requestURL, {
		method: 'GET',
		headers: authorizedHeader(token),
	});

	if (response.status === 200) {
		const json: ContentDataSuccess = await response.json();
		console.log(`Success fetch data`);
		console.log(json);

		return json;
	}

	const json: MTDataApiError = await response.json();
	throw new Error(`${json.error.code} ${json.error.message}`);
};
