var app = {}; // create namespace for our app
 
       app.ChatModel = Backbone.Model.extend({
      defaults: {
        message: '',
      }
      });  

    //--------------
    // Collections
    //--------------
    app.ChatCollection = Backbone.Collection.extend({
      model: app.ChatModel,
      localStorage: new Store('Chatbox')
    });
  
   app.chat_collection = new app.ChatCollection();
//------------
// Views
//-------------

   app.chatboxview=Backbone.View.extend({
  
  el: '#container',
  
   initialize:function(){
   app.chat_collection.fetch(); 
   // uncomment this in case of any error
 //  app.chat_collection.on("add",this.onChatAdded,this);
    this.chatbox();
   },
   
   chatbox:function(){
   this.$el.html("<b> Message </b>"+" <input type='text' id='messages' size='50'>");
   return this;
    },


   events:{
      'keypress #messages':'submitHandler',
    },

submitHandler:function(e){
//    alert("keypress");
    if(e.which==13)
      {
      var val = $(e.currentTarget).val();
    for(var i=0;i<val.length;i++)
    {
     if(val.charAt(i)==':')
     {
      var user=val.substr(0,(i));
      break;
     }
    
    
    }
var message_typed=val.substr(i+1,val.length-1);
val=user+" says "+message_typed;

    this.addtolocalstorage(new app.ChatModel({message: val}))  ;
   $(e.currentTarget).val('');
    return false;
      }
},


addtolocalstorage: function(model) {
    
   
    app.chat_collection.fetch();
   
   app.chat_collection.add(model);
    model.save();

   return;
 },
   });

   app.messageView=Backbone.View.extend({
   tagName: "li",
    render:function(){
      this.$el.html(this.model.get("message"));
   return this;
    },

});
   
   app.messagesView=Backbone.View.extend({
   
   tagName: "ul",
   initialize:function(){
   app.chat_collection.on("add",this.onChatAdded,this);
   },
onChatAdded:function(newchat){
    var newChat=new app.messageView({model:newchat})
    this.$el.append(newChat.render().$el);
   },
   render:function(){
   var self=this;
   app.chat_collection.fetch();
   //alert(JSON.stringify(app.chat_collection)+"new data");
   app.chat_collection.each(function(chat){
   app.chatView2=new app.messageView({model:chat});
   self.$el.append(app.chatView2.render().$el);
   });

   }

   });

   var  MessagesviewObject=new app.messagesView({el:"#chathistory"});
   MessagesviewObject.render();
   var messageObject=new app.chatboxview();
/////////////////
//USERS MODEL///
////////////////
       app.User = Backbone.Model.extend({
      defaults: {
        Username: '',
      }
      });  
/////////////////
//USERS COLLECTION///
////////////////

   app.UsersCollection = Backbone.Collection.extend({
      model: app.Users,
      localStorage: new Store('UserStorage')
    });
  
   app.users_collection = new app.UsersCollection([new app.User({Username:"SPOORTHY"}),new app.User({Username:"GANESH"}),new app.User({Username:"LAKSHMI"}),new app.User({Username:"SRIKANTH"})]);    
/////////////////
//USERS VIEW///
////////////////

   app.UserView=Backbone.View.extend({
   tagName:"li",
  
  initialize:function(){

    //this.$el.addClass('notclicked');
    
  },

   render:function(){
      
      this.$el.html(this.model.get("Username"));
      return this;
   },
    
   });
   
  app.UsersView=Backbone.View.extend({

   tagName:"ul",
   render:function(){

   var self=this;
   app.users_collection.each(function(user){
   
   var userview1=new app.UserView({model:user});
   self.$el.append(userview1.render().$el);


   })

   },

  });

var usersView1=new app.UsersView({el:"#users"});
usersView1.render();

/////////////////////
//CHAT ROOM MODEL////
/////////////////////

         app.ChatRoomModel = Backbone.Model.extend({
      defaults: {
        chatroomname: ''
      }
      });  

/////////////////////////
//CHAT ROOM COLLECTION///
/////////////////////////
    app.ChatRoomCollection = Backbone.Collection.extend({
      model: app.ChatRoomModel,
      localStorage: new Store('Chatroom')
    });
  
   app.chatroom_collection = new app.ChatRoomCollection();
////////////////////////
//CHAT ROOM VIEW////////
////////////////////////


   app.chatroomboxview=Backbone.View.extend({
  
  el: '#chatroomcontainer',
  
   initialize:function(){
   app.chatroom_collection.fetch(); 
//   app.chatroom_collection.on("add",this.onChatRoomAdded,this);
    this.chatroombox();
   },
   
   chatroombox:function(){
   this.$el.html("<b> New Chat Room Name </b>"+" <input type='text' id='chatroomname' size='30'>");
   return this;
    },


   events:{
      'keypress #chatroomname':'submitHandler',
    },

submitHandler:function(e){
    //alert("keypress");
    if(e.which==13)
      {
      var val = $(e.currentTarget).val();
      //alert(val);
    this.addtolocalstorage(new app.ChatRoomModel({chatroomname: val}))  ;
   $(e.currentTarget).val('');
    return false;
      }
},


addtolocalstorage: function(model) {
    
   
    app.chatroom_collection.fetch();
   
   app.chatroom_collection.add(model);
    alert("added");
    model.save();

   return;
 },
   });

  
  

    app.ChatRoomView=Backbone.View.extend({
   tagName:"li",

   initialize: function(){       
       this.model.on('destroy', this.remove, this); 
      },
  
 events: {
        'click .destroy': 'destroy'
        
      },

   render:function(){
 
      this.$el.html(this.model.get("chatroomname")+"<button class='destroy'>remove</button>");

      return this;
   },

   destroy:function(){

      this.model.destroy();
   },
   viewchathistory:function(){

alert(this.$el.attr("id"));

   }



    
   });
 

   app.ChatRoomsView=Backbone.View.extend({

   tagName:"ul",

      initialize:function(){
   app.chatroom_collection.on("add",this.onChatRoomAdded,this);
   },
onChatRoomAdded:function(newchatroom){
  alert("adding new chatroom");
    var newChatroom=new app.ChatRoomView({model:newchatroom})
    this.$el.append(newChatroom.render().$el);
   },

   render:function(){
   var self=this;
   app.chatroom_collection.fetch();
   app.chatroom_collection.each(function(chatroom){
   
   var chatroomview1=new app.ChatRoomView({model:chatroom});
   self.$el.append(chatroomview1.render().$el);
   
   })

   },

  });

var chatroomsView1=new app.ChatRoomsView({el:"#chatrooms"});
chatroomsView1.render();
var chatroomObject=new app.chatroomboxview();
