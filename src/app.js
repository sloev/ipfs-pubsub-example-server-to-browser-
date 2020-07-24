// change the serverHash to reflect the output of `npm run start-http`
// > IPFS node ready with address QmTrs4KkyUXvjEhPKYnUhu1vUoy9e9yPpVytqnLsovNY6Y
//             use this output as serverHash ^
const serverHash = "QmTrs4KkyUXvjEhPKYnUhu1vUoy9e9yPpVytqnLsovNY6Y"
const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')

const ipfs = new IPFS({
  repo: repo(),
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
})

ipfs.once('ready', () => ipfs.id((err, info) => {
  if (err) { throw err }
  console.log('IPFS node ready with address ' + info.id)

  const room = Room(ipfs, serverHash)
  room.on('message', (message) => {
  if (message.from==serverHash){
    console.log('got message server ' + message.from + ': ' + message.data.toString())
    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode('got message server ' + message.from + ': ' + message.data.toString());         // Create a text node
    node.appendChild(textnode);      
    // console.log(document)
    // console.log(document.getElementById("myList"))                        // Append the text to <li>
    const fileHash = message.data.toString();
    var image = document.getElementById('myImg'); // IdOfImage is the id attribute of the img tag in your html page
    image.src = "https://ipfs.io/ipfs/" + fileHash;

    // ipfs.files.get(fileHash, function (err, files) {
    //   files.forEach((file) => {
    //     console.log("got image:", fileHash)
    //     })
    //   })
  }
});
}))

function repo () {
  return 'ipfs/pubsub-demo/' + Math.random()
}
