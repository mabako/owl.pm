#!/bin/env node

var express = require('express')
  , app = express()
  , http = require('http')
  , redirects = require('./static_redirects');


app.configure(function() {
    app.set('port', process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 3000);
    app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1')
    app.use(app.router);
});

app.get('/f/:forum', function(req, res) {
    res.redirect('http://forums.owlgaming.net/forumdisplay.php?f=' + req.params.forum);
});

app.get('/fm/:form', function(req, res) {
    res.redirect('http://forums.owlgaming.net/forms.php?do=form&fid=' + req.params.form);
});

app.get('/u/:user', function(req, res) {
    res.redirect('http://forums.owlgaming.net/member.php?username=' + req.params.user);
});

app.get('/:topic(\\d+)', function(req, res) {
    res.redirect('http://forums.owlgaming.net/showthread.php?t=' + req.params.topic);
});

Object.keys(redirects).forEach(function(key) {
	var value = redirects[key];
	app.get('/' + key, function(req, res) {
		res.redirect(value);
	})
})

http.createServer(app).listen(app.get('port'), app.get('ip'));
