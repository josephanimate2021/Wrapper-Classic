:: Starts up GoAnimate 2010 Offline
@echo off
if exist node_modules ( 
    npm start 
)
npm install && npm start