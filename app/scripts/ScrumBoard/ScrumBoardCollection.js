/* ScrumBoard */

(function (module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,     
           
        initialize: function (project_id) { 
            this.url = 'tasks/for-project/' + project_id;
                                         
        }       

    });

})(app.ScrumBoard);