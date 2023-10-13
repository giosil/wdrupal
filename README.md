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

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
