/* Sprint */

(function(module) {
        
    module.Model = app.BacklogItem.Model.extend({
        defaults: {
        
            "title": "",
            "description": "",
            "estimation": "",
            "parent_id": "",
            "status": "",
            "item_type": "",
            "start_date": "",
            "end_date": ""
        }
    });

})(app.Sprint);
