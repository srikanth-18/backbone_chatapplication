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
/