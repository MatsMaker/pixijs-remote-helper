# Pixijs remote helper

Tools for remote inspecting pixijs application


# For development start

You must have installed node.js then, clone this repo and next:

    npm i

    npm run server:dev

    npm run client:dev

    npm run mixin:dev

Then open http://localhost:8080/main.html for open client
and open http://localhost:3080/mixin.html for open mixin examle


![alt tag](preview.png)


# How use

First time need do:

    Clone this repository

    $cd ./pixijs-remote-helper

    $npm run build

    $npm i -g ../pixijs-remote-helper

    Add mixin(./mixin build/main.bundle.js) script to pixijs app page where need debugging

    Run app from terminal $pixihelper

    Then open client page on http://localhost:3030/main.html for debuggin

For example: you can to run mixin example client use

    $npm run mixin:dev

    Then open http://localhost:3080/mixin.html page with pixijs app
