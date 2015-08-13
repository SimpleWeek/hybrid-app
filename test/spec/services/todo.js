describe('Service: Todo', function() {

  var should = chai.should();
  var expect = chai.expect;
  var todo;

  beforeEach(function() {
    module('Simpleweek');

    inject(function(_Todo_) {
      todo = _Todo_;
    })
  });

  it('should return correct array with week days', function() {
      expect(todo.buildWeekDays()).to.have.length(5);
  });
});
