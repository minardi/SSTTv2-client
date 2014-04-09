/* Router */

(function(module) {

    module.Router = Backbone.Router.extend({

        routes: {
            "" : "index"
        },

        index: function() {
            console.log("I am Router");
        }

    });

})(app.Routing);