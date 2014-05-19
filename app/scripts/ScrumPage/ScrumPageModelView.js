/* ScrumPage */

(function(module, sstt) {
    module.ModelView = Backbone.View.extend({

        template: JST["app/scripts/ScrumPage/ScrumPageTpl.ejs"],
		
        model: new app.ScrumPage.Model(),
        
        events: {
            "click #planning": "showPlanning",
            "click #scrumboard": "showScrum",
            "click #stat": "showStat"
        },

        subscriptions: {
            "ProjectPage:ProjectSelected": "renderDefaultTab",
            "ContextMenu:Team": "removeScrumPage",
            "ContextMenu:Back": "removeScrumPage"
			
        },

        showPlanning: function() {
            this.element.html("");
            mediator.pub("ScrumPage:PlanningBoardSelected", this.element);
        },

        showScrum: function() {
            mediator.pub("ScrumPage:ScrumBoardSelected", this.element);
        },

        showStat: function() {
            mediator.pub("ScrumPage:StatBoardSelected", this.element);
        },

        renderDefaultTab: function(project_id) {
            this.model.set('project_id', project_id);
            this.render();
            this.element = this.$el.find("#ScrumPage");

            this.showPlanning();

            mediator.pub("ScrumPage:Open", this.model.get('project_id'));
        },
        
         render: function() {
            this.$el.append(this.template());
            return this;
        },
        
        removeScrumPage: function() {
            this.$el.find(".scrum-page").remove();
        }
        
    });
})(app.ScrumPage, sstt);
