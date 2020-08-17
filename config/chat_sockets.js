const RChat = require('../models/broadcast_chat');
//acting as a chat server
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    //connection request received
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });

        //https://socket.io/docs/emit-cheatsheet/
        // https://socket.io/docs/rooms/
        //chat room
        socket.on('join_room', async function(data){
            console.log('joining request', data);
            socket.join(data.chatroom);
            //adding previous chats on loading
            let prevChat = await RChat.find({}, function(err, chats){
                if(err){
                    console.log(err);
                    return;
                }
                // console.log(chats);
                return chats;
            });
            io.to(data.socketId).emit('get_message', prevChat);//this for the user who just joined the group
            io.to(data.chatroom).emit('user_joined', data);//emitting messages to all the users in chat room
                // console.log(data.chatroom, val);
           
        });

        //detect send_message annd broadcast to everyone in the room
        socket.on('send_message', async function(data){
            io.in(data.chatroom).emit('receive_message', data);
            await RChat.create({
                user: data.user_email,
                message: data.message
            });
        });
    })
}