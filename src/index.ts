import { Client } from './mt-data-api-sdk/mod.ts';

import {
	createContentData,
	fetchSingleContentData,
} from './mt-data-api-sdk/contentData.ts';
import { uploadFile } from './mt-data-api-sdk/assets.ts';

const clientId = 'node';
const baseURL = 'http://localhost:8080/mt/mt-data-api.cgi/v6/';
const username = 'user';
const password = 'l1wyqqjw';

const client = new Client(clientId, baseURL, username, password);

const _createContentTypeDataInMyFirstSite = async () => {
	const title = 'テストデータ' + new Date().toISOString();
	const [siteId, contentTypeId] = [1, 1];

	await createContentData(client, siteId, contentTypeId, {
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
};

const _fetchContentTypeDataInMyFirstSite = async () => {
	const [siteId, contentTypeId, contentDataId] = [1, 1, 1];
	await fetchSingleContentData(client, siteId, contentTypeId, contentDataId);
};

const _uploadFileInMyFirstSite = async () => {
	const filename = `file-${new Date().toISOString()}.png`;

	const filepath = new URL('./image.png', import.meta.url);
	const file = await Deno.readFile(filepath);
	const blob = new Blob([file]);

	const [siteId] = [1];

	await uploadFile(client, siteId, {
		path: 'assets',
		file: blob,
		filename: filename,
	});
};

// _createContentTypeDataInMyFirstSite();
// _fetchContentTypeDataInMyFirstSite();
// _uploadFileInMyFirstSite();
