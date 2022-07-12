# WDrupal 

Dew Drupal modules collection

- olm: OpenLayers module
	- http://host:port/olm/index (Example of OpenLayers Map)
	- http://host:port/olm/rss (Example of service proxy)
- wux: WUX module (Bootstrap theme required)
	- http://host:port/wux/index (Library)
- demo: Demo WUX GUI (WUX module required)
	- http://host:port/demo/index (Example of WUX GUI) 
	- http://host:port/demo/map (Example of WUX OpenLayers Component)

## Test

docker pull drupal

docker run --name dew-drupal -p 8090:80 -d drupal

docker exec -it dew-drupal /bin/bash

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
