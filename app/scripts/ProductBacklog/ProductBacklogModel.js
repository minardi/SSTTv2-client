/* ProductBacklog */

(function(module) {

    module.Model = Backbone.Model.extend({

        defaults: {
            title: "",
            description: "",
            project_id: "",
            state: ""
        }

    });

})(app.ProductBacklog);