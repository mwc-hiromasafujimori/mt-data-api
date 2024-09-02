# MT DataAPI を試すリポジトリ

## 事前準備

### MT の docker コンテナを立ち上げる

詳細は[Start-Docker](./Start-Docker.md)を見てください

### deno をインストールする

node の環境をちゃんとセットアップするのが面倒だったので[deno](https://deno.com/)を使ってる
homebrew でインストールすると楽かも`brew install deno`

## 使い方

### DataAPI を有効化する

DataAPI を有効化したいサイトの「Web サービス」設定

✅ DataAPI の利用を許可する

### Deno を使う

以下それぞれの許可が必要
- ネットワークアクセス
- ファイルリード

```sh
deno run --allow-net --allow-read src/index.ts
```

## Directory 説明

```sh
tree
.
├── cgi-bin	# webコンテナ の /var/www/cgi-bin にマウントしてる. mt プログラムファイルを置いとくところ.
├── html	# webコンテナ の /var/www/html にマウントしてる. mt の html 出力ディレクトリかつ Web ルート.
├── docker # docker コンテナ立ち上げ時に必要なファイル群
│   ├── db	# db の /var/lib/mysql にマウントしてる. データベースのデータ永続化のため.
│   ├── mailhog	# mailhog の /tmp にマウントしてる. mailhogの永続化
│   └── web	# Dockerfile, apache 設定ファイル
├── src # TSコードは格納していく
│   ├── mt-data-api-sdk # MTのプロジェクトに一切依存しない形のSDKとしての開発
```
