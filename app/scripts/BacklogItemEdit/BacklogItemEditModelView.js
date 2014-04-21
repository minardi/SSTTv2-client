/* BacklogItemEdit */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        template: JST['app/scripts/BacklogItemEdit/BacklogItemEditTpl.ejs'],        

        initialize: function() {
            this.$el.append(this.template());
        },

        subscriptions: {
            "ProductBacklog:CreateNewStory" : "render"
        },  

        events: {
            "click .save_button" : "saveChanges",
            "click .cancel_button" : "cancelChanges"
        },

        render: function(model) {
            var item_template;

            this.model = model;
            item_template = JST['app/scripts/BacklogItemEdit/BacklogItemEdit' + this.model.get("item_type") + 'Tpl.ejs'];
            this.$el.find(".container").html(item_template());
            this.$el.find(".edit-backlog-item").removeClass("hidden");
            
            return this;
        },

        cancelChanges: function() {
            mediator.pub("BacklogItemEdit:cancelChanges", this.model);
            this.$el.find(".edit-backlog-item").addClass("hidden");
        },

        saveChanges: function() {
            var attribute = {};

            this.$el.find(".input").each(function(i, el) {
                attribute[el.id] = el.value;
            });

            this.model.set(attribute);
            this.$el.find(".edit-backlog-item").addClass("hidden");
            
            mediator.pub("BacklogItemEdit:savedChanges", this.model);
        }

    });

})(app.BacklogItemEdit);
