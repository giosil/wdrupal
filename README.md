# WDrupal 

Drupal modules collection

- olm: OpenLayers module
	- http://localhost:8090/olm/index (Example of OpenLayers Map)
	- http://localhost:8090/olm/rss (Example of service proxy)
- wux: WUX module (Bootstrap theme required)
	- http://localhost:8090/wux/index (Library)
- demo: Demo WUX GUI (WUX module required)
	- http://localhost:8090/demo/index (Example of WUX GUI) 
	- http://localhost:8090/demo/map (Example of WUX OpenLayers Component)
- themes: Drupal themes collection

## Test

docker pull drupal

docker run --name dew-drupal -p 8090:80 -d drupal

docker exec -it dew-drupal /bin/bash

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)
