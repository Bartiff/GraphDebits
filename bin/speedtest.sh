#!/bin/bash

year=$(date +%Y)
path=`echo $(dirname $0) | sed 's/^.\{0\}\(.*\).\{4\}$/\1/'`
echo $path

if [ -f $path/ressources/graphdebits-$year.json ]
then
    #echo "Le fichier existe"
   speed=`python $path/bower_components/speedtest-cli/speedtest.py --server 5559 --json`
   sed -i '$d' $path/ressources/graphdebits-$year.json
   echo ','$speed >> $path/ressources/graphdebits-$year.json
   echo ']' >> $path/ressources/graphdebits-$year.json
else
    #echo "Le fichier n'existe pas"
   echo "[\n{}" > $path/ressources/graphdebits-$year.json
   speed=`python $path/bower_components/speedtest-cli/speedtest.py --server 5559 --json`
   echo ','$speed >> $path/ressources/graphdebits-$year.json
   echo ']' >> $path/ressources/graphdebits-$year.json
fi
