/* Projectinfo */

(function(module) {
        
    module.ModelView = Backbone.View.extend({    

        _modelBinder: undefined,    
        
        template: {
            "backlog_item": JST['app/scripts/Projectinfo/BacklogItemInfoTpl.ejs'],
            "project": JST['app/scripts/Projectinfo/ProjectinfoTpl.ejs']
        },       
        
        subscriptions: {
            "ProjectPage:ProjectChecked": "render",
            "module:UnitSelected" : "render"
        },

        render: function(model, type) {
            var template = this.template[type];

            this.$el.html(template(model.toJSON()));
            return this;
        }
  });
    
})(app.Projectinfo);
