Tasks = new Mongo.Collection("tasks");

Tasks.allow({
    insert: function(idUser, doc){
        return (idUser == doc.createdBy);
    },
    update: function(idUser, doc){
        return (idUser == doc.createdBy);
    },
    remove: function(idUser, doc){
        return (idUser == doc.createdBy);
    }
});