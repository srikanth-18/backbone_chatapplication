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
