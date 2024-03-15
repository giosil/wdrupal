set DRUPAL_CONT_NAME=dew-drupal

docker cp OpenIDConnect.php %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/contrib/openid_connect/src/OpenIDConnect.php

docker cp OpenIDConnectRedirectController.php %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/contrib/openid_connect/src/Controller/OpenIDConnectRedirectController.php

docker cp OpenIDConnectClientInterface.php %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/contrib/openid_connect/src/Plugin/OpenIDConnectClientInterface.php

docker cp OpenIDConnectClientBase.php %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/contrib/openid_connect/src/Plugin/OpenIDConnectClientBase.php
