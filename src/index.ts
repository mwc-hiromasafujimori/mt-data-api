import { Client } from './mt-data-api-sdk/mod.ts';

const clientId = 'node';
const baseURL = 'http://localhost:8080/mt/mt-data-api.cgi/v6/';
const username = 'user';
// const password = "l1wyqqjwa";
const password = 'l1wyqqjw';

const client = new Client(clientId, baseURL, username, password);

await client.createAccessToken();

// await client.createContentTypeDataInMyFirstSite();
await client.fetchContentTypeDataInMyFirstSite();
