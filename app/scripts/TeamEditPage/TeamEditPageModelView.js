/* TeamEditPage */

(function(module, sstt) {
        
    module.ModelView = Backbone.View.extend({	     
 		
        template: JST['app/scripts/TeamEditPage/TeamEditPageTpl.ejs'],        
        
        events: {
            "click #watchers": "showWatchers",
            "click #developers": "showDevelopers",
            "click #techleads": "showTeachLeads",
            "click #ok_btn": "hideConfirm"
        },

        subscriptions: {         
            "TeamPage:TeamSelected": "render",
            "ContextMenu:Back": "removeTeamPage",
            "ContextMenu:BackFromTeamEditPage": "removeTeamPage"
        }, 

        render: function(team_id) {     
            this.$el.append(this.template());           
            mediator.pub("TeamEditPage:Open", { element: this.$el, 
                                                team_id: team_id 
                                                });            
            this.showWatchers();

            return this;
        },       

        showWatchers: function() {            
            mediator.pub("TeamEditPage:RoleSetUp", "watcher");
        },

        showDevelopers: function() {
            mediator.pub("TeamEditPage:RoleSetUp", "developer");
        },

        showTeachLeads: function() {
            mediator.pub("TeamEditPage:RoleSetUp", "techlead");
        },

        hideConfirm: function() {
            this.$el.find("#save_confirm").addClass("hidden");
        },
               
        removeTeamPage: function() {
            this.$el.removeClass("hiddenTeams");
            this.$el.find(".team-edit-page").remove();
        }
        
    });

})(app.TeamEditPage, sstt);
