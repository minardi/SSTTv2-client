/* UserCandidates - rename to Candidates*/ 

(function(module) {

    module.Model = Backbone.Model.extend({
         
        defaults: {
           first_name: '', 
           last_name: '',
           role: ''
        },

        toTeamMemberAttributes: function() {      /*WE DON'T NEED THIS! change this long caption to setAsMember  */
            return { /*returns attributes hash of 'this' into TeamMemColView.addToCol(), why don't to return the model with 'return this' */
                first_name: this.get("first_name"), 
                last_name: this.get("last_name"),
                role: this.get("role"),
                user_id: this.get("id")
            };
        }

    });

})(app.UserCandidates);
