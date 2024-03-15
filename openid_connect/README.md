# wdrupal - openid_connect

The OpenID Connect module provides a pluggable client implementation for the OpenID Connect protocol.

## Install

- `composer require 'drupal/openid_connect:^3.0@alpha'`

## Apply the changes

Find `[DEW]` in source files to view changes.

```
set DRUPAL_CONT_NAME=dew-drupal

docker cp OpenIDConnect.php %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/contrib/openid_connect/src/OpenIDConnect.php

docker cp OpenIDConnectRedirectController.php %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/contrib/openid_connect/src/Controller/OpenIDConnectRedirectController.php

docker cp OpenIDConnectClientInterface.php %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/contrib/openid_connect/src/Plugin/OpenIDConnectClientInterface.php

docker cp OpenIDConnectClientBase.php %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/contrib/openid_connect/src/Plugin/OpenIDConnectClientBase.php
```

## Contributors

* [Giorgio Silvestris](https://github.com/giosil)