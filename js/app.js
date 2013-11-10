App = Ember.Application.create();

App.Router.map(function() {
    this.resource("other", { path: "/" });
    this.resource("patterns", { path: "/patterns" });
});

App.PatternsRoute = Ember.Route.extend({
    model: function() {
        App.Pattern.add({name: "リーダブルコード"});
        for (var i = 50 - 1; i >= 0; i--) {
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
        addPattern: function() {
            var pattern = {
                name: this.get('name'),
            };
            App.Pattern.add(pattern);
        },
    }
});


App.Pattern = Ember.Object.extend({
    name: '',
    context: '',
    problem: '',
    solution: '',
    result: ''
});

App.Pattern.reopenClass({
    patterns: [],
    add: function(hash) {
        var pattern = App.Pattern.create(hash);
        this.patterns.pushObject(pattern);
    },
    find: function() {
        var self = this;
        $.getJSON('/api/patterns', function(response) {
            response.forEach(function(hash) {
                var pattern = App.Pattern.create(hash);
                Ember.run(self.patterns, self.patterns.pushObject, pattern);
            });
        }, this);
        return this.patterns;
    }
});
