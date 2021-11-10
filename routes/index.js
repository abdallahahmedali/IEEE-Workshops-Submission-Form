var express = require('express');
var router = express.Router();
const sendgrid = require('@sendgrid/mail');
const { application } = require('express');
const { render } = require('ejs');
const mail = require('@sendgrid/mail');
// sendgrid.setApiKey('');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "IEEE'22 Workshops admission" });
});
router.post('/form', function(req, res, next) {
  var application = req.body;
  var view = "success";
  const msg = {
    to : req.body.email,
    from : "abouelabbas2000@gmail.com",
    subject: "Workshop application status",
    templateId: 'd-ec1df3c2089641599b83fa58f96a709c',
    dynamic_template_data : {
      name: application.name,
      email:application.email,
      uni:application.uni,
      gender:(application.gender == 0)? "Female" : "Male",
      workshops: application.workshops
    }
  }
  sendgrid.send(msg, function(err, info){
    if(err){
      view = "failed";
    }
  });
  res.render(view, { title: "IEEE'22 Workshops status",application:application });
});

module.exports = router;
