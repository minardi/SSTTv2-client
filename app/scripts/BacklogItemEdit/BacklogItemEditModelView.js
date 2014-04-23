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

            this.$(".edit-backlog-item").html(item_template(this.model.toJSON()));
            this.$(".edit-backlog-item").removeClass("hidden");
            
            return this;
        },

        fillingFields: function(model) {
            this.model = model;
            this._modelBinder = new Backbone.ModelBinder();
            
            this.is_new = false;

            this.render();
        },

        cancelChanges: function() {
            if(this.is_new) {
                this.model.destroy();
            }

            this._modelBinder.unbind();
            this.hideView();
        },

        saveChanges: function() {
            this._modelBinder.bind(this.model, this.$el, null, {
                                    initialCopyDirection: Backbone.ModelBinder.Constants.ViewToModel
                                    });

            mediator.pub("BacklogItemEdit:SavedChanges", {
                                                            "model": this.model,
                                                            "is_new": this.is_new
                                                        });
            this._modelBinder.unbind();
            this.hideView();
        },

        hideView: function() {
            this.$(".edit-backlog-item").addClass("hidden");
        }
    });

})(app.BacklogItemEdit);

