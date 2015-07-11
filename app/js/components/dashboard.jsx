var React           = require('react/addons'            );
var MessageSection  = require('./MessageSection.jsx'    );
var Navbar          = require('./nav_bar.jsx'           );
var ThreadSection   = require('./ThreadSection.jsx'     );
var ChatExampleData = require('./ChatExampleData'       );
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var Cookies         = require('cookies-js'              );

<<<<<<< HEAD

ChatExampleData.init();
ChatWebAPIUtils.getAllMessages();

var Dashboard = React.createClass ({
=======
export default class Dashboard extends React.Component {
>>>>>>> 019a1f495a9d6305ce5086f0f4bac2832ae9a0e1
  render() {
    var dashboardSection;
    if (Cookies.get('eat')) {
      ChatExampleData.init();
      ChatWebAPIUtils.getAllMessages();
      var intervalID = window.setInterval(function() { ChatWebAPIUtils.getAllMessages() }, 5000);
      dashboardSection = <div><MessageSection />
        <ThreadSection /></div>;
    } else {
      dashboardSection = <div></div>;
    }
    return (
      <div className="dashboard">
      {dashboardSection}
      </div>
    );
  }
});

module.exports = Dashboard;
