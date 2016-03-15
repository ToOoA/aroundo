// routing
Router.configure({
    layoutTemplate: "ApplicationLayout"
});

Router.route('/',function(){
    this.render('navbar', {
        to: "navbar"
    });
    this.render('tasks', {
        to: "content"
    })
})