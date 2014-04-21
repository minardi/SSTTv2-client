/* SprintBacklogStories */

(function(module) {

    module.Model = Backbone.Model.extend({

        defaults: {
            title: "",
            description: "",
            sprint_id: ""
        } 

    });

})(app.SprintBacklogStories);
