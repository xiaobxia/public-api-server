const proxys = require('../../app/proxy/index')
const citys = require('./pcas-code')
const countryCode = '10'
const countryName = '中华人民共和国'
proxys.City.newAndSave({
  code: '10',
  name: '中华人民共和国',
  level: 'country',
  full_name: '中华人民共和国',
  country_code: '10'
}).then((doc) => {
  console.log(doc)
})

citys.forEach((province) => {
  proxys.City.newAndSave({
    code: province.code,
    name: province.name,
    level: 'province',
    full_name: countryName + province.name,
    country_code: countryCode,
    province_code: province.code,
    parent_level: 'country',
    parent_code: countryCode,
    parent_name: countryName
  }).then((doc) => {
    console.log(doc)
  })
  province.children.forEach((city) => {
    proxys.City.newAndSave({
      code: city.code,
      name: city.name,
      level: 'city',
      full_name: countryName + province.name + city.name,
      country_code: countryCode,
      province_code: province.code,
      city_code: city.code,
      parent_level: 'province',
      parent_code: province.code,
      parent_name: province.name
    }).then((doc) => {
      console.log(doc)
    })
    city.children.forEach((district) => {
      proxys.City.newAndSave({
        code: district.code,
        name: district.name,
        level: 'district',
        full_name: countryName + province.name + city.name + district.name,
        country_code: countryCode,
        province_code: province.code,
        city_code: city.code,
        district_code: district.code,
        parent_level: 'city',
        parent_code: city.code,
        parent_name: city.name
      }).then((doc) => {
        console.log(doc)
      })
      district.children.forEach((street) => {
        proxys.City.newAndSave({
          code: street.code,
          name: street.name,
          level: 'street',
          full_name: countryName + province.name + city.name + district.name + street.name,
          country_code: countryCode,
          province_code: province.code,
          city_code: city.code,
          district_code: district.code,
          street_code: street.code,
          parent_level: 'district',
          parent_code: district.code,
          parent_name: district.name
        }).then((doc) => {
          console.log(doc)
        })
      })
    })
  })
})
