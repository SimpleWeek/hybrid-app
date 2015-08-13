describe('Directive: targetBlank', function() {

  var should = chai.should();
  var expect = chai.expect;
  var $compile, $rootScope, $timeout;

  beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
  }));

  it('should correctly add attribute to the <a> tag or its children', function() {
    var element = $compile("<a href='http://google.com' target-blank>Test</a>")($rootScope);

    $rootScope.$digest();
      expect(element).to.be.ok;
      expect(element.attr('href')).to.equal('http://google.com');
      expect(element.text()).to.equal('Test');
  });
});
