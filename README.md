# Updated
This code was recently revisited and updated for use with Wix Studio.  This code no longer works with the packages at the tfjs repo, but required some additional dependencies to work. If you run into errors  yourself, consider adding the following packages

# Code to support the Velo and Tensorflow example

This code applies the tensorflow toxicity model in a basic chat moderation flow on Velo by Wix

## Setup
To use this code you must first create a wix site with Wix Chat enabled and dev mode turned on

Add the following NPM packages to your velo site @tensorflow/tfjs @tensorflow-models/toxicity

Place the two files in your backend code.  Note that events.js is a reserved file name.  If you change this, the code will not run. toxicity can be renamed, however, make sure to update any references to this file if you do so.

## Credit
This example is based on code modified from this demo repo: https://github.com/tensorflow/tfjs-models/blob/master/toxicity/demo/index.js
