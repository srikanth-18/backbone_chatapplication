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
 

  initialize: function(models,options) {
    this.options=options;
    alert("type="+JSON.stringify(this.options));
  },
      model: app.ChatModel,
      localStorage: new Store('Chats'+this.options),
      
    });
  // how to give parameter to collection??????????????
  //app.chat_collection = new app.ChatCollection({},{ id :2});
//------------
// Views
//-------------

var chathistory_collections=new Array();
  var current_chat_box=0;
   app.chatboxview=Backbone.View.extend({
  
  el: '#container',
  
   initialize:function(){
   //app.chat_collection.fetch(); 
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
    
   alert(JSON.stringify(chathistory_collections[0]));
    chathistory_collections[current_chat_box].fetch();
   
   chathistory_collections[current_chat_box].add(model);
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
   initialize:function(options){
    this.chatid=options.chatid;
    //alert((this.chatid));
    alert(chathistory_collections[current_chat_box]+"object");// check if they are initialized or not carefully
   chathistory_collections[current_chat_box].on("add",this.onChatAdded,this);
   },
onChatAdded:function(newchat){
    var newChat=new app.messageView({model:newchat})
    this.$el.append(newChat.render().$el);
   },
   render:function(chatid){
   var self=this;
alert("chatid1="+chatid);
alert(JSON.stringify(chathistory_collections[chatid]));
chathistory_collections[chatid].fetch();
   
   //alert(JSON.stringify(app.chat_collection)+"new data");
   chathistory_collections[chatid].each(function(chat){
   app.chatView2=new app.messageView({model:chat});
   self.$el.append(app.chatView2.render().$el);
   });

   }

   });

   

////////////////////////
///CHAT ROOM MODEL//////
////////////////////////


app.ChatRoomModel = Backbone.Model.extend({
      defaults: {
        chatroomname: '',
        chatid:'',
        chatcollection:''
     
      }
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
  //alert(app.chatroom_collection.length);
  alert("chatroom_collection.length="+app.chatroom_collection.length);
chathistory_collections[app.chatroom_collection.length]  = new app.ChatCollection({},{id:app.chatroom_collection.length});
alert(JSON.stringify(chathistory_collections[app.chatroom_collection.length])+"=JSONOBJECT");
/*var collection = new Messages([], { id: 2 });
collection.fetch();
*/
alert("created");
alert("value="+val);
alert("chathistory_collections[0]="+JSON.stringify(chathistory_collections[0]));
//alert("chatid="+id);
///////////////////////////
    this.addtolocalstorage(new app.ChatRoomModel({chatroomname: val,chatid:id,chatcollection:chathistory_collections[app.chatroom_collection.length]}));
   
   $(e.currentTarget).val('');
    return false;
      }
},


addtolocalstorage: function(model) {
    
   
    app.chatroom_collection.fetch();
   model.set("chatid",app.chatroom_collection.length); 
   alert("chatid="+model.get("chatid"));

   model.set("chatcollection",chathistory_collections[model.get("chatid")]);
   alert(JSON.stringify(model.get("chatcollection")));

   //model.set("chat_collection",app.chatroom_collection); 
   
   app.chatroom_collection.add(model);

    model.save();

   return;
 },
   });

  


    //////////////////////
app.ChatRoomView = Backbone.View.extend({
      tagName: 'li',
      
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
        this.model.destroy();
      },
     
      viewChatHistory:function(){
        
        var  MessagesviewObject=new app.messagesView({el:"#chathistory",chatid:this.model.get('chatid')});
          current_chat_box=this.model.get('chatid')

        alert(this.model.get('chatid')+"chatid=");
         MessagesviewObject.render(this.model.get('chatid'));
        
        

      }

 });
app.ChatRoomsView=Backbone.View.extend({

 tagName:'ul',
 initialize:function(){
 app.chatroom_collection.on("add",this.onChatRoomAdded,this);

 },
onChatRoomAdded:function(chatroom){
var ChatroomView2=new app.ChatRoomView({model:chatroom});
this.$el.append(ChatroomView2.render().$el);

},
onChatRoomRemoved:function(chatroom){
this.$("li#"+chatroom.id).remove();

},
render:function(){
var self=this;
chathistory_collections[app.chatroom_collection.length]  = new app.ChatCollection({},{id:app.chatroom_collection.length});
for(var i=0;i<=app.chatroom_collection.length;i++)
{
  chathistory_collections[i]  = new app.ChatCollection({},{id:i});
}

app.chatroom_collection.fetch();

//alert(app.chatroom_collection.length);
/*for(var i=0; i<app.chatroom_collection.length; i++) {
  app.chatroom_collection.models[i].set("chatid",i);
}*/

app.chatroom_collection.each(function(chatroom){

  var Chatroomview1=new app.ChatRoomView({model:chatroom});

  self.$el.append(Chatroomview1.render().$el);


});
alert(JSON.stringify(app.chatroom_collection));

}

});

app.chatroom_collection = new app.ChatroomCollection();     // instance of the Collection
var messageObject=new app.chatboxview();

var chatroomObject=new app.chatroomboxview();

    

var ChatroomObject=new app.ChatRoomsView({el:"#chatrooms"});
ChatroomObject.render();

