"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const controller_1 = require("./controller");
const Koa = require("koa");
const IO = require("socket.io");
const http_1 = require("http");
const app = new Koa();
const server = new http_1.Server(app.callback());
exports.io = IO(server);
const port = process.env.PORT || 5000;
routing_controllers_1.useKoaServer(app, {
    cors: true,
    controllers: [controller_1.default]
});
let player = {
    position: [0, 0]
};
exports.io.on("connection", function (socket) {
    console.log(`User  just connected`);
    socket.on('playerMovement', data => {
        player = data;
        exports.io.emit('playersMove-completed', player);
    });
    console.log(`User  just connected`);
    exports.io.emit('chat', "ciao");
    exports.io.emit('position', "position");
    let test = data.mov + 2;
    exports.io.emit("move-completed", test);
});
socket.on("disconnect", () => {
    console.log(`User  just disconnected`);
});
;
server.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=index.js.map