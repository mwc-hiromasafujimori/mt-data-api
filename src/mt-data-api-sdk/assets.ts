import { type MTDataApiError } from './utils/error.ts';
import { createAuthorizedHeader } from './utils/header.ts';

type UploadSuccess = {
	blog: {
		id: number;
	};
	class: string;
	createdBy: {
		displayName: string;
		id: number;
		userpicUrl: string;
	};
	/**date-time ISO8601 */
	createdDate: string;
	customFields: [
		{
			basename: string;
			value: string;
		},
	];
	description: string;
	fileExtension: string;
	filePath: string;
	filename: string;
	id: number;
	label: string;
	meta: {
		fileSize: number;
		height: number;
		width: number;
	};
	mimeType: string;
	modifiedBy: {
		displayName: string;
		id: number;
		userpicUrl: string;
	};
	/**date-time ISO8601 */
	modifiedDate: string;
	parent: {
		id: number;
	};
	tags: [
		string,
	];
	type: string;
	updatable: true;
	url: string;
};

type UploadFileBody = {
	autoRenameIfExists?: 0 | 1;
	autoRenameNonAscii?: 0 | 1;
	/**binary */
	file: Blob;
	normalizeOrientation?: 0 | 1;
	path?: string;
	// site_id: number;
};

export const uploadFile = async (
	baseURL: string,
	site_id: number,
	token: string,
	body: UploadFileBody,
	overwrite: boolean = false,
) => {
	const endpoint = `assets/upload`;
	const requestParameter = new URLSearchParams();
	if (overwrite) {
		requestParameter.set('overwrite_once', '1');
	}

	const requestURL = new URL(
		baseURL + endpoint + (overwrite ? `?${requestParameter.toString()}` : ''),
	);
	const requestBody = new FormData();
	requestBody.set('site_id', `${site_id}`);
	requestBody.set('file', body.file);
	if (body.path) {
		requestBody.set('path', body.path);
	}

	const response = await fetch(requestURL, {
		method: 'POST',
		headers: createAuthorizedHeader(token, 'multipart/form-data'),
		body: requestBody,
	});

	if (response.status === 200) {
		const json: UploadSuccess = await response.json();
		console.log(`Success upload asset`);
		console.log(json);

		return json;
	}

	const json: MTDataApiError = await response.json();
	throw new Error(`${json.error.code} ${json.error.message}`);
};
