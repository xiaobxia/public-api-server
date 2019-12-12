const mongoose = require('mongoose')

const Schema = mongoose.Schema
// 字典
const schema = new Schema({
  // 城市code,10
  code: String,
  // 城市名,中华人民共和国
  name: String,
  // 层级(country,province,city,district,street)
  level: String,
  // 全名
  full_name: String,
  // 所在code
  country_code: String,
  province_code: String,
  city_code: String,
  district_code: String,
  street_code: String,
  parent_level: String,
  parent_code: String,
  parent_name: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ code: 1 }, { unique: true })

module.exports = mongoose.model('City', schema)
