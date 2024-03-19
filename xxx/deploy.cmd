@echo off

set DRUPAL_CONT_NAME=dew-drupal

cd ..

echo Delete previous tar module...

IF EXIST xxx.tar del xxx.tar

echo Tar module...

"C:\Program Files\7-Zip"\7z.exe a -ttar xxx.tar xxx/

echo Clean module...

docker exec %DRUPAL_CONT_NAME% /bin/rm -fr /opt/drupal/web/modules/xxx

docker exec %DRUPAL_CONT_NAME% /bin/rm -fr /opt/drupal/web/modules/xxx.tar

echo Copy module...

docker cp xxx.tar %DRUPAL_CONT_NAME%:/opt/drupal/web/modules/

echo Untar module...

docker exec -w /opt/drupal/web/modules %DRUPAL_CONT_NAME% /bin/tar -xvf /opt/drupal/web/modules/xxx.tar

echo Delete tar...

docker exec %DRUPAL_CONT_NAME% /bin/rm -fr /opt/drupal/web/modules/xxx.tar

rem start http://localhost:8090/xxx/index