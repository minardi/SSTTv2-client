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

            this.$editView.html(item_template(this.model.toJSON()));
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
            this._modelBinder.bind(this.model, this.$el, null, {initialCopyDirection: Backbone.ModelBinder.Constants.ViewToModel});
            //ForTesting/////////////////////////////////
            if(this.model.get("item_type") === "sprint") {
                this.model.set("start_at", "27.07.1992");
                this.model.set("end_at", "18.12.2001");
            }
            console.log(this.model);
            if(this.dataValidation()) {
                this.showHideView();
                mediator.pub("BacklogItemEdit:SavedChanges", this.model);

                this._modelBinder.unbind(); 
            } else {
                console.log(':(');
            }
        },

        dataValidation: function() {
            var reg_empty = new RegExp('([^\\s*]+)','g'),
                reg_date = new RegExp('([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})'),
                valid = false;

            if(this.model.get("item_type") === "story") {
                valid = Boolean(this.model.get("title").replace(/\s+/g, '').length);
            } else {
                valid = Boolean(this.model.get("title").replace(/\s+/g, '').length) && 
                Boolean(this.model.get("start_at").replace(/\s+/g, '').length) && 
                Boolean(this.model.get("end_at").replace(/\s+/g, '').length);;

                console.log(valid);
            }
            
            return valid;
        },

        showHideView: function() {
            this.$editView.toggleClass("hidden");
        }
        
    });

})(app.BacklogItemEdit);

