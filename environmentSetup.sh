#!/bin/bash
function outputComment {
  if [[ "$1" ]]
    then
      outputPoundLine
      echo $1
      outputPoundLine
      echo '\n'
  fi
}

function outputPoundLine {
	echo "####################################"
}

function installNpmGlobalPackage {
  npm list -g $1 -g &> /dev/null
  if [[ $? -ne 0 ]] ; then
    npm install -g $1
  fi
}

outputComment "Checking for and installing Node.js"
if [[ -e ~/.nvm/nvm.sh ]] ; then
  source ~/.nvm/nvm.sh
fi
which -s node
installed=$?
nvm list &> /dev/null
if [[ $? -ne 0 ]] ; then
  git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
  echo '. ~/.nvm/nvm.sh' >> ~/.bash_profile
  source ~/.bash_profile
  nvm install
  nvm use
  if [[ $installed != 0 ]] ; then
    mkdir ~/npm-global
    npm config set prefix '~/npm-global'
    echo 'export PATH=~/npm-global/bin:$PATH' >> ~/.bash_profile
    source ~/.bash_profile
  fi
else
  nvm install
  nvm use
  npm install -g npm@latest
fi

outputComment "Installing required npm global packages"
installNpmGlobalPackage "grunt-cli"
installNpmGlobalPackage "bower"
installNpmGlobalPackage "jscs"
installNpmGlobalPackage "jshint"

bower install

npm install
