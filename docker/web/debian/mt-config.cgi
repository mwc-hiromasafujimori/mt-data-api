##          Movable Type configuration file                   ##
##                                                            ##
## This file defines system-wide settings for Movable Type    ##
## In total, there are over a hundred options, but only those ##
## critical for everyone are listed below.                    ##
##                                                            ##
## Information on all others can be found at:                 ##
## http://www.movabletype.org/documentation/appendices/config-directives/ ##

################################################################
##################### REQUIRED SETTINGS ########################
################################################################

# The CGIPath is the URL to your Movable Type directory
CGIPath    /mt/

# The StaticWebPath is the URL to your mt-static directory
# Note: Check the installation documentation to find out 
# whether this is required for your environment.  If it is not,
# simply remove it or comment out the line by prepending a "#".
StaticWebPath    /mt/mt-static/
StaticFilePath   /var/www/cgi-bin/mt/mt-static

#================ DATABASE SETTINGS ==================
#   CHANGE setting below that refer to databases 
#   you will be using.

##### MYSQL #####
ObjectDriver DBI::mysql
# .env ${MYSQL_DATABASE}
Database movabletype
# .env ${MYSQL_USER}
DBUser movabletype
# .env ${MYSQL_PASSWORD}
DBPassword movabletype
# .env ${MYSQL_CONTAINER_NAME}:${MYSQL_PORT}
DBHost db:3306

#================ MAIL SETTINGS ==================
EmailAddressMain hiromasa.fujimori@micro-wave.net

MailTransfer smtp
# .env ${MAIL_CONTAINER_NAME}
SMTPServer mail
# .env ${MAIL_SMTP_PORT}
SMTPPort 1025

## Change setting to language that you want to using.
DefaultLanguage ja

