console.log("I'm the server!!");

Meteor.publish("user-tasks-todo", function(){
    return Tasks.find({"done": false, "createdBy": this.userId}, {sort: {createdOn: -1}});
});

Meteor.publish("user-tasks-done", function(){
    return Tasks.find({"done": true, "createdBy": this.userId}, {sort: {createdOn: -1}});
});