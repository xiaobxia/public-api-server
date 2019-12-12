const Proxy = require('../proxy')

const CityProxy = Proxy.City

function formatSubdistrict (subdistrict) {
  if (subdistrict === '1') {
    return 1
  }
  if (subdistrict === '2') {
    return 2
  }
  if (subdistrict === '3') {
    return 3
  }
  return 0
}

function getLevelList (code, subdistrict) {
  const levelList = ['country', 'province', 'city', 'district', 'street']
  let nowLevelIndex = 0
  if (code !== '10') {
    nowLevelIndex = code.length / 2
  }
  let endIndex = nowLevelIndex + subdistrict + 1
  endIndex = endIndex > levelList.length ? levelList.length : endIndex
  return levelList.slice(nowLevelIndex, endIndex)
}

function createNewItem (item) {
  return {
    code: item.code,
    name: item.name,
    level: item.level,
    full_name: item.full_name,
    country_code: item.country_code,
    province_code: item.province_code,
    city_code: item.city_code,
    district_code: item.district_code,
    street_code: item.street_code,
    parent_level: item.parent_level,
    parent_code: item.parent_code,
    parent_name: item.parent_name,
    children: []
  }
}

exports.getDistrictByCode = async function (params) {
  const opt = {
    sort: 'code'
  }
  const subdistrict = formatSubdistrict(params.subdistrict)
  const levelList = getLevelList(params.code, subdistrict)
  if (subdistrict === 0 || levelList.length === 1) {
    // 如果只查一层
    const res = await CityProxy.find({
      code: params.code
    }, opt)
    return res[0]
  } else {
    let query = {}
    query[`${levelList[0]}_code`] = params.code
    query.level = {
      $in: levelList
    }
    const res = await CityProxy.find(query, opt)
    let tree = {}
    // 因为按顺序排了
    for (let i = 0; i < res.length; i++) {
      const item = res[i]
      if (levelList.indexOf(item.level) === 0) {
        tree = createNewItem(item)
      } else if (levelList.indexOf(item.level) === 1) {
        tree.children.push(createNewItem(item))
      } else if (levelList.indexOf(item.level) === 2) {
        tree.children[tree.children.length - 1].children.push(createNewItem(item))
      } else if (levelList.indexOf(item.level) === 3) {
        tree.children[tree.children.length - 1].children[tree.children[tree.children.length - 1].children.length - 1].children.push(createNewItem(item))
      }
    }
    return tree
  }
}
