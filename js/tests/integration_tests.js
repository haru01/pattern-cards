module('integration tests', {
    setup: function() {
        Ember.run(function() {
            App.reset();
            App.Pattern.patterns = [];
            App.deferReadiness();
        });
    },
    teardown: function() {
        $.mockjaxClear();
    }
});


test('パターンを追加できること', function() {
    // expect(4);
    var matt = {name: 'リーダブルコードを大事に'};
    stubEndpointForHttpRequest('/api/patterns', [matt]);
    Ember.run(App, 'advanceReadiness');
    visit("/patterns").then(function() {
      fillIn("#pattern .name", "ALL Greenを大事に");
      // fillIn(".lastName", "thostenson");
      return click(".submit");
    }).then(function() {
      equal(_f("パターン一覧").length, 2);
      equal(_f("パターン名一覧").eq(1).text(), "ALL Greenを大事に");

  });
});
