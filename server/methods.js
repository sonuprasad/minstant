Meteor.methods({
  sendMessage: function (chatId, text) {
    
    if (this.userId) {

      var chat = Chats.findOne({
        _id: chatId
      });

      if (chat) { // ok - we have a chat to use
        var msgs = chat.messages; // pull the messages property
        if (!msgs) { // no messages yet, create a new array
          msgs = [];
        }

        msgs.push({
          timeStamp: new Date().toUTCString(),
          sentBy: this.userId,
          text: text
        });

        chat.messages = msgs; // put the messages array onto the chat object
        Chats.update(chat._id, chat); // update the chat object in the database.
        return "chat updated " + new Date().toISOString();
      }
    }
  }
});