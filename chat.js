var app = {};  
var totalchatrooms=0; 
       app.ChatModel = Backbone.Model.extend({
      defaults: {
        message: '',
        chatroomid: ''
      }
      });  

    //--------------
    // Collections
    //--------------
    app.ChatCollection = Backbone.Collection.extend({
      model: app.ChatModel,
      localStorage: new Store('Chathistory2'),
      getTeam:function(idChatroom){

   var gf=_.filter(this.models,function(model){

    return (model.get('chatroomid')=='idChatroom');
   });
   return gf;

      }
    });
  
   app.chat_collection = new app.ChatCollection();
//------------
// Views
//-------------
//////////////////////



Backbone.View = Backbone.View.extend({
  remove: function() {
    // Empty the element and remove it from the DOM while preserving events
  this.undelegateEvents();
    this.$el.empty();
    //this.stopListening();
    return this;

  }
})

//////////////////////////////
var current_chatroom=0;
   app.chatboxview=Backbone.View.extend({
  
  el: '#container',
  
   initialize:function(){
   app.chat_collection.fetch(); 
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
alert(val);

    this.addtolocalstorage(new app.ChatModel({message: val}))  ;
   $(e.currentTarget).val('');
   
    return false;
      }
},


addtolocalstorage: function(model) {
    
   
    app.chat_collection.fetch();
    model.set('chatroomid',current_chatroom);
   alert(JSON.stringify(model));
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
   alert("current_chatroom="+current_chatroom);
   //alert(JSON.stringify(app.chat_collection)+"new data");
   app.chat_collection.each(function(chat){
    if(chat.get('chatroomid')==current_chatroom){

   app.chatView2=new app.messageView({model:chat});
   self.$el.append(app.chatView2.render().$el);

    }
   });

   }

   });

   var  MessagesviewObject=new app.messagesView({el:"#chathistory"});
   MessagesviewObject.render();
   var currentview=null;
   var messageObject=new app.chatboxview();
   

app.ChatRoomModel = Backbone.Model.extend({
   
        chatroomname: '',
        chatid:'',
      //  chats: app.chat_collection(this.get('chatroomid'))
   
});
////////////////////////
///CHAT ROOM COLLECTION//////
////////////////////////

// to push use app.chathistroy_collection.push();

app.ChatroomCollection = Backbone.Collection.extend({// creating a collection class
      model: app.ChatRoomModel,// we have to include a model 
      localStorage: new Store("Chatrooms")// the data is stored presently at a  local storage 
        // chat_collection:'' //instance of chathistory 
    });


    app.chatroom_collection = new app.ChatroomCollection();     // instance of the Collection

//--------------
    // CHAT ROOM Views
    //--------------
    var id=0;
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
  
    this.addtolocalstorage(new app.ChatRoomModel({chatroomname: val}));
   
   $(e.currentTarget).val('');
    return false;
      }
},


addtolocalstorage: function(model) {
    
   
    app.chatroom_collection.fetch();
    //totalchatrooms++;
   model.set("chatid",app.chatroom_collection.length); 
   //model.set("chat_collection",app.chatroom_collection); 
   
   app.chatroom_collection.add(model);
   
   // alert("added");
    model.save();

   return;
 },
   });

  


    //////////////////////
app.ChatRoomView = Backbone.View.extend({
      tagName: 'li',// every view has an el property by default it is set to div tag to change it use "tagname";
      
      initialize:function(){
               this.model.on('destroy', this.remove, this);

      },

      events: {
        'click .destroy': 'destroy',
          'click .view': 'viewChatHistory'
      },
     
     render:function(){
     this.$el.html(this.model.get("chatroomname")+"<button class='destroy'>remove</button>"+"<button class='view'>view</button>");
     return this;

     },

      destroy: function(){
        //alert("removing");
        //alert(JSON.stringify(this.model));
        var chatroom_to_delete=this.model.get('chatid');
      /////////////////////////////////
/*app.chat_collection.fetch();
app.chat_collection.remove(app.chat_collection.where({chatroomid: chatroom_to_delete}))
 
 alert("New app.chat_collection data=\n"+JSON.stringify(app.chat_collection));
*/
app.chat_collection.fetch();
/*_.chain(app.chat_collection).clone().each(function(model){
//console.log('deleting model ' + model.id);
alert(model.get('chatroomid')+"chatroomid");
if(model.get('chatroomid')==chatroom_to_delete)
model.destroy();

});*/



  app.chat_collection.each(function(model) {
if(model.get('chatroomid')==chatroom_to_delete)
 model.destroy(); 
});


 alert("New app.chat_collection data=\n"+JSON.stringify(app.chat_collection));
//////////////////////////////////
        this.model.destroy();
      },
     
      viewChatHistory:function(){
        current_chatroom=this.model.get('chatid');
       alert("new current_chatroom="+current_chatroom);
   MessagesviewObject.remove();    
   //currentview=new app.messagesView()
   //$(MessagesviewObject.el).empty().detach();
//MessagesviewObject=new app.messagesView({el:"#chathistory"});
   //MessagesviewObject.render();
   app.chat_collection.fetch();
       app.chat_collection.each(function(chat){
    if(chat.get('chatroomid')==current_chatroom){

   app.chatView2=new app.messageView({model:chat});
   MessagesviewObject.$el.append(app.chatView2.render().$el);

    }
   });
        //alert(this.model.get('chatid'));
      }

 });
app.ChatRoomsView=Backbone.View.extend({

 tagName:'ul',
 initialize:function(){
 app.chatroom_collection.on("add",this.onChatRoomAdded,this);
app.chatroom_collection.on("remove",this.onChatRoomRemoved,this);
 },
onChatRoomAdded:function(chatroom){
var ChatroomView2=new app.ChatRoomView({model:chatroom});
this.$el.append(ChatroomView2.render().$el);

},
onChatRoomRemoved:function(chatroom){
  alert("HAI");
this.$("li#"+chatroom.id).remove();

},
render:function(){
var self=this;

app.chatroom_collection.fetch();

//alert(app.chatroom_collection.length);
for(var i=0; i<app.chatroom_collection.length; i++) {
  app.chatroom_collection.models[i].set("chatid",i);
}

app.chatroom_collection.each(function(chatroom){

  var Chatroomview1=new app.ChatRoomView({model:chatroom});

  self.$el.append(Chatroomview1.render().$el);
});

}

});

var chatroomObject=new app.chatroomboxview();

var ChatroomObject=new app.ChatRoomsView({el:"#chatrooms"});
ChatroomObject.render();
