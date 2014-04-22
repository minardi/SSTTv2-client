/* TeamMembers */

(function(module) {

    module.Model = Backbone.Model.extend({

        defaults: {
            first_name: '', 
            last_name: '',
            role: ''
        }

    });
    
})(app.TeamMembers);
