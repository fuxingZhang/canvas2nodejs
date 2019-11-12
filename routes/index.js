/**
 * Created by zfx on 4/24/2018
 * router
 */
const fs = require('fs');

const paths = fs.readdirSync(__dirname).filter(path => path != 'index.js');

const routes = paths.map(path => require(`./${path}`));

module.exports = routes;
