const Router = require('koa-router')
const reqlib = require('app-root-path').require
const config = reqlib('/config/index')
const controllers = require('../controllers')

const projectName = config.project.projectName
if (!projectName) {
  console.error('projectName is required')
  process.exit()
}
const router = new Router({
  prefix: `/${projectName}`
})

/**
 * 端口测试
 */
router.get('/', async function (ctx) {
  ctx.body = 'ok'
})

/**
 * 城市接口模块
  */
router.get('/city/getDistrictByCode', controllers.cityController.getDistrictByCode)

module.exports = router
