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
