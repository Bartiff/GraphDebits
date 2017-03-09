#!/bin/bash

year=$(date +%Y)

if [ -f ressources/graphdebits-$year.json ]
then
   speed=`python bower_components/speedtest/index.py --server 5559 --json`
   sed -i '$d' ressources/graphdebits-$year.json
   echo ','$speed >> ressources/graphdebits-$year.json
   echo ']' >> ressources/graphdebits-$year.json
else
   echo "[\n{}" > ressources/graphdebits-$year.json
   speed=`python bower_components/speedtest/index.py --server 5559 --json`
   echo ','$speed >> ressources/graphdebits-$year.json
   echo ']' >> ressources/graphdebits-$year.json
fi
