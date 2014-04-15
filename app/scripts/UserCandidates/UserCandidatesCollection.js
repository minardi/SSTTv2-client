/* TeamCandidates */

(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        initialize: function(team_id) {
            this.url = "/users-candidates/for-team/" + team_id;
            this.fetch();
        }

    });

})(app.UserCandidates);

