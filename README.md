# Pixijs remote helper

Tools for remote inspecting pixijs application


# For development datart

You must have installed node.js then, clone this repo and next:

    npm i

    npm run server:dev

    npm run client:dev

    npm run mixin:dev

Then open http//:localhost:8080/main.html for open client
and open http//:localhost:3080/mixin.html for open mixin examle


# How use

First time need do:

    Build you mixin.js client:

    npm run mixin:prod

    Build client:

    npm run client:prod

    Run server

    npm run server:dev

    Need connect mixin.js(from mixin_build folder)  app to your pixijs page. Then run sever side
    Then open client page on http://localhost:3030/main.html and use

For all other time need inject mixin to site and run only server and open client page
