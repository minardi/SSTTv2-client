events: {
    "click": "moveTask"
},

moveTask: function(event) {
    console.log();
    var state = ["todo", "in-progress", "to-verify", "done"],
        new_status_index = state.indexOf(this.model.get("status"));
    if($(event.target).hasClass("arrow-right")) {
        new_status_index++;
    };
    if($(event.target).hasClass("arrow-left")) {
        new_status_index--;
    };
    this.model.set("status", state[new_status_index]);
    mediator.pub("ScrumBoard:moveTask", this.model);
    this.remove();
}