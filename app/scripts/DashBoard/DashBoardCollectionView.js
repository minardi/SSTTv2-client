/* DashBoard */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST["app/scripts/DashBoard/DashBoardCollectionTpl.ejs"],

        subscriptions: {
            "Projectinfo:SetProjectInfo": "setProject",
        },

        initialize: function() {
            this.collection = new module.Collection();
            this.listenTo(sstt.router, "route", this.render);
            this.render();
        },

        setProject: function(project) {
            this.project = project;
            this.current_right = (this.project.get("pm").user_id == sstt.user.getId())? "pm": "not_pm";

            this.render();
        },

        render: function(project) {
            if(this.$dashboard) {
                this.$dashboard.remove();
            }
            this.$el.append(this.template());
            this.$dashboard = this.$(".dashboard");
            
            this.collection.each(this.renderOne, this);
            return this;
        },

        renderOne: function (btn_model) {
            var btn;
            //btn_model.set("project_id", this.project.id);
            if (this.canRender(btn_model.get("permition"))) {
                btn = new module.ModelView({
                    model: btn_model
                });
                this.$dashboard.append(btn.render().el);
            };
        },

        canRender: function (permition) {
            var answer = true;

            if (permition.must_be.right) {
                _.each(permition.must_be.right, function(el) {
                        if (el !== this.current_right) {
                            answer = false;
                        }
                    }
                , this)
            }

            if (permition.must_be.page) {
                _.each(permition.must_be.page, function(el) {
                        if (el !== this.current_page) {
                            answer = false;
                        }
                    }
                , this)
            }

            if (permition.not.page) {
                _.each(permition.not.right, function(el) {
                        if (el === this.current_rigth) {
                            answer = false;
                        }
                    }
                , this)
            }

            if (permition.not.page) {
                _.each(permition.not.page, function(el) {
                        if (el === this.current_page) {
                            answer = false;
                        }
                    }
                , this)
            }

            return answer;
        }

    });

})(app.DashBoard);