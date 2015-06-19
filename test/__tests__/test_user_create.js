// Test user create w/Jest

// Tell Jest to run test on actual file, not a "copy"
jest.dontMock('../../app/js/components/create_user.jsx');

var React = require('react/addons');
var CreateUser = require('../../app/js/components/create_user.jsx');
var TestUtils = React.addons.TestUtils;

describe('user creation', function() {
  it('should create a user, yo', function() {
    expect(true).toEqual(true);
  });
});
