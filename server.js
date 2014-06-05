#!/bin/env node

var express = require('express')
  , app = express()
  , http = require('http')
  , redirects = require('./static_redirects');


app.configure(function() {
    app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
    app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1')
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(app.router);
});

app.get('/f/:forum_id', function(req, res) {
    res.redirect('http://forums.owlgaming.net/forumdisplay.php?f=' + req.params.forum_id);
});

app.get('/fm/:form_id', function(req, res) {
    res.redirect('http://forums.owlgaming.net/forms.php?do=form&fid=' + req.params.form_id);
});

app.get('/:thread_id(\\d+)', function(req, res) {
    res.redirect('http://forums.owlgaming.net/showthread.php?t=' + req.params.thread_id);
});

app.get('/u/:username', function(req, res) {
    res.redirect('http://forums.owlgaming.net/member.php?username=' + req.params.username);
});

Object.keys(redirects).forEach(function(key) {
	var value = redirects[key];
	app.get('/' + key, function(req, res) {
		res.redirect(value);
	})
})

app.get('/', function(req, res) {
  res.render('index', {routes: app.routes.get})
});

http.createServer(app).listen(app.get('port'), app.get('ip'));
