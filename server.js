// require('zone.js/dist/zone-node');
// require('reflect-metadata');

const express = require('express');
const path = require('path');
// const ngUniversal = require('@nguniversal/express-engine');
// const {
//   provideModuleMap,
// } = require('@nguniversal/module-map-ngfactory-loader');

// const {
//   AppServerModuleNgFactory,
//   LAZY_MODULE_MAP,
// } = require('./dist-server/main.bundle');

// function angularRouter(req, res) {
//   res.render('index', {
//     req,
//     res,
//   });
// }

const app = express();

// app.engine(
//   'html',
//   ngUniversal.ngExpressEngine({
//     bootstrap: AppServerModuleNgFactory,
//     providers: [LAZY_MODULE_MAP],
//   })
// );

// app.set('view engine', 'html');
// app.set('views', 'dist');

// app.get('/', angularRouter);
app.use(express.static(`${__dirname}/dist`));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen('3000', () => console.log('SERVER IS RUNNING'));
