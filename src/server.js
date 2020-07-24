function repo() {
  // change this return value and you will generate a new "room"
  return "whalebears666999";
}
const IPFS = require("ipfs");
const Room = require("ipfs-pubsub-room");
const fs = require("fs");

let index = 1;
const ipfs = new IPFS({
  repo: repo(),
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: [
        "/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star",
      ],
    },
  },
});

ipfs.once("ready", () =>
  ipfs.id((err, info) => {
    if (err) {
      throw err;
    }
    console.log("IPFS node ready with address " + info.id);

    const room = Room(ipfs, info.id);

    room.on("peer joined", (peer) => console.log("peer " + peer + " joined"));
    // room.on('peer left', (peer) => console.log('peer ' + peer + ' left'))

    // // send and receive messages

    // room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer + '!'))
    // room.on('message', (message) => {
    //   console.log('got message from ' + message.from + ': ' + message.data.toString())
    //   if (message.from=='QmZRQ8wMSoHvM8w2M4mDBxXz7xQ9ZUyvdLqShZMe7muein'){
    //     console.log("message is from server")
    //   }
    // });

    // broadcast message every 2 seconds

    setInterval(() => addFile(), 5000);
    function addFile() {
      let fileStream = fs.createReadStream(`./images/${index}.png`);
      ipfs.files.add(fileStream, function (err, files) {
        console.log("added file ", files[0].hash);
        room.broadcast(files[0].hash);
      });
      index += 1;
      if (index > 3) {
        index = 1;
      }
    }
  })
);
