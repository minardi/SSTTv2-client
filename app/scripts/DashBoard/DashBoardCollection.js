/* DashBoard */

(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        initialize: function() {

            this.add([
                {
                    content: "Back",
                    glyph: "btn btn-info glyphicon glyphicon-arrow-left",
                    permition: {
                        "must_be": "",
                        "not": {
                            page: ["project_page", "team_edit_page"]
                        }
                    }
                },

                {
                    content: "BackFromTeamEditPage", 
                    glyph: "btn btn-info glyphicon glyphicon-arrow-left",
                    permition: {
                        "must_be": {
                            page: ["team_edit_page"]
                        },
                        "not": ""
                    }
                },

                {
                    content: "Team",
                    glyph: "btn btn-info glyphicon icon-team",
                    permition: {
                        "must_be": {
                            right: ["pm"]
                        },
                        "not": {
                            page: ["team_page", "team_edit_page"]
                        }
                    }
                },

                {
                    content: "Configure",
                    glyph: "btn btn-info glyphicon glyphicon-cog",
                    permition: {
                        "must_be": {
                            right: ["pm"]
                        },
                        "not": ""
                    }
                },

                {
                    content: "Delete",
                    glyph: "btn btn-info glyphicon glyphicon-remove",
                    permition: {
                        "must_be": {
                            right: ["pm"]
                        },
                        "not": ""
                    }
                } 
            ])
        }

    });

})(app.DashBoard);