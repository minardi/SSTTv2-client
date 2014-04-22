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
            "ProductBacklog:CreateNewItem" : "initItem",
            "ProductBacklog:EditStory" : "fillingFields"
        },  

        events: {
            "click .save_button" : "saveChanges",
            "click .cancel_button" : "cancelChanges"
        },

        initItem: function(attributes) {
            this.model = new module.Model();
            this.model.set(attributes);      
            this.is_new = true;

            this.render();
        },

        render: function() {
            var type = this.model.get("item_type");
                item_template = this.innerTemplate[type];

            this.$(".edit-backlog-item").html(item_template());
            this.$(".edit-backlog-item").removeClass("hidden");

            return this;
        },

        fillingFields: function(model) {
            this.model = model;
            this.is_new = false;

            this.render();

            this.$(".input").each(function(i, el) {
                el.value = model.attributes[el.id];
            });
        },

        cancelChanges: function() {
            if((this.is_new) && (this.model.get("item_type") === "story")) {
                this.model.destroy();
            }

            this.hideView();
        },

        saveChanges: function() {
            var attribute = {};

            this.$(".input").each(function(i, el) {
                attribute[el.id] = el.value;
            });

            this.model.set(attribute);
            this.hideView();
            mediator.pub("BacklogItemEdit:SavedChanges", {
                                                            "model": this.model,
                                                            "is_new": this.is_new
                                                        });
        },

        hideView: function() {
            this.$(".edit-backlog-item").addClass("hidden");
        }
        
    });

})(app.BacklogItemEdit);

