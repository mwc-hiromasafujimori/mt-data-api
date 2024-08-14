# FastCGI で動く MovableType, PowerCMS の環境

## 使い方

1. `.env.example`を`.env`にコピーする
1. 下記`01.コマンド`でコンテナを立ち上げる
1. MovableType の zip ファイルを`cgi-bin`で解凍する
1. 解凍された`cgi-bin/MT*`ディレクトリを`cgi-bin/mt`にリネームする
1. `docker/web/debian/mt-config.cgi`を`cgi-bin/mt/mt-config.cgi`にコピーする
1. 下記`03.ディレクトリ権限変更`で web コンテナのディレクトリ権限を変更する

## 01.コマンド

```sh
# docker image ビルド
docker compose build --no-cache

# docker container 起動
docker compose up -d
```

## 02.各コンテナアクセス URL

.envを初期値から変更しなければ以下でアクセスできます。

### web コンテナ

http://localhost:8080/mt/

### mailhog コンテナ

http://localhost:8025

## 03.ディレクトリ権限変更

以下のコマンドをターミナルで実行する

```sh
# login docker container
docker exec --interactive --tty web bash

# change file permission
chmod 775 /var/www/cgi-bin &&\
chmod 755 /var/www/cgi-bin/mt &&\
chmod 755 /var/www/cgi-bin/mt/mt-*.cgi &&\
chmod 777 /var/www/cgi-bin/mt/mt-static/support &&\
chmod 766 /var/www/html
```

## Directory 説明

```sh
tree
.
├ /cgi-bin	# webコンテナ の /var/www/cgi-bin にマウントしてる. mt プログラムファイルを置いとくところ.
├ /html	# webコンテナ の /var/www/html にマウントしてる. mt の html 出力ディレクトリかつ Web ルート.
└ /docker	# docker コンテナ立ち上げ時に必要なファイル群
	├ /web	# Dockerfile, apache 設定ファイル
	├ /mailhog	# mailhog の /tmp にマウントしてる. mailhogの永続化
	└ /db	# db の /var/lib/mysql にマウントしてる. データベースのデータ永続化のため.
```
