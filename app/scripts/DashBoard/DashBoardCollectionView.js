/* DashBoard */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST["app/scripts/DashBoard/DashBoardCollectionTpl.ejs"],
        
        initialize: function() {
            this.collection = new module.Collection();
			this.collection.fetch();
        },

        subscriptions: {
            "ProjectPage:ProjectChecked": "setProject",
            "DashBoard:Back": "toProjectPage",
            "ProjectPage:ProjectSelected": "toScrumPage",
            "DashBoard:Team": "toTeamPage",
            "TeamPage:TeamSelected": "toTeamEditPage",
            "DashBoard:BackFromTeamEditPage": "toTeamPage",
        },

        setProject: function(project) {
			this.user_role = sstt.user.getRoleInProject();
			this.is_pm = (project.get("pm").user_id == sstt.user.getId())? "pm": false;
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

        render: function() {
            if(this.$dashboard) {
                this.$dashboard.remove();
            }
            this.$el.append(this.template());
            this.$dashboard = this.$(".dashboard");

            this.collection.each(this.renderOne, this);
            return this;
        },

        renderOne: function (btn_model) {
            var btn;
			
            if (this.canRender(btn_model.get("permission"))) {
                btn = new module.ModelView({
                        model: btn_model
                });
                this.$dashboard.append(btn.render().el);
            }
			
        },

        canRender: function (permission) {
            var answer = true;

            if (permission.allowed_for) {
                _.each(permission.allowed_for, allowChecker, this);
				console.log ("allowChecker gives final answer");
				console.log (answer);
            }
			
			if (permission.denied_for) {
                _.each(permission.denied_for, denyChecker, this);
				console.log ("denyChecker gives final answer");
				console.log (answer);
            }
			
			function allowChecker(right) {
				if (right !== this.is_pm) {
                    answer = false;
                } 
				if (right !== this.current_page) {
					answer = false;
				} 
				if (right !== this.user_role) {
					answer = false;
				}
			}
			
			function denyChecker(right) {
				if (right === this.is_pm) {
                    answer = false;
                } 
				if (right === this.current_page) {
					answer = false;
				} 
				if (right === this.user_role) {
					answer = false;
				}
			}

            return answer;
        }

    });

})(app.DashBoard);