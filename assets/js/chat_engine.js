//acting as a client

class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        //tries to connect ->client
        this.socket = io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    userJoin(data){
        let self = this;
        let newJoine = "You joined the room "
                if(data.user_email != self.userEmail){
                    newJoine = data.user_email + " joined the room"; 
                }
                let newMessage = $('<li>');
                newMessage.append($('<span>', {
                    'html': newJoine
                }));
                newMessage.append('<br>');
                newMessage.addClass('user-join');
                $('#chat-messages-list').append(newMessage);
                
    }
    previousChat(chat){
        let self = this;
        let oldMessage = $('<li>');
            let messageType = 'other-message';
            if(chat.user == self.userEmail){
                messageType = 'self-message';
            }
            oldMessage.append($('<span>', {
                'html': chat.message
            }));
            oldMessage.append($('<sub>', {
                'html': chat.user
            }));
            oldMessage.addClass(messageType);
            $('#chat-messages-list').append(oldMessage);
    }
    connectionHandler(){
        
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets');


            //join room is created if not, else previous one is used
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial',
                socketId: self.socket.id
            });
            // self.socket.emit('getold',{
            //     user: self.userEmail
            // })
            self.socket.on('get_message', function(chats){
                for(let i = 0; i < chats.length; i++){
                    self.previousChat(chats[i]);
                }
            });
            self.socket.on('user_joined', function(data){
                self.userJoin(data);
            })
        });

        //send a message on clicking the send message button
        $('#send-message').click(function(){
            console.log('Button clicked');
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });
        
        self.socket.on('receive_message', function(data){
            console.log('message_received', data.message);
            let newMessage = $('<li>');
            let messageType = 'other-message';
            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }
            newMessage.append($('<span>', {
                'html': data.message
            }));
            newMessage.append($('<sub>', {
                'html': data.user_email
            }));
            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        })
    }
}