import Vue from 'vue'
import _ from 'lodash'
import moment from 'moment'
moment.suppressDeprecationWarnings = true

Vue.filter('format_date', function (val) {
  if (_.isNull(val) || _.isUndefined(val)) {
    return ''
  } else {
    const str = val.split(' ')[0].concat('T').concat(val.split(' ')[1])
    const dt = moment().format(str, 'YYYY-MM-DD')

    return moment(dt, 'YYYY-MM-DD').format('Y.MM.DD')
  }
})

Vue.filter('format_datetime', function (val) {
  if (_.isNull(val) || _.isUndefined(val)) {
    return ''
  } else {
    const str = val.split(' ')[0].concat('T').concat(val.split(' ')[1])
    const dt = moment().format(str, 'YYYY-MM-DD')

    return moment(dt, 'YYYY-MM-DD').format('Y-MM-DD')
  }
})

Vue.filter('format_comment_date', function (val) {
  if (_.isNull(val) || _.isUndefined(val)) {
    return ''
  } else {
    const str = val.split(' ')[0].concat('T').concat(val.split(' ')[1]).concat(val.split(' ')[2])
    const dt = moment().format(str)

    return moment().from(dt)
  }
})

Vue.filter('user_initial', function (val) {
  if (typeof val === 'undefined') { return '' }
  return val.charAt(0).toUpperCase()
})

Vue.filter('format_snackbar', function (val) {
  if (typeof val === 'undefined') { return '' }

  if (typeof val === 'object') {
    let messages = ''
    Object.keys(val).forEach((key, i) => {
      let sep = ''
      if (Object.keys(val).length - 1 === i) {
        sep = '.'
      } else {
        sep = ' &'
      }
      messages += `${val[key].message.charAt(0).toUpperCase() + val[key].message.slice(1)}${sep} `
    })
    return messages
  } else {
    return `${val}.`
  }
})
