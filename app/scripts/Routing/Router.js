/* Router */

(function(module) {

    module.Router = Backbone.Router.extend({

        silent: false,             

        initialize: function() {
            mediator.sub("ProjectPage:ProjectChecked", this.toProject, this);
            mediator.sub("ProjectPage:ProjectSelected", this.toScrumPage, this);
            mediator.sub("ScrumPage:PlanningBoardSelected", this.toPlanning, this);
            mediator.sub("ScrumPage:ScrumBoardSelected", this.toScrumBoard, this);
            mediator.sub("ScrumPage:StatBoardSelected", this.toStatistics, this);
            mediator.sub("DashBoard:ActiveTeam", this.toTeamPage, this);
            mediator.sub("TeamPage:TeamSelected", this.toTeamEditPage, this);
            mediator.sub("TeamEditPage:TabSelected", this.toTeamEditPageTab, this);           
        },

        toProject: function(project_id) {            
            if (!this.silent) {           
                this.navigate("project-" + project_id, {replace: this.silent});
            }
        },

        toScrumPage: function(project_id) {
            this.urls["scrum_url"] = "project-" + project_id + "/scrum-page";
                if (!this.silent) {
                    this.navigate("project-" + project_id + "/scrum-page", {replace: this.silent});
                } 
        },

        toPlanning: function() {            
            if (!this.silent) {             
                this.navigate(this.urls["scrum_url"] + "/planning", {replace: this.silent});
            } 
        },

        toScrumBoard: function() { 
            if (!this.silent) {
                this.navigate(this.urls["scrum_url"] + "/scrum-board", {replace: this.silent});
            }
        },
        
        toStatistics: function() {
            if (!this.silent) {
                this.navigate(this.urls["scrum_url"] + "/statistics", {replace: this.silent});
            } 
        },

        toTeamPage: function(project_id) {            
            this.urls["project_url"] = "project-" + project_id;           
            if (!this.silent) {
                this.navigate("project-" + project_id + "/team-page", {replace: this.silent});
            } 
        },

        toTeamEditPage: function(team_id) {           
            this.urls["team_url"] = this.urls["project_url"] + "/team-page/" + team_id;
            if (!this.silent) {
                this.navigate(this.urls["team_url"], {replace: this.silent});
            } 
        },

        toTeamEditPageTab: function(tab_selected) {
            if (!this.silent) {
                this.navigate(this.urls["team_url"] + "/" + tab_selected, {replace: this.silent});
            } 
        },  
       
        urls: {
            "project_url": "",
            "scrum_url": "",
            "team_url": ""
        }, 

        hash_of_routes: {
            "scrum-page": "ProjectPage:ProjectSelected",
            "scrum-page/": {
                "/planning": "goToPlanning",
                "/scrum-board": "goToScrumBoard",
                "/statistics": "goToStatistics"
            },
            "team-page": "DashBoard:ActiveTeam"             
        },      

        routes: {
            "": "index",       		            
            "(project-:id)(/:page)(/:tab)(/:role)": "makeRoute"       
        },        
        
        makeRoute: function(project_id, page, tab, role) {            
            this.silent = true; 
            if (project_id) {                      
                mediator.pub("ProjectPage:ProjectChecked", project_id);
                mediator.pub("DashBoard:ActiveBack");                                              
                if (page === "scrum-page") {                              
                    mediator.pub(this.hash_of_routes[page], project_id);
                    if (tab) {                    
                        mediator.pub(this.hash_of_routes[page+"/"]["/"+tab]);
                    }
                } else if (page === "team-page") {                              
                    mediator.pub(this.hash_of_routes[page], project_id);
                    if (tab) {                   
                        mediator.pub("TeamPage:TeamSelected", tab);
                        if (role) {                        
                            mediator.pub("TeamEditPage:TabSelected", role);
                        }
                    }
                }                      
            }  
            this.silent = false;
        }   
    });

})(app.Routing);