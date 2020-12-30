// Get project object for client side with specified options

const moment = require('moment-timezone');

module.exports = (project, options, callback) => {
  if (!project || !project._id)
    return callback('document_not_found');

  let timezone;

  if ((options && options.timezone)) {
    if (!moment.tz.zone(options.timezone))
      return callback('bad_request');

    timezone = options.timezone;
  }

  return {
    _id: project._id.toString(),
    type: project.type,
    status: project.status,
    created_at: timezone ? moment(project.created_at).tz(timezone).format('DD[.]MM[.]YYYY[, ]HH[:]mm') : project.created_at,
    name: project.name,
    description: project.description,
    image: project.image,
    questions: project.questions,
    welcome_screen: project.welcome_screen
  };
}
