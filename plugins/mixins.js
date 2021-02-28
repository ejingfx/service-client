import _ from 'lodash'

export default {
  methods: {
    resolveError (code) {
      const ERROR_MESSAGES = [
        { 400: 'Bad Request' },
        { 403: 'Forbidden' },
        { 404: 'Page Not Found' },
        { 500: 'Server Error' },
        { 503: 'Service Unavailable' },
        { 504: 'Gateway Timeout' }
      ]

      const keyString = code.toString()
      const key = _.findKey(ERROR_MESSAGES, code)
      const defaultMessage = ERROR_MESSAGES[_.findKey(ERROR_MESSAGES, 500)][500]

      if (key) {
        return ERROR_MESSAGES[key][keyString]
      } else {
        return defaultMessage
      }
    },
    textLimit (title, limit = 50) {
      if (title.length > limit) {
        return title.substring(0, (limit - 3)) + '...'
      } else {
        return title
      }
    },
    empty (value) {
      return _.isEmpty(value)
    },
    isString (value) {
      return _.isString(value)
    },
    showPlaceholder (image, background = true) {
      const noImage = require('../static/images/no-image.jpg')
      const placeholder = { backgroundImage: `url(${noImage})` }

      switch (background) {
        case true: {
          if (_.isNull(image) || _.isEmpty(image) || image === '') {
            return placeholder
          } else {
            return { backgroundImage: `url(${image})` }
          }
        }
        default: {
          if (_.isNull(image)) {
            return noImage
          } else {
            return image
          }
        }
      }
    }
  }
}
