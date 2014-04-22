this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/BacklogItemEdit/BacklogItemEditCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/BacklogItemEdit/BacklogItemEditSprintTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class = "title">Edit Sprint</span>\n<br /><br />\n<p>Title:</p>\n<input class = "input" type = "text" id = "title"/>\n<p>Description:</p>\n<textarea class = "input" size = 300 id = "description"></textarea>\n<p>Start:</p>\n<input class = "input" type = "text" id = "title"/>\n<p>End:</p>\n<input class = "input" type = "text" id = "title"/>';

}
return __p
};

this["JST"]["app/scripts/BacklogItemEdit/BacklogItemEditStoryTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class = "title">Edit Story</span>\r\n<br /><br />\r\n<p>Title:</p>\r\n<input class = "input" type = "text" id = "title"/>\r\n<p>Description:</p>\r\n<textarea class = "input" size = 300 id = "description"></textarea>\r\n';

}
return __p
};

this["JST"]["app/scripts/BacklogItemEdit/BacklogItemEditTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "edit-backlog-item hidden">\n    <div class = "templates-container"></div>\n    <div class = "save_button btn btn-default">Save</div>\n    <div class = "cancel_button btn btn-default">Cancel</div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/BacklogItemEdit/BacklogItemEditstoriesTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class = "title">Edit Story</span>\r\n<br /><br />\r\n<p>Title:</p>\r\n<input class = "input" type = "text" id = "title"/>\r\n<p>Description:</p>\r\n<textarea class = "input" size = 300 id = "description"></textarea>\r\n';

}
return __p
};

this["JST"]["app/scripts/DashBoard/DashBoardCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="dashboard">\n</div>';

}
return __p
};

this["JST"]["app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="backlog-box product">\n    <div class="backlog-box-name">   \n        ProductBacklog\n        <div class="backlog-box-actions">\n            <input class="add-new-story btn-new-story" type="button" value="+" />\n        </div>\n    </div> \n    <div class="backlogstory-list">\n    </div>\n</div>\n\n<div class="btn create-sprint">Create sprint</div>';

}
return __p
};

this["JST"]["app/scripts/ProductBacklog/ProductBacklogTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( title )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/scripts/ProductBacklogStories/ProductBacklogStoriesCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="backlog-box product">\n    <div class="backlog-box-name">   \n        ProductBacklog\n        <div class="backlog-box-actions">\n        </div>\n    </div> \n    <div class="story-list">\n    </div>\n</div>';

}
return __p
};

this["JST"]["app/scripts/ProductBacklogStories/ProductBacklogStoriesTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( name )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/scripts/Projectinfo/ProjectinfoTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="info">\n    <div class="title">Info</div>\n    <div class="main">\n        <ul class="list-unstyled">\n            <li>Description: ' +
((__t = ( description )) == null ? '' : __t) +
'</li>\n            <li>DateStart: ' +
((__t = ( start )) == null ? '' : __t) +
'</li>\n            <li>PM: ' +
((__t = ( pm.first_name + " " + pm.last_name )) == null ? '' : __t) +
' </li>\n            <li>Role: ' +
((__t = ( role )) == null ? '' : __t) +
' </li>\n        </ul>\n    </div>\n</div>';

}
return __p
};

this["JST"]["app/scripts/Projects/ProjectsCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="title project-page" >\n    My Projects\n    <div class="actions">\n        <span class="hide btn btn-default glyphicon glyphicon-plus">\n        </span>\n    </div>\n</div>\n\n<div class="content project-page" >\n</div>';

}
return __p
};

this["JST"]["app/scripts/Projects/ProjectsTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p class="name"> Title ' +
((__t = ( title )) == null ? '' : __t) +
' </p>\n<p> Description ' +
((__t = ( description )) == null ? '' : __t) +
' </p>';

}
return __p
};

this["JST"]["app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "panel-body tasks-header">\n    <div class="header-todo">To Do</div>\n    <div class="header-in-progress">In progress</div>\n    <div class="header-to-verify">To verify</div>\n    <div class="header-done last">Done</div>\n</div>\n\n<div class = "panel-body tasks">\n    <div class="todo">\n    </div>\n\n    <div class="in-progress">\n    </div>\n\n    <div class="to-verify">\n    </div>\n\n    <div class="done last">\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( title )) == null ? '' : __t) +
'<br>\n' +
((__t = ( description )) == null ? '' : __t) +
'\n\n';

}
return __p
};

this["JST"]["app/scripts/ScrumPage/ScrumPageTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="scrum-page-header nav scrum-page">\n    <div class="col-xs-4 tab" id="planning">\n        <span class = "glyphicon glyphicon-list-alt"></span>\n        Planning\n    </div>\n    \n    <div class="col-xs-4 tab" id="scrumboard">\n        <span class = "glyphicon glyphicon-tasks"></span>\n        Scrum Board\n    </div>\n    \n    <div class="col-xs-4 tab" id="stat" >\n        <span class = "glyphicon glyphicon-stats"></span>\n        Statistics\n    </div>\n</div>\n\n<div class="content scrum-page" id="ScrumPage"></div>\n';

}
return __p
};

this["JST"]["app/scripts/SprintBacklog/SprintBacklogCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="backlog-box sprint">\n    <div class="backlog-box-name"> \n        SprintBacklog\n        <div class="backlog-box-actions">\n        </div>\n    </div>\n    <div class="sprintstory-list"></div>\n\n    \n</div>\n<div class="btn">Start sprint</div>';

}
return __p
};

this["JST"]["app/scripts/SprintBacklog/SprintBacklogTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( title )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/scripts/SprintBacklogStories/SprintBacklogStoriesCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="backlog-box sprint">\n    <div class="backlog-box-name"> \n        SprintBacklog\n        <div class="backlog-box-actions">\n        </div>\n    </div>\n    <div class="story-list">\n    </div>\n</div>';

}
return __p
};

this["JST"]["app/scripts/SprintBacklogStories/SprintBacklogStoriesTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( title )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/scripts/TeamCandidates/TeamCandidatesCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="users-box-name">\n    All Users\n</div> \n<div class="users-list">\n</div>';

}
return __p
};

this["JST"]["app/scripts/TeamCandidates/TeamCandidatesTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( first_name + " " + last_name + " " )) == null ? '' : __t) +
'\n<em class="text-info"> ' +
((__t = ( role )) == null ? '' : __t) +
' </em>\n';

}
return __p
};

this["JST"]["app/scripts/TeamEditPage/TeamEditPageTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="team-edit-page-header nav team-edit-page">\n    <div class="col-xs-4 tab" id="watchers">Watchers</div>\n    <div class="col-xs-4 tab" id="developers">Developers</div>\n    <div class="col-xs-4 tab" id="techleads">TechLeads</div>\n</div>\n\n<div class="content team-edit-page">\n    <div class="candidates"></div>\n    <div class="team-members"></div>\n    <div id = "save_confirm" class = "hidden">\n        <p><strong>Team members saved</strong></p>\n        <div class = "btn btn-default" id = "ok_btn">Ok</div>\n    </div>\n</div>\n\n';

}
return __p
};

this["JST"]["app/scripts/TeamMembers/TeamMembersCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "team-members-list">\n    <div class="users-box-name">Team members</div>\n</div>\n\n<button type="button" id ="save" class="btn btn-info">\n    Save\n</button>';

}
return __p
};

this["JST"]["app/scripts/TeamMembers/TeamMembersTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( first_name )) == null ? '' : __t) +
'\n' +
((__t = ( last_name )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/scripts/Teams/TeamsCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="title team-page" >\n    My teams\n    <div class="actions">\n        <span class="hide btn btn-default glyphicon glyphicon-plus">\n        </span>\n    </div>\n</div>\n\n<div class="content team-page">\n</div>';

}
return __p
};

this["JST"]["app/scripts/Teams/TeamsTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p class="name">' +
((__t = ( title )) == null ? '' : __t) +
' </p>\n<p> ' +
((__t = ( description )) == null ? '' : __t) +
' </p>';

}
return __p
};

this["JST"]["app/scripts/User/UserTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( first_name )) == null ? '' : __t) +
'\n' +
((__t = ( last_name )) == null ? '' : __t) +
'\n';

}
return __p
};

this["JST"]["app/scripts/UserCandidates/UserCandidatesCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="users-box-name">\r\n    All Users\r\n</div> \r\n<div class="users-list">\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/UserCandidates/UserCandidatesTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( first_name + " " + last_name + " " )) == null ? '' : __t) +
'\r\n<em class="text-info"> ' +
((__t = ( role )) == null ? '' : __t) +
' </em>\r\n';

}
return __p
};