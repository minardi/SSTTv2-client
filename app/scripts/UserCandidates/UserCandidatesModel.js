/* UserCandidates */

(function(module) {

    module.Model = Backbone.Model.extend({
         
        defaults: {
           first_name: '', 
           last_name: '',
           role: ''
        },

        toTeamMemberAttributes: function() {
            return {
                first_name: this.get("first_name"), 
                last_name: this.get("last_name"),
                role: this.get("role"),
                user_id: this.get("id")
            };
        }

    });

})(app.UserCandidates);
