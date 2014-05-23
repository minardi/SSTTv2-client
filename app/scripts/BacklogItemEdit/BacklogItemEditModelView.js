/* BacklogItemEdit */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        _modelBinder: undefined,

        template: {
            "task" : JST['app/scripts/BacklogItemEdit/BacklogItemEditTaskTpl.ejs'],
            "story" : JST['app/scripts/BacklogItemEdit/BacklogItemEditStoryTpl.ejs'],
            "sprint" : JST['app/scripts/BacklogItemEdit/BacklogItemEditSprintTpl.ejs']
        },     

        subscriptions: {
            "PlanningBoard:CreateNewItem" : "findActiveSprints",
            "ProductBacklog:EditStory" : "fillingFields",
            "ProductBacklog:CreateNewItem" : "initItem",
            "SprintBacklog:NoActiveSprints": "initItem",
            "SprintBacklog:ActiveSprintWasFound": "showConfirm",
			"SprintBacklog:CreateTask": "initItem"
        },  

        events: {
            "click .save_button" : "saveChanges",
            "click .cancel_button" : "cancelChanges"
        },

        findActiveSprints: function(attributes) {
            mediator.pub("BacklogItemEdit:TryToCreateSprint", attributes);
        },

        initItem: function(attributes) {
            this.model = new module.Model();
            this.model.set(attributes);

            this._modelBinder = new Backbone.ModelBinder();
            
            this.render();
        },

        fillingFields: function(model) {
            this.model = model;
            this._modelBinder = new Backbone.ModelBinder();
            
            this.render();
        },

        render: function() {
            var type = this.model.get("item_type");
                item_template = this.template[type];

            this.$el.html(item_template(this.model.toJSON()));

            this.$el.removeClass("hidden");
            $(".cover").removeClass("hidden");

            this._modelBinder.bind(this.model, this.$el);

            sstt.date_picker.render();

            return this;
        },

        hideView: function() {
            this.$el.addClass("hidden");
            $(".cover").addClass("hidden");
        },
        
        showConfirm: function() {

            sstt.confirmation.confirm({
                    title: "Stop Sprint?",
                    message: "Another active sprint was found. Would You like to stop it??",
                    confirmCallback: function() {
                        mediator.pub("BacklogItemEdit:StopSprintConfirmed", true);
                        mediator.pub("BacklogItemEdit:NeedToRerenderView");
                    }
                });
        },

        cancelChanges: function() {
            if(this.model.isNew()) {
                this.model.destroy();
            } else {
                this.model.set(this.model.previousAttributes());
            }

            this.modelUnbind();
            this.hideView();
        },

        saveChanges: function() {
            try {
                this.dataValidation();
                this.hideView();
                this.modelUnbind();

                mediator.pub("BacklogItemEdit:SavedChanges", this.model);

				if (this.model.get("item_type") === "task") {
					mediator.pub("BacklogItemEdit:TaskCreated", this.model);
				}
                
            } catch(e) {
                this.$(".error-box").html(e.message);
            }
        },

        dataValidation: function() {

            this.$(".required").each(function(i, el) {
                    if(!el.value.trim().length) {
                    $(el).addClass("blank");
                    throw new Error("Please, fill in the required fields");
                }
            });
        },

        modelUnbind: function() {
            this._modelBinder.unbind();
        }

    });

})(app.BacklogItemEdit);

