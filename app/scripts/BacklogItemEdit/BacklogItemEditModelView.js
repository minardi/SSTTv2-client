/* BacklogItemEdit */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        _modelBinder: undefined,

        innerTemplate: {
            "story" : JST['app/scripts/BacklogItemEdit/BacklogItemEditStoryTpl.ejs'],
            "sprint" : JST['app/scripts/BacklogItemEdit/BacklogItemEditSprintTpl.ejs']
        },     

        initialize: function() {
            this.$editView = this.$(".edit-backlog-item");
        },

        subscriptions: {
            "PlanningBoard:CreateNewItem" : "initItem",
            "ProductBacklog:CreateNewItem" : "initItem",
            "ProductBacklog:EditStory" : "fillingFields",
            "ProductBacklog:SaveSprint" : "fillingFields"
        },  

        events: {
            "click .save_button" : "saveChanges",
            "click .cancel_button" : "cancelChanges"
        },

        initItem: function(attributes) {
            this.model = new module.Model();
            this.model.set(attributes);
            this._modelBinder = new Backbone.ModelBinder();

            this.is_new = true;
            
            this.render();
        },

        render: function() {
            var type = this.model.get("item_type");
                item_template = this.innerTemplate[type];

            this.$editView.html(item_template(this.model.toJSON()));
            this.showHideView();
            
            return this;
        },

        fillingFields: function(model) {
            this.model = model;
            this.is_new = false;
            this._modelBinder = new Backbone.ModelBinder();
            
            this.render();
        },

        cancelChanges: function() {
            if(this.is_new) {
                this.model.destroy();
            }

            this.showHideView();
        },

        saveChanges: function() {
            this._modelBinder.bind(this.model, this.$el, null, {initialCopyDirection: Backbone.ModelBinder.Constants.ViewToModel});
            this.showHideView();
            mediator.pub("BacklogItemEdit:SavedChanges", {
                                                            "model": this.model,
                                                            "is_new": this.is_new
                                                        });
        },

        showHideView: function() {
            this.$editView.toggleClass("hidden");
        },

        close: function(){
            this._modelBinder.unbind();
        },
        
    });

})(app.BacklogItemEdit);

