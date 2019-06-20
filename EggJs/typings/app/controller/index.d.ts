// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGoods = require('../../../app/controller/goods');
import ExportHome = require('../../../app/controller/home');

declare module 'egg' {
  interface IController {
    goods: ExportGoods;
    home: ExportHome;
  }
}
