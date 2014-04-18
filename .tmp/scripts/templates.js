this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/BacklogItemEdit/BacklogItemEditCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/BacklogItemEdit/BacklogItemEditTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/DashBoard/DashBoardCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="dashboard">\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="backlog-box product">\r\n    <div class="backlog-box-name">   \r\n        ProductBacklog\r\n        <div class="backlog-box-actions">\r\n            <button class="btn-new-story" id="add_new_story">+</button>\r\n        </div>\r\n    </div> \r\n    <div class="story-list">\r\n    </div>\r\n</div>';

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

this["JST"]["app/scripts/Projectinfo/ProjectinfoTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="info">\r\n    <div class="title">Info</div>\r\n    <div class="main">\r\n        <ul class="list-unstyled">\r\n            <li>Description: ' +
((__t = ( description )) == null ? '' : __t) +
'</li>\r\n            <li>DateStart: ' +
((__t = ( start )) == null ? '' : __t) +
'</li>\r\n            <li>PM: ' +
((__t = ( pm.first_name + " " + pm.last_name )) == null ? '' : __t) +
' </li>\r\n            <li>Role: ' +
((__t = ( role )) == null ? '' : __t) +
' </li>\r\n        </ul>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/Projects/ProjectsCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="title project-page" >\r\n    My Projects\r\n    <div class="actions">\r\n        <span class="hide btn btn-default glyphicon glyphicon-plus">\r\n        </span>\r\n    </div>\r\n</div>\r\n\r\n<div class="content project-page" >\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/Projects/ProjectsTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p class="name"> Title ' +
((__t = ( title )) == null ? '' : __t) +
' </p>\r\n<p> Description ' +
((__t = ( description )) == null ? '' : __t) +
' </p>';

}
return __p
};

this["JST"]["app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "panel-body tasks-header">\r\n    <div class="header-todo">To Do</div>\r\n    <div class="header-in-progress">In progress</div>\r\n    <div class="header-to-verify">To verify</div>\r\n    <div class="header-done last">Done</div>\r\n</div>\r\n\r\n<div class = "panel-body tasks">\r\n    <div class="todo">\r\n    </div>\r\n\r\n    <div class="in-progress">\r\n    </div>\r\n\r\n    <div class="to-verify">\r\n    </div>\r\n\r\n    <div class="done last">\r\n    </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( title )) == null ? '' : __t) +
'<br>\r\n' +
((__t = ( description )) == null ? '' : __t) +
'\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/ScrumPage/ScrumPageTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="scrum-page-header nav scrum-page">\r\n    <div class="col-xs-4 tab" id="planning">\r\n        <span class = "glyphicon glyphicon-list-alt"></span>\r\n        Planning\r\n    </div>\r\n    \r\n    <div class="col-xs-4 tab" id="scrumboard">\r\n        <span class = "glyphicon glyphicon-tasks"></span>\r\n        Scrum Board\r\n    </div>\r\n    \r\n    <div class="col-xs-4 tab" id="stat" >\r\n        <span class = "glyphicon glyphicon-stats"></span>\r\n        Statistics\r\n    </div>\r\n</div>\r\n\r\n<div class="content scrum-page" id="ScrumPage"></div>\r\n';

}
return __p
};

this["JST"]["app/scripts/SprintBacklog/SprintBacklogCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="backlog-box sprint">\r\n    <div class="backlog-box-name"> \r\n        SprintBacklog\r\n        <div class="backlog-box-actions">\r\n        </div>\r\n    </div>\r\n    <div class="story-list">\r\n    </div>\r\n</div>';

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

this["JST"]["app/scripts/TeamCandidates/TeamCandidatesCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="users-box-name">\r\n    All Users\r\n</div> \r\n<div class="users-list">\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/TeamCandidates/TeamCandidatesTpl.ejs"] = function(obj) {
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

this["JST"]["app/scripts/TeamEditPage/TeamEditPageTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="team-edit-page-header nav team-edit-page">\r\n    <div class="col-xs-4 tab" id="watchers">Watchers</div>\r\n    <div class="col-xs-4 tab" id="developers">Developers</div>\r\n    <div class="col-xs-4 tab" id="techleads">TechLeads</div>\r\n</div>\r\n\r\n<div class="content team-edit-page">\r\n    <div class="candidates"></div>\r\n    <div class="team-members"></div>\r\n    <div id = "save_confirm" class = "hidden">\r\n        <p><strong>Team members saved</strong></p>\r\n        <div class = "btn btn-default" id = "ok_btn">Ok</div>\r\n    </div>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["app/scripts/TeamMembers/TeamMembersCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class = "team-members-list">\r\n    <div class="users-box-name">Team members</div>\r\n</div>\r\n\r\n<button type="button" id ="save" class="btn btn-info">\r\n    Save\r\n</button>';

}
return __p
};

this["JST"]["app/scripts/TeamMembers/TeamMembersTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( first_name )) == null ? '' : __t) +
'\r\n' +
((__t = ( last_name )) == null ? '' : __t);

}
return __p
};

this["JST"]["app/scripts/Teams/TeamsCollectionTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="title team-page" >\r\n    My teams\r\n    <div class="actions">\r\n        <span class="hide btn btn-default glyphicon glyphicon-plus">\r\n        </span>\r\n    </div>\r\n</div>\r\n\r\n<div class="content team-page">\r\n</div>';

}
return __p
};

this["JST"]["app/scripts/Teams/TeamsTpl.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p class="name">' +
((__t = ( title )) == null ? '' : __t) +
' </p>\r\n<p> ' +
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
'\r\n' +
((__t = ( last_name )) == null ? '' : __t) +
'\r\n';

}
return __p
};