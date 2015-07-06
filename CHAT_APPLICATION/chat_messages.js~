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
   

