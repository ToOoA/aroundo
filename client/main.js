// accounts
Accounts.ui.config({
  passwordSignupFields : "USERNAME_AND_EMAIL"
})

// subscriptions
Meteor.subscribe("user-tasks-todo");
Meteor.subscribe("user-tasks-done");


// counter starts at 0
Session.setDefault('counter', 0);

Template.taskstodo.helpers({
  tasks: function(){
    user = Meteor.user();
    return Tasks.find({"status": "todo", "createdBy": user._id}, {sort: {createdOn: -1}});
  }
});

Template.taskstodo.events({
  'click .js-task-done': function(event){
    task_id = this._id;
    $("#" + task_id).toggle("slow");
    Meteor.setTimeout(function(){updateTaskStatus(task_id, "done")}, 500);
  },
  'click .js-task-delete': function(event){
    deleteTask(this._id)
  }
});

function deleteTask(id){
  Tasks.update({"_id": id}, {$set: {"status": "deleted"}});
}

Template.taskadd.events({
  'submit .js-task-add': function(event){
    console.log(event);
    Tasks.insert({
      "description": event.target.task_description.value, 
      "status": "todo",
      "createdOn": new Date(),
      "createdBy": Meteor.user()._id
    });
    event.target.task_description.value = null;
    return false;
  }
});

Template.tasksdone.helpers({
  tasks: function(){
    user = Meteor.user();
    return Tasks.find({"status": "done", "createdBy": user._id}, {sort: {createdOn: -1}});
  }
});

Template.tasksdone.events({
  'click .js-task-undo': function(event){
    task_id = this._id;
    $("#" + task_id).toggle("slow");
    Meteor.setTimeout(function(){updateTaskStatus(task_id, "todo")}, 500);
  },
  'click .js-task-delete': function(event){
    task_id = this._id;
    $("#" + task_id).toggle("slow");
    Meteor.setTimeout(function(){deleteTask(task_id)}, 500);
  }
});


function updateTaskStatus(id, status){
  Tasks.update({"_id": id}, {$set: {"status": status}});
}