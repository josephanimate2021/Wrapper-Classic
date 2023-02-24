@echo off
:: Starts Up Wrapper Classic
if exist node_modules (
    npm start
) else (
    npm install && npm start
)