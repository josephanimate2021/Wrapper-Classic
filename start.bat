:: Starts up Wrapper Classic
@echo off
if exist node_modules ( npm start ) else ( npm install && npm start )
