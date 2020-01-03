var path = require('path')
var express = require('express')
var mockjs = require('express-mockjs')

var app = express()

// Using the default path /
app.use(mockjs(path.join(__dirname)))

// or custom path /api
// app.use('/api', mockjs(path.join(__dirname, 'mocks')))

// Add your middleware here, etc.

app.listen(3000);