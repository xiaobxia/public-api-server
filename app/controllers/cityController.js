/**
 * 通过编码获取行政区划
 * @param ctx
 * @returns {Promise<void>}
 */
exports.getDistrictByCode = async function (ctx) {
  const query = ctx.query
  try {
    const data = ctx.validateData({
      // 编码
      code: { required: true, type: 'string' },
      // 层级{0:本级,1:一子级,2:二子级,3:三子级}
      subdistrict: { required: true, type: 'string' }
    }, query)
    const res = await ctx.services.city.getDistrictByCode(data)
    ctx.body = ctx.resuccess(res)
  } catch (err) {
    ctx.body = ctx.refail(err)
  }
}
