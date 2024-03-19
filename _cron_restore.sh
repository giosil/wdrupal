#!/bin/bash

# controllo data folder
data_folder="/data01"
if [ -d "$data_folder" ]; then
  echo "The folder $data_folder exist"
else
  echo "The folder $data_folder does NOT exist"
  echo "create $data_folder..."
  mkdir -p "$data_folder"
  echo "change $data_folder permissions..."
  chmod -R a+rwx "$data_folder"
fi

# Restore

if [ -f "/data01/restore" ]; then
  par_restore=$(cat "/data01/restore")
  len_restore=${#par_restore}
  rm -f /data01/restore.bak
  mv /data01/restore /data01/restore.bak
  if [ $len_restore -eq 1 ]; then
    if [ -f "/data01/sites-$par_restore.tar.gz" ]; then
      echo "Move sites in sites_bak..."
      rm -fr /opt/drupal/web/sites_bak
      mv /opt/drupal/web/sites /opt/drupal/web/sites_bak
      echo "Restore /data01/sites-$par_restore.tar.gz..."
      tar -zxvf "/data01/sites-$par_restore.tar.gz" --directory /
      echo "Restore completed"
    else 
      echo "File /data01/sites-$par_restore.tar.gz not found."
    fi
  else
    echo "Restore $par_restore has a length other than one."
    if [ "$par_restore" = "revert" ]; then
      if [ -d "/opt/drupal/web/sites_bak" ]; then
        echo "Revert..."
        rm -fr /opt/drupal/web/sites
        mv /opt/drupal/web/sites_bak /opt/drupal/web/sites
        echo "Revert completed"
      fi
    fi
  fi
else 
  echo "File /data01/restore not found."
fi