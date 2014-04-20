/* TeamMembers */

(function(module) {

    module.Model = Backbone.Model.extend({

        urlRoot: "/team_members",

        defaults: {
            first_name: '', 
            last_name: '',
            role: ''
        }

    });
    
})(app.TeamMembers);
