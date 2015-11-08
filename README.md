# Learn the Pokemon!

##1. Purpose
There's over 700 of these things now, and unless you want some punk 10 year old beating you in battle, you've got to study up. But you're old, haggard, and dead on the inside, and your brain is not what it used to be, and you need an app that helps you. Together, we shall teach the shame and dishonor of defeat to your stupid little cousins and neighbours. At least until you finally get a girlfriend... But (because you're here...) we both know that's not going to happen.

##2. Technologies

Application:
  * AngularJS
  * Bootstrap
  * jQuery

Dev-Ops
  * Bower
  * Grunt
  * JSCS for Javascript code stye checking
  * JSHint for Javascript lint checking

##3. Dependencies and Prerequisite software

 1. NodeJS (I'm using v0.12.7)
 2. NPM configured and running
 3. Perhaps XCode and command line tools if on Mac OS X
 4. *Google Chrome* (Optional: this is what Grunt will launch automatically when serving)

##4. Setup and Installation

###4.1 Mac OSX

  1. Get XCode and the command line tools. Run them once and accept the ULA
  2. Proceed to 4.2 for manual install or ```sh environmentSetup.sh``` for automatic setup

###4.2 All Platforms

  1. Install NodeJS and configure npm
  2. Install bower ```npm install bower -g```
  3. Install grunt-cli ```npm install grunt-cli -g```
  4. Install bower dependencies ```bower install```

##5. Running
The command  
`grunt server`  
Will automatically launch the server and Google Chrome
