var sstt = {
        current_project: 0
    },
    mediator = Backbone.Mediator,
    app = {
        User: {},
        Projects: {},
        ScrumPage: {},
        ProductBacklog: {},
        SprintBacklog: {},
        Projectinfo: {},
        ContextMenu: {},
        ScrumBoard: {},
        TeamEditPage: {},
        TeamCandidates: {},
        TeamMembers: {},
        Teams: {},        
        BacklogItem: {},
        BacklogItemEdit: {},
        PlanningBoard: {},
        DatePicker: {},
        Statistics: {},
        Confirmation: {},
        empty: {}
    };

$(function() {
    "use strict";

    sstt.user = app.User;
    sstt.user.setElement($(".user"));

    sstt.projects = new app.Projects.CollectionView({
        el: $(".b-main")
    });

    sstt.scrum_page = new app.ScrumPage.ModelView({
        el: $(".b-main")
    });

    sstt.project_info = new app.Projectinfo.ModelView({
        el: $(".main")
    });

    sstt.product_backlog = new app.ProductBacklog.CollectionView();

    sstt.sprint_backlog = new app.SprintBacklog.CollectionView();

    sstt.scrum_board = new app.ScrumBoard.CollectionView();

    sstt.team_edit_page = new app.TeamEditPage.ModelView({
        el: $(".b-main")
    });

    sstt.ContextMenu = new app.ContextMenu.CollectionView({
        el: $(".b-sidebar")
    });

    sstt.teams = new app.Teams.CollectionView({
        el: $(".b-main")
    });  
    
    sstt.team_members = new app.TeamMembers.CollectionView({
        el: $(".b-main")
    });

    sstt.team_candidates = new app.TeamCandidates.CollectionView();

    sstt.backlog_item_edit = new app.BacklogItemEdit.ModelView({
        el: $('.edit-backlog-item')
    });

    sstt.planning_board = new app.PlanningBoard.ModelView();

    sstt.date_picker = new app.DatePicker.ModelView();
    
    sstt.statistics = new app.Statistics.CollectionView();

    sstt.confirmation = new app.Confirmation.ModelView({
        el: $('.message-container')
    });
});