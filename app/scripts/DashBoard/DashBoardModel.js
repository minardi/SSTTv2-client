/* DashBoard */

(function(module) {

    module.Model = Backbone.Model.extend({

        defaults: {
            content: "",
            type: "",
            permission: []
        }
    });

})(app.DashBoard);
