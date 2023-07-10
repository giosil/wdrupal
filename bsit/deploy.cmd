@echo off

cd ..

echo Delete previous tar theme...

set DRUPAL_CONT_NAME=dew-drupal

IF EXIST bsit.tar del bsit.tar

echo Tar bsit theme...

"C:\Program Files\7-Zip"\7z.exe a -ttar bsit.tar bsit/

echo Clean bsit theme...

docker exec %DRUPAL_CONT_NAME% /bin/rm -fr /opt/drupal/web/themes/bsit

docker exec %DRUPAL_CONT_NAME% /bin/rm -fr /opt/drupal/web/themes/bsit.tar

echo Copy bsit theme...

docker cp bsit.tar %DRUPAL_CONT_NAME%:/opt/drupal/web/themes/

echo Untar bsit theme...

docker exec -w /opt/drupal/web/themes %DRUPAL_CONT_NAME% /bin/tar -xvf /opt/drupal/web/themes/bsit.tar

echo Delete tar...

docker exec %DRUPAL_CONT_NAME% /bin/rm -fr /opt/drupal/web/themes/bsit.tar

