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

# Backup

day_of_week=$(date +%u)

cd "$data_folder"

rm -fr "sites-$day_of_week.tar.gz"

tar -zcvf "sites-$day_of_week.tar.gz" /opt/drupal/web/sites