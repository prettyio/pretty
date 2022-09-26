#!/usr/bin/env node
var cli = require('../../cli/index');

module.exports = cli.run(process.argv.slice(2));
