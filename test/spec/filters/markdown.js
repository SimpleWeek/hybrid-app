'use strict';

describe('Filter: markdown', function() {

  var should = chai.should();
  var expect = chai.expect;

  // load the controller's module
  beforeEach(module('Simpleweek'));

  it('should correctly transform limited Markdown syntax to html', function() {
    inject(function (markdownFilter) {
      assert.equal(markdownFilter('test'), 'test');
      assert.equal(markdownFilter('<'), '&lt;');
      assert.equal(markdownFilter('<_'), '&lt;_');
      assert.equal(markdownFilter('<strong>test</strong>'), '&lt;strong&gt;test&lt;/strong&gt;');
      assert.equal(markdownFilter('_test_'), '<em>test</em>');
      assert.equal(markdownFilter('<a@test.ru>'), '&lt;a@test.ru&gt;');
      //assert.equal(markdownFilter('"<script>alert(1)</script>'), '&quot;&lt;script&gt;alert(1)&lt;/script&gt;'); FAILS
      assert.equal(markdownFilter('[test](http://google.com)'), '<a href="http://google.com">test</a>\n');
      assert.equal(markdownFilter('_test_ <p>html</p>'), '<em>test</em> &lt;p&gt;html&lt;/p&gt;');
      assert.equal(markdownFilter('~~test~~'), '~~test~~'); // stroke should not be recognized
      assert.equal(markdownFilter('`test`'), '`test`'); // inline code should not be recognized
      assert.equal(markdownFilter('# Test'), '# Test');
      assert.equal(markdownFilter('* Test'), '* Test');
      assert.equal(markdownFilter('1 Test'), '1 Test');
      assert.equal(markdownFilter('1. Test'), '1. Test');
      assert.equal(markdownFilter('```tet```'), '```tet```');
      assert.equal(markdownFilter('    test'), '    test'); // code with indent should not be recognized
      assert.equal(markdownFilter('a & b'), 'a &amp; b');
      assert.equal(markdownFilter('http://google.com'), '<a href="http://google.com">http://google.com</a>');
      assert.equal(markdownFilter('\\'), '\\');
      assert.equal(markdownFilter('![test](https://simpleweek.com/bundles/todocore/images/logo0000.png?v28)'), '!<a href="https://simpleweek.com/bundles/todocore/images/logo0000.png?v28">test</a>\n');
      assert.equal(markdownFilter(''), '');
    })
  });
});
