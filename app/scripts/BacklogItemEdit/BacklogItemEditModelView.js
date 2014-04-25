/* BacklogItemEdit */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        _modelBinder: undefined,

        template: JST['app/scripts/BacklogItemEdit/BacklogItemEditTpl.ejs'],

        innerTemplate: {
            "story" : JST['app/scripts/BacklogItemEdit/BacklogItemEditStoryTpl.ejs'],
            "sprint" : JST['app/scripts/BacklogItemEdit/BacklogItemEditSprintTpl.ejs']
        },     

        initialize: function() {
            this.$el.append(this.template());
        },

        subscriptions: {
            "PlanningBoard:CreateNewItem" : "initItem",
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

            this.$(".edit-backlog-item").html(item_template(this.model.toJSON()));
            this.$(".edit-backlog-item").removeClass("hidden");
            
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

            this.hideView();
        },

        saveChanges: function() {
            this._modelBinder.bind(this.model, this.$el, null, {initialCopyDirection: Backbone.ModelBinder.Constants.ViewToModel});
            this.hideView();
            mediator.pub("BacklogItemEdit:SavedChanges", {
                                                            "model": this.model,
                                                            "is_new": this.is_new
                                                        });
        },

        hideView: function() {
            this.$(".edit-backlog-item").addClass("hidden");
        },

        close: function(){
            this._modelBinder.unbind();
        },
        
    });

})(app.BacklogItemEdit);

