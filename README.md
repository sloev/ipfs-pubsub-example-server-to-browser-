# IPFS pubsub example (server to browser client thru ipfs)

<a href="https://www.buymeacoffee.com/sloev" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-pink.png" alt="Buy Me A Coffee" height="51px" width="217px"></a>

server:
* cycles through image files in a folder
* adds them one by one to ipfs
* publishes a message containing the files ipfs hash to ipfs a pubsub room

client:
* listens to pubsub room
* on message: checks if message is from server (all topics are public, its ur job to check origin)
* takes hash from message and uses it to fetch the ipfs object for that hash
* updates an img.src with the contents (here i am cheeting since i couldnt get the whole file.bytes ot img.src to work, so i just use an ipfs gateway/filehash as img.src)

## install

```
$ npm install
```

## usage

1. change the `repo() return value` in [src/server.js](./src/server.js) to be the room name you want (the final topicname will be a hash generated by this).
2. run `npm run start-ipfs-server` to get the following line: `IPFS node ready with address YOURHASH`
3. change the `serverHash` in [src/app.js](./src/app.js) to be `YOURHASH`
4. run `npm run compile`
5. run `npm run start-ipfs-server`
6. for local client: `npm run start-http` and open `http://127.0.0.1:12345` 
7. for remote client: upload the [public](./public/) folder to somewhere, like github
