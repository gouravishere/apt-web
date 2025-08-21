#!bin/bash

cd /home/antino/apt-global-fincon-website

git pull origin dev

docker-compose up -d --build
