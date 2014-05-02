/* BacklogItem */

(function(module) {
        
    module.Collection = Backbone.Collection.extend({
        model: module.Model,

        initialize: function(models, options) {
            this.url = 'backlog_items';
            if(options) {
                this.url += '/get_items/' + options.item_type + '/' + options.status + '/' + options.parent_id;
            }
        }
        
    });

})(app.BacklogItem);

