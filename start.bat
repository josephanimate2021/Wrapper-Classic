:: Starts up Wrapper Classic
@echo off
if exist node_modules ( 
    npm start 
)
npm install && npm start
