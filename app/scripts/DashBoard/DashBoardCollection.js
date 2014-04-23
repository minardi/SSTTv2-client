/* DashBoard */

(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        initialize: function() {

            this.add([
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
                        "not": ""
                    }
                },

                {
                    content: "Delete",
                    type: "delete",
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