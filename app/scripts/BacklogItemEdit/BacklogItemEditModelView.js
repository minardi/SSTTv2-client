/* BacklogItemEdit */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        template: JST['app/scripts/BacklogItemEdit/BacklogItemEditTpl.ejs'],
        innerTemplate: {
            "story" : JST['app/scripts/BacklogItemEdit/BacklogItemEditStoryTpl.ejs'],
            "sprint" : JST['app/scripts/BacklogItemEdit/BacklogItemEditSprintTpl.ejs']
        },     

        initialize: function() {
            this.$el.append(this.template());
        },

        subscriptions: {
            "ProductBacklog:CreateNewItem" : "render",
            "ProductBacklog:editStory" : "fillingFields"
        },  

        events: {
            "click .save_button" : "saveChanges",
            "click .cancel_button" : "cancelChanges"
        },

        render: function(model) {
            var item_template;

            this.model = model;
            item_template = this.innerTemplate[this.model.get("item_type")];
            this.$(".templates-container").html(item_template());
            this.$(".edit-backlog-item").removeClass("hidden");

            return this;
        },

        fillingFields: function(model) {
            var attribute = {};

            this.render(model);
            
             this.$(".input").each(function(i, el) {
                el.value = model.attributes[el.id];
            });

        },

        cancelChanges: function() {
            mediator.pub("BacklogItemEdit:cancelChanges", this.model);
            this.hideView();
        },

        saveChanges: function() {
            var attribute = {};

            this.$(".input").each(function(i, el) {
                attribute[el.id] = el.value;
            });

            this.model.set(attribute);
            this.hideView();
            mediator.pub("BacklogItemEdit:savedChanges", this.model);
        },

        hideView: function() {
            this.$(".edit-backlog-item").addClass("hidden");
        }

    });

})(app.BacklogItemEdit);

