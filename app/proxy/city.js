const models = require('../models')

const CityModel = models.City

/**
 * 基本
 */

const field = { _id: 0, create_at: 0, __v: 0 }

exports.CityModel = CityModel

exports.newAndSave = function (data) {
  const city = new CityModel(data)
  return city.save()
}

exports.delete = function (query) {
  return CityModel.remove(query)
}

exports.update = function (query, data) {
  return CityModel.update(query, {
    $set: data
  })
}

exports.find = function (query, opt) {
  return CityModel.find(query, field, opt)
}

exports.findOne = function (query, opt) {
  return CityModel.findOne(query, field, opt)
}

exports.findOneById = function (id) {
  return CityModel.findById(id, field)
}

exports.check = function (query, opt) {
  return CityModel.findOne(query, '_id', opt)
}

exports.count = function (query) {
  return CityModel.count(query)
}
