# Status QR Code Slackbot

A little Slackbot that scans messages in "find-friends" for public keys and turns them into QR codes.

### Install

Create a bot at https://my.slack.com/services/new/bot and obtain a token.

Replace `token` with yours.

Someone must manually invite the bot into the 'find-friends' channel:

    /invite @qrgen
        
### Run Tests

    npm install -g mocha
    mocha
   
### TODO

* Advise users who post an address instead of a public key
