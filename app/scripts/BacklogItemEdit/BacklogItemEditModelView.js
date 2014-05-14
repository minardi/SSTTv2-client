/* BacklogItemEdit */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        _modelBinder: undefined,

        template: {
            "story" : JST['app/scripts/BacklogItemEdit/BacklogItemEditStoryTpl.ejs'],
            "sprint" : JST['app/scripts/BacklogItemEdit/BacklogItemEditSprintTpl.ejs'],
            "confirm": JST['app/scripts/BacklogItemEdit/BacklogItemEditDialogTpl.ejs']
        },     

        subscriptions: {
            "PlanningBoard:CreateNewItem" : "findActiveSprints",
            "ProductBacklog:EditStory" : "fillingFields",
            "ProductBacklog:CreateNewItem" : "initItem",
            "SprintBacklog:NoActiveSprints": "initItem",
            "SprintBacklog:ActiveSprintWasFound": "showConfirm"
        },  

        events: {
            "click .save_button" : "saveChanges",
            "click .cancel_button" : "cancelChanges",
            "click .ok_button" : "stopSprint",
            "click .no_button" : "showHideView"
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

            sstt.date_picker.render();

            this.showHideView();
            
            return this;
        },

        showHideView: function() {
            this.$el.toggleClass("hidden");
        },
        
        showConfirm: function() {
            this.$el.html(this.template["confirm"]);
            this.$el.toggleClass("hidden");
        },

        stopSprint: function() {
            mediator.pub("BacklogItemEdit:StopSprintConfirmed", true);
            mediator.pub("BacklogItemEdit:NeedToRerenderView");

            this.showHideView();
        },

        cancelChanges: function() {
            if(this.model.isNew()) {
                this.model.destroy();
            }

            this.showHideView();
        },

        saveChanges: function() {
            try {
                this.dataValidation();
                this._modelBinder.bind(this.model, this.$el, null, 
                    {initialCopyDirection: Backbone.ModelBinder.Constants.ViewToModel});
                this.showHideView();
                
                mediator.pub("BacklogItemEdit:SavedChanges", this.model);

                this._modelBinder.unbind();
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
        }

    });

})(app.BacklogItemEdit);

