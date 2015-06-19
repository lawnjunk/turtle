// Test dashboard with Jest

// Tell Jest to run tests on actual file, not a "copy"

jest.dontMock('../../app/js/components/dashboard.jsx');

var React     = require('react/addons');
var Dashboard = require('../../app/js/components/dashboard.jsx');
var TestUtils = React.addons.TestUtils;

describe('dashboard', function() {
  it('should be composed of msgs and the msg thread', function() {
    var messages = <MessageSection />
    var DOM = TestUtils.renderIntoDocument(messages);

    expect(DOM.)
  });
});
