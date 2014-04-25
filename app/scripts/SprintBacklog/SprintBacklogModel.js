/* SprintBacklog */

/*(function(module) {

    module.Model = Backbone.Model.extend({

        defaults: {
            title: "",
            description: "",
            sprint_id: ""
        } 

    });

})(app.SprintBacklog);*/

app.SprintBacklog.Model = app.BacklogItem.Model;