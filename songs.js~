
var Song=Backbone.Model.extend();
var Songs=Backbone.Collection.extend({

  model:Song
});

var SongView=Backbone.View.extend({
  
   tagName:"li",
   render:function(){
  this.$el.html(this.model.get("title"));
   return this;
   }

  });
  

   var SongsView=Backbone.View.extend({
   tagName: "ul",

   render:function(){
  
    var self=this;
    this.model.each(function(song){
   var songView=new SongView({model:song});
   self.$el.append(songView.render().$el);
  

    });

   },


   });
  

var  songs=new Songs([new Song({title:"Blue in Green"}),new Song({title:"so what"})]);
   var songsView=new SongsView({el:"#songs", model:songs });
   songsView.render();
   //songsview1.render();
