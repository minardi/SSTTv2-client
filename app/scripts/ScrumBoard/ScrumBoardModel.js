/* ScrumBoard */

(function (module) {

    module.Model = Backbone.Model.extend({

        defaults: {
            title: "",
            status: "",
            description: "",
            story_id: "",
            sprint_id: ""
        }       
    });

})(app.ScrumBoard);
