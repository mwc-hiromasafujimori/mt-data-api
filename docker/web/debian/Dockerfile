FROM php:8.1-apache

WORKDIR /etc/apache2

# apt install
RUN apt-get update &&\
	apt-get --no-install-recommends -y install \
		cpanminus \
		# perl modules required
		# Perhaps built in perl modules ```CGI, CGI::Cookie, File::Spec, LWP::UserAgent, parent, HTML::Entities, Scalar::Util, DBI
		libhtml-entities-numbered-perl libdbi-perl libdbd-mysql-perl \
		# perl moduels option
		perlmagick libxml-sax-expat-perl libimager-perl libyaml-syck-perl libxml-libxml-perl libxml-sax-expatxs-perl libgd-perl libcache-perl \
		libcache-memcached-perl libarchive-zip-perl libjson-xs-perl libdatetime-perl libgraphics-magick-perl \
		# PowerCMS option perl module ``` cannot find Estraier
		libtext-csv-xs-perl \
		# fcgi perl module
		libfcgi-perl libcgi-fast-perl \
		# apache module install
		libapache2-mod-fcgid \
		# GD インストール
		libfreetype6-dev libjpeg62-turbo-dev libpng-dev &&\
	apt-get clean

# docker-php-ext
RUN docker-php-ext-configure gd --with-freetype --with-jpeg &&\
	docker-php-ext-install gd

# Mozilla::CA インストール
RUN	cpanm --notest Mozilla::CA

# apche settings
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
COPY ./fcgid.conf /etc/apache2/mods-available/
COPY ./000-default.conf /etc/apache2/sites-available/
RUN a2enmod proxy_fcgi include

# apache2 env vars
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_PID_FILE /var/run/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2

EXPOSE 80

CMD ["apache2-foreground"]
