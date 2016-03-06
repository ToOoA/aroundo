console.log("I'm the server!!");

Meteor.publish("user-tasks", function(){
    return Tasks.find({"done": false, "createdBy": this.userId}, {sort: {createdOn: -1}});
});