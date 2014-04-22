/* TeamEditPage */

(function(module) {
        
    module.ModelView = Backbone.View.extend({	     
 		
        template: JST['app/scripts/TeamEditPage/TeamEditPageTpl.ejs'],        
        
        events: {
            "click .watchers": "showWatchers",
            "click .developers": "showDevelopers",
            "click .techleads": "showTeachLeads",
            "click .tab": "setRoleTabActive",
            "click #ok_btn": "hideConfirm"
        },

        subscriptions: {         
            "TeamPage:teamSelected": "render",
            "DashBoard:activeBack": "removeTeamPage",
            "DashBoard:activeBackFromTeamEditPage": "removeTeamPage",
            "TeamMembers:saved": "showSaveMsg"
        }, 

        initialize: function () {
            this.render();
        },

        render: function() {     
            this.$el.html(this.template()); 
            
            this.$candidates = this.$(".candidates");
            this.$team_members = this.$(".team-members");

            mediator.pub("TeamEditPage:loadCandidates", this.$candidates);
            mediator.pub("TeamEditPage:loadTeamMembers", this.$team_members);

            this.showWatchers();

            return this;
        },

        setRoleTabActive: function (event) {
            this.$(".tab").removeClass("active-role");
            $(event.target).addClass("active-role");
        },

        showWatchers: function () {            
            mediator.pub("TeamEditPage:roleSetUp", "watcher");
        },

        showDevelopers: function () {
            mediator.pub("TeamEditPage:roleSetUp", "developer");
        },

        showTeachLeads: function () {
            mediator.pub("TeamEditPage:roleSetUp", "techlead");
        },         
        
        showSaveMsg: function() {
            this.$el.find("#save_confirm").removeClass();
        },     
                
        hideConfirm: function() {
            this.$el.find("#save_confirm").addClass("hidden");
        },
               
        removeTeamPage: function() {
            this.$el.removeClass("hiddenTeams");
            this.$(".team-edit-page").remove();
        }
        
    });

})(app.TeamEditPage);
