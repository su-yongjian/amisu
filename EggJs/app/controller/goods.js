'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = 'hi, list';
  }
}

module.exports = GoodsController;
