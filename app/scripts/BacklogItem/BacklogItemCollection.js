/* BacklogItem */

(function(module) {
        
    module.Collection = Backbone.Collection.extend({
        model: module.Model,

        initialize: function(models, options) {
            if(options) {
                this.url = 'backlog_items/get_items/' + options.item_type + '/' + options.status + '/' + options.parent_id;
            }
        }
        
    });

})(app.BacklogItem);

