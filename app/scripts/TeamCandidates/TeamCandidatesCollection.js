/* TeamCandidates*/

(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        initialize: function(team_id) {
            this.url = "/teams-candidates/for-team/" + team_id; /*routes.rb corrected and fetch() moved to View*/
        }

    });

})(app.TeamCandidates);

