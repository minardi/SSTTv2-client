/* ContextMenu */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST["app/scripts/ContextMenu/ContextMenuCollectionTpl.ejs"],
        
        initialize: function() {
            this.collection = new module.Collection();
			this.collection.fetch();
        },

        subscriptions: {
            "ProjectPage:ProjectChecked": "setProject",
            "ContextMenu:Back": "toProjectPage",
            "ProjectPage:ProjectSelected": "toScrumPage",
            "ContextMenu:Team": "toTeamPage",
            "TeamPage:TeamSelected": "toTeamEditPage",
            "ContextMenu:BackFromTeamEditPage": "toTeamPage"
        },

        setProject: function(project) {
			this.current_page = "project_page";
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
            if(this.$context_menu) {
                this.$context_menu.remove();
            }
            this.$el.append(this.template());
            this.$context_menu = this.$(".ContextMenu");

            this.collection.each(this.renderOne, this);
            return this;
        },

        renderOne: function (btn_model) {
            var btn;
			
            if (this.canRender(btn_model.get("permission"))) {
                btn = new module.ModelView({
                        model: btn_model
                });
                this.$context_menu.append(btn.render().el);
            }
			
        },

        canRender: function (permission) {
            function checker(right) {
                return right === this.is_pm || 
                    right === this.current_page || 
                    right === this.user_role;
            }

            return _.any(permission.allowed_for, checker, this) && 
                !_.any(permission.denied_for, checker, this);
        }

    });

})(app.ContextMenu);