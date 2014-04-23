/* Projectinfo */

(function(module) {

    module.Model = Backbone.Model.extend({       

        initialize: function (options) {
            this.urlRoot = "projects/info/" + options.project_id;
        },

        defaults: {
            title: "",
            description: "",
            owner: "",
            start: "",
            finish: "",
            role: "",
            pm: { 
                user_id: "",
                first_name: "",
                last_name: ""
            }
        }

    });

})(app.Projectinfo);
