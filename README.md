# WDrupal 

Drupal modules and themes collection

- bsit: Drupal theme based on Bootstrap Italia
- olm: OpenLayers module
	- http://localhost:8090/olm/index (Example of OpenLayers Map)
	- http://localhost:8090/olm/rss (Example of service proxy)
- wux: WUX module (Bootstrap theme required)
	- http://localhost:8090/wux/index (Library)
	- wux_bsit.zip sources of wux modified for bsit
- demo: Demo WUX GUI (WUX module required)
	- http://localhost:8090/demo/index (Example of WUX GUI) 
	- http://localhost:8090/demo/map (Example of WUX OpenLayers Component)

## Test

`docker pull drupal`

`docker run --name dew-drupal -p 8090:80 -d drupal`

`docker exec -it dew-drupal /bin/bash`

## Install sqlite and Drush

`apt update`

`apt install sqlite3`

`composer require drush/drush`

`drush sql:cli`

```sql
.tables

pragma table_info('node');

.header on

.mode column 

select * from node;

select nid,vid,type,title from node_field_data;

select * from path_alias;

.quit
```

To export data:

```sql
.output /opt/drupal/table.sql

.dump [table]

.quit
```

## Modify init script

The entrypoint of Drupal container is:

/usr/local/bin/docker-php-entrypoint

```bash
#!/bin/sh
set -e

# first arg is `-f` or `--some-option`
if [ "${1#-}" != "$1" ]; then
  set -- apache2-foreground "$@"
fi

exec "$@"
```

You can add your init script after `set -e`. Below is an example.

```bash
# [DEW] check hosts
if grep -q 'wdrupal.dew.org' '/etc/hosts'; then
  echo 'wdrupal.dew.org is mapped in /etc/hosts'
else
  echo 'wdrupal.dew.org is NOT mapped in /etc/hosts'
  echo '10.2.69.49 wdrupal.dew.org' >> /etc/hosts
  echo 'wdrupal.dew.org added in /etc/hosts'
fi

# [DEW] check data folder
data_folder="/data01"
if [ -d "$data_folder" ]; then
  user_folder=$(stat -c %U "$data_folder")
  if [ "$user_folder" = "root" ]; then
    echo "$data_folder belongs to root"
    chmod -R a+rwx "$data_folder"
  else
    echo "$data_folder does NOT belong to root"
  fi
else
  echo "The folder $data_folder does NOT exist"
  mkdir -p "$data_folder"
  chmod -R a+rwx "$data_folder"
fi
```

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
