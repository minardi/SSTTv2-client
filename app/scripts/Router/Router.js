(function () {
	app.Router = Backbone.Router.extend({
		routes: {
			"": "projects",
			"projects":"projects",
			"project/:project_id/teams":"teams",
			"team-edit/:team_id":"team_edit",
			"project/:project_id/scrum-page/:page":"scrumPage",
		},

		subscriptions: {

		},

		projects: function () {
			sstt.project = new app.Projects.CollectionView({
	        	el: $(".b-main")
	    	});
		},

		teams: function (project_id) {
			sstt.teams = new app.Teams.CollectionView({
		        el: $(".b-main"),
		        project_id: project_id
		    });

	    	mediator.pub("SetProjectId", project_id);
		},

		team_edit: function (team_id, role) {
			sstt.team_candidates = new app.TeamCandidates.CollectionView({
				team_id: team_id
			});

			sstt.team_members = new app.TeamMembers.CollectionView({
				team_id: team_id
			});

			sstt.team_edit_page = new app.TeamEditPage.ModelView({
		        el: $(".b-main")
		    });
		},

		scrumPage: function (project_id, page) {
			var options = {
				project_id: project_id
			};

			mediator.pub("SetProjectId", project_id);

			sstt.scrum_page = new app.ScrumPage.ModelView({
		        el: $(".b-main"),
		        project_id: project_id
		    });

		    options.el = sstt.scrum_page.render().$content;

			if (page === 'planning') {
				this.planningPage(options);
			} else if (page === 'scrum-board') {
				this.scrumBourdPage(options);
			}
		},

		planningPage: function (options) {
				sstt.sprints = new app.Sprint.CollectionView();

			    sstt.product_backlog = new app.ProductBacklog.CollectionView(options);
    			sstt.sprint_backlog = new app.SprintBacklog.CollectionView(options);

    			sstt.backlog_item_edit = new app.BacklogItemEdit.ModelView({
			        el: $('.b-main')
			    });
		},

		scrumBourdPage: function (options) {
			sstt.scrum_board = new app.ScrumBoard.CollectionView(options);
		}
	});
})()