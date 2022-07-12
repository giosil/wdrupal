@echo off

set DRUPAL_CONT_NAME=dew-drupal

cd ..

echo Delete previous tar module...

IF EXIST wux.tar del wux.tar

echo Tar module...

"C:\Program Files\7-Zip"\7z.exe a -ttar wux.tar wux/

echo Clean module...

docker exec %DRUPAL_CONT_NAME% /bin/rm -fr /opt/drupal/web/modules/wux

docker exec %DRUPAL_CONT_NAME% /bin/rm -fr /opt/drupal/web/modules/wux.tar

echo Copy module...

docker cp wux.tar %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/

echo Untar module...

docker exec -w /opt/drupal/web/modules %DRUPAL_CONT_NAME% /bin/tar -xvf /opt/drupal/web/modules/wux.tar

rem start http://localhost:8090/wux/index
