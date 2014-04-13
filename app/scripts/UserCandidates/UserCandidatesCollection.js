/* UserCandidates  - rename to Candidates*/

(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        initialize: function(team_id) {
            this.url = "/users-candidats/for-team/" + team_id; /*correct to candidatEs here and in routes.rb*/
            this.fetch();
        }

    });

})(app.UserCandidates);

