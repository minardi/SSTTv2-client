/* BacklogItem */

(function(module) {
        
    module.Collection = Backbone.Collection.extend({	     
        model: module.Model,

        initialize: function(item_type, status, parent_id) {
			this.url = '/backlog_items/get_items/' + item_type + '/' + status + '/' + parent_id;
			this.parent_id = parent_id;

			this.listenTo(this, "add", this.addParentId);
        },

        addParentId: function (model) {
        	model.set("parent_id", this.parent_id);
        },

        getParentId: function () {
            return this.parent_id;
        }
		
    });

})(app.BacklogItem);

