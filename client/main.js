// counter starts at 0
Session.setDefault('counter', 0);

Template.taskstodo.helpers({
  tasks: function(){
    return Tasks.find({"done": false}, {sort: {createdOn: -1}});
  }
});

Template.taskstodo.events({
  'click .js-task-done': function(event){
    task_id = this._id;
    $("#" + task_id).toggle("slow");
    Meteor.setTimeout(function(){updateTaskStatus(task_id, true)}, 500);
  },
  'click .js-task-delete': function(event){
    deleteTask(this._id)
  }
});

function deleteTask(id){
  Tasks.remove({"_id": id});
}

Template.taskadd.events({
  'submit .js-task-add': function(event){
    console.log(event);
    Tasks.insert({
      "description": event.target.task_description.value, 
      "done": false,
      "createdOn": new Date()
    });
  }
});

Template.tasksdone.helpers({
  tasks: function(){
    return Tasks.find({"done": true}, {sort: {createdOn: -1}});
  }
});

Template.tasksdone.events({
  'click .js-task-undo': function(event){
    task_id = this._id;
    $("#" + task_id).toggle("slow");
    Meteor.setTimeout(function(){updateTaskStatus(task_id, false)}, 500);
  },
  'click .js-task-delete': function(event){
    task_id = this._id;
    $("#" + task_id).toggle("slow");
    Meteor.setTimeout(function(){deleteTask(this._id)}, 500);
  }
});



function updateTaskStatus(id, status){
  Tasks.update({"_id": id}, {$set: {"done": status}});
}