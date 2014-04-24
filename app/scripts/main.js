var sstt = {},
    mediator = Backbone.Mediator,
    app = {
        User: {},
        Projects: {},
        ScrumPage: {},
        ProductBacklog: {},
        SprintBacklog: {},
        Projectinfo: {},
        DashBoard: {},
        ScrumBoard: {},
        TeamEditPage: {},
        TeamCandidates: {},
        TeamMembers: {},
        Teams: {},        
        BacklogItem: {},
        BacklogItemEdit: {},
        Router: {},
        Sprint: {},
        PlanningBoard: {},
        empty: {}
    };

$(function() {
    "use strict";

    sstt.user = new app.User.ModelView({
        el: $(".user"),
        user_content: current_user_content
    });

    
    sstt.project_info = new app.Projectinfo.ModelView({
        el: $(".project_info")
    });

   /* sstt.router = new app.Router();
    Backbone.history.start();*/

    sstt.dashboard = new app.DashBoard.CollectionView({
        el: $(".dushboard")
    });

    sstt.project = new app.Projects.CollectionView({

        el: $(".b-main")
    });

    sstt.scrum_page = new app.ScrumPage.ModelView({
        el: $(".b-main"),
        model: new app.ScrumPage.Model()
    });

    

    sstt.product_backlog = new app.ProductBacklog.CollectionView();

    sstt.sprint_backlog = new app.SprintBacklog.CollectionView();

    sstt.scrum_board = new app.ScrumBoard.CollectionView();

    sstt.team_edit_page = new app.TeamEditPage.ModelView({
        el: $(".b-main")
    });
    

    sstt.teams = new app.Teams.CollectionView({
        el: $(".b-main")
    });  
    
    sstt.team_members = new app.TeamMembers.CollectionView({
        el: $(".b-main")
    });

    sstt.team_candidates = new app.TeamCandidates.CollectionView();

    sstt.backlog_item_edit = new app.BacklogItemEdit.ModelView({
        el: $('.b-main')
    });

    sstt.planning_Board = new app.PlanningBoard.ModelView();

});
