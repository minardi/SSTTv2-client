var sstt = {},
    mediator = Backbone.Mediator,
    app = {
        User: {},
        Projects: {},
        ScrumPage: {},
        ProductBacklogStories: {},
        SprintBacklogStories: {},
        Projectinfo: {},
        DashBoard: {},
        ScrumBoard: {},
        TeamEditPage: {},
        UserCandidates: {},
        TeamMembers: {},
        Teams: {},
        empty: {},
        Routing: {}
    };

$(function() {
    "use strict";

    sstt.user = new app.User.ModelView({
        el: $(".user"),
        user_content: current_user_content
    });

    sstt.project = new app.Projects.CollectionView({
        el: $(".b-main")
    });

    sstt.scrum_page = new app.ScrumPage.ModelView({
        el: $(".b-main"),
        model: new app.ScrumPage.Model()
    });

    sstt.project_info = new app.Projectinfo.ModelView({
        el: $(".b-sidebar")
    });

    sstt.product_backlog = new app.ProductBacklogStories.CollectionView();

    sstt.sprint_backlog = new app.SprintBacklogStories.CollectionView();

    sstt.scrum_board = new app.ScrumBoard.CollectionView();

    sstt.team_edit_page = new app.TeamEditPage.ModelView({
        el: $(".b-main")
    });
    sstt.dashboard = new app.DashBoard.CollectionView({
        el: $(".b-sidebar")
    });

    sstt.teams = new app.Teams.CollectionView({
        el: $(".b-main")
    });  
    
    sstt.team_members = new app.TeamMembers.CollectionView({
        el: $(".b-main")
    });

    sstt.user_candidates = new app.UserCandidates.CollectionView();

    sstt.router = new app.Routing.Router();
    Backbone.history.start({pushState: true});

});
