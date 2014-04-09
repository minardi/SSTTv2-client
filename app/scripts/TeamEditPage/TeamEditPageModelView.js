/* TeamEditPage */

(function(module) {
        
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
            "DashBoard:ActiveBack": "removeTeamPage",
            "DashBoard:ActiveBackFromTeamEditPage": "removeTeamPage",
             "TeamMembers:Saved": "showSaveMsg"
        },     

        showWatchers: function () {            
            mediator.pub("TeamEditPage:TabSelected", "watcher");
        },

        showDevelopers: function () {
            mediator.pub("TeamEditPage:TabSelected", "developer");
        },

        showTeachLeads: function () {
            mediator.pub("TeamEditPage:TabSelected", "techlead");
        },         
        
        showSaveMsg: function() {
            this.$el.find("#save_confirm").removeClass();
        },     
                
        hideConfirm: function() {
            this.$el.find("#save_confirm").addClass("hidden");
        },
        
        render: function(team_id) {            
            this.$el.append(this.template());           
            mediator.pub("TeamEditPage:Open", { element: this.$el, team_id: team_id });            
            this.showWatchers();
            return this;
        },   
               
        removeTeamPage: function() {
            this.$el.removeClass("hiddenTeams");
            this.$el.find(".team-edit-page").remove();
        }
    });

})(app.TeamEditPage);
