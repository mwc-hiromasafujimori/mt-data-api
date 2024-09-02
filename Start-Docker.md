# FastCGI で動く MovableType, PowerCMS の環境

## 使い方

1. `docker compose up -d`でコンテナを立ち上げる
1. MovableType の zip ファイルを`cgi-bin`で解凍する
1. 解凍された`cgi-bin/MT*`ディレクトリを`cgi-bin/mt`にリネームする
1. `docker/web/debian/mt-config.cgi`を`cgi-bin/mt/mt-config.cgi`にコピーする
1. [`ディレクトリ権限変更`](#ディレクトリ権限変更)で web コンテナのディレクトリ権限を変更する

## 各コンテナアクセス

.envを初期値から変更しなければ以下でアクセスできる

### web コンテナ

http://localhost:8080/mt/

### mailhog コンテナ

http://localhost:8025

## ディレクトリ権限変更

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