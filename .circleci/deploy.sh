#!/usr/bin/env bash

set -e

DEPLOY_DIR=deploy

git config --global push.default simple
git config --global user.email matsunoappy@gmail.com
git config --global user.name himanoa

git clone -q --branch=gh-pages $CIRCLE_REPOSITORY_URL $DEPLOY_DIR

cd $DEPLOY_DIR
rsync -arv --delete ../public/* .

git add -f .
git commit -m "Deploy #$CIRCLE_BUILD_NUM from CircleCI [ci skip]" || true
git push -f
