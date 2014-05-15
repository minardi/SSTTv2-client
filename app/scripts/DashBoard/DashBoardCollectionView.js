/* DashBoard */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST["app/scripts/DashBoard/DashBoardCollectionTpl.ejs"],
        
        initialize: function() {
            this.collection = new module.Collection();
			this.collection.on("sync", this.render, this);
			this.collection.fetch();
        },

        subscriptions: {
            "ProjectPage:ProjectChecked": "setProject",
            "DashBoard:ActiveBack": "toProjectPage",
            "ProjectPage:ProjectSelected": "toScrumPage",
            "DashBoard:ActiveTeam": "toTeamPage",
            "TeamPage:TeamSelected": "toTeamEditPage",
            "DashBoard:ActiveBackFromTeamEditPage": "toTeamPage",
        },

        setProject: function(project) {
            this.project = project;
            this.current_page = "project_page";
            this.render();
        },

        toProjectPage: function() {
            this.current_page = "project_page";
            this.render();
        },

        toScrumPage: function() {
            this.current_page = "scrum_page";
            this.render();
        },

        toTeamPage: function() {
            this.current_page = "team_page";
            this.render();
        },

        toTeamEditPage: function() {
            this.current_page = "team_edit_page";
            this.render();
        },

        render: function(project) {
            if(this.$dashboard) {
                this.$dashboard.remove();
            }
            this.$el.append(this.template());
            this.$dashboard = this.$(".dashboard");
            
            this.is_pm = true; //(this.project.get("pm").user_id == sstt.user.getId())? "pm": "not_pm";
            this.is_tl = sstt.user.getRoleInProject();

            this.collection.each(this.renderOne, this);
            return this;
        },

        renderOne: function (btn_model) {
            var btn;
            //btn_model.set("project_id", this.project.id);
            if (this.canRender(btn_model.get("permission"))) {
                btn = new module.ModelView({
                        model: btn_model
                });
                this.$dashboard.append(btn.render().el);
            };
        },

        canRender: function (permission) {
            var answer = true;

            if (permission.allowed_for) {
                _.each(permission.allowed_for, function(el) {
                        if (el !== this.is_pm) {
                            answer = false;
                        }
                    }
                , this)
            }

            if (permission.allowed_for) {
                _.each(permission.allowed_for, function(el) {
                        if (el !== this.current_page) {
                            answer = false;
                        }
                    }
                , this)
            }

            if (permission.allowed_for) {
                _.each(permission.allowed_for, function(el) {                   
                        if (el !== this.is_tl) {
                            answer = false;
                        }
                    }
                , this)
            }

            if (permission.denied_for) {
                _.each(permission.denied_for, function(el) {
                        if (el === this.is_pm) {
                            answer = false;
                        }
                    }
                , this)
            }

            if (permission.denied_for) {
                _.each(permission.denied_for, function(el) {
                        if (el === this.current_page) {
                            answer = false;
                        }
                    }
                , this)
            }

            return answer;
        }

    });

})(app.DashBoard);