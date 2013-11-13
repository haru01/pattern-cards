App = Ember.Application.create();

App.Router.map(function() {
    this.resource("other", { path: "/" });
    this.resource("patterns", { path: "/patterns" });
});

App.PatternsRoute = Ember.Route.extend({
    model: function() {
        App.Pattern.add({name: "リーダブルコード"});
        App.Pattern.add({name: "All Green"});
        for (var i = 2 - 1; i >= 0; i--) {
            App.Pattern.add({name: "..."});
        };
        return App.Pattern.patterns;
    }
});



App.OtherRoute = Ember.Route.extend({
    redirect: function() {
        this.transitionTo('patterns');
    }
});

App.PatternsController = Ember.ArrayController.extend({
    actions: {
    }
});


App.Pattern = Ember.Object.extend({
    name: ''
});

App.Pattern.reopenClass({
    patterns: [],
    add: function(hash) {
        var pattern = App.Pattern.create(hash);
        this.patterns.pushObject(pattern);
    }
});

App.ContentEditable = Ember.View.extend({
    tagName: "section",
    contenteditable: "true",
    attributeBindings: ["contenteditable"],

    focusOut: function(e) {
        this.set('content.name', this.$().text());
        console.log(this.get('content.name'));
    }
});
