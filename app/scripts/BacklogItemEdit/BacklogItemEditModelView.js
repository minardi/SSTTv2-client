/* BacklogItemEdit */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        _modelBinder: undefined,

        innerTemplate: {
            "story" : JST['app/scripts/BacklogItemEdit/BacklogItemEditStoryTpl.ejs'],
            "sprint" : JST['app/scripts/BacklogItemEdit/BacklogItemEditSprintTpl.ejs']
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
            
            this.render();
        },

        fillingFields: function(model) {
            this.model = model;
            this._modelBinder = new Backbone.ModelBinder();
            
            this.render();
        },

        render: function() {
            var type = this.model.get("item_type");
                item_template = this.innerTemplate[type];

            this.$el.html(item_template(this.model.toJSON()));
            this.showHideView();
            
            return this;
        },

        cancelChanges: function() {
            if(this.model.isNew()) {
                this.model.destroy();
            }

            this.showHideView();
        },

        saveChanges: function() {
            try{
                this.dataValidation();
                this._modelBinder.bind(this.model, this.$el, null, {initialCopyDirection: Backbone.ModelBinder.Constants.ViewToModel});
                this.showHideView();
                mediator.pub("BacklogItemEdit:SavedChanges", this.model);

                this._modelBinder.unbind();
            } catch(e) {
                this.$el.append(e.message);
            }
        },

        dataValidation: function() {

            this.$(".required").each(function(i, el) {
                    if(!el.value.trim().length) {
                    el.style.border = "1px solid red";
                    //$(el).addClass("blank");
                    throw new Error("Please, fill in the required fields");
                }
            });
        },

        showHideView: function() {
            this.$el.toggleClass("hidden");
        }
        
    });

})(app.BacklogItemEdit);

