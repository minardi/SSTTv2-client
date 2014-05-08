/* DashBoard */

(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        initialize: function() {

            this.add([
                {
                    content: "Back",
                    type: "back",
                    permition: {
                        "must_be": "",
                        "not": {
                            page: ["project_page", "team_edit_page"]
                        }
                    }
                },

                {
                    content: "BackFromTeamEditPage", 
                    type: "back",
                    permition: {
                        "must_be": {
                            page: ["team_edit_page"]
                        },
                        "not": ""
                    }
                },

                {
                    content: "Team",
                    type: "team",
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
                    type: "config",
                    permition: {
                        "must_be": {
                            right: ["pm"]
                        },
                        "not": {
                            page: ["scrum_page"]
                        }
                    }
                },               

                {
                    content: "Delete",
                    type: "delete",
                    permition: {
                        "must_be": {
                            right: ["pm"]
                        },
                        "not": {
                            page: ["scrum_page"]
                        }
                    }
                },

                {
                    content: "Configure",
                    type: "config",
                    permition: {
                        "must_be": {
                            role: ["techlead"]
                        },
                        "not": {
                            page: ["project_page", "team_page", "team_edit_page"]
                        }
                    }
                },

                {
                    content: "Delete",
                    type: "delete",
                    permition: {
                        "must_be": {
                            role: ["techlead"]
                        },
                        "not": {
                            page: ["project_page", "team_page", "team_edit_page"]
                        }
                    }
                } 

            ])
        }

    });

})(app.DashBoard);