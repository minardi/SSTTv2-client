/* DashBoard */

(function(module) {

    module.Model = Backbone.Model.extend({

        defaults: {
            project_id: "",
            content: "",
            type: "",
            permition: []
        }
    });

})(app.DashBoard);
