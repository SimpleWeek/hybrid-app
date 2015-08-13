describe('Service: AuthService', function() {

  var should = chai.should();
  var expect = chai.expect;
  var authService;

  beforeEach(function() {
    module('Simpleweek');

    inject(function(_AuthService_) {
      authService = _AuthService_;
    })
  });

  it('should return correct array with week days', function() {
      expect(authService.isLoggedIn()).to.be.false;
  });
});
