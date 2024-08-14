import { Client } from "./mt-data-api-sdk.ts";

const clientId = "node"; // なんでもいい
const baseURL = "http://localhost:8080/mt/mt-data-api.cgi/v6/"; // v6が最新
const username = "user"; // ログインユーザーの名前
const password = "l1wyqqjw"; // Webサービスパスワード

const webServicePassClient = new Client(clientId, baseURL, username, password);

webServicePassClient.authentication();
