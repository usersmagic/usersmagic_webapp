// Get project results index page

const Project = require('../../../../models/project/Project');
const Submition = require('../../../../models/submition/Submition');

module.exports = (req, res) => {
  Submition.findSubmitionsCumulativeDataByCampaignId(req.query ? req.query.id : null, (err, questions) => {
    if (err) return res.redirect('/');

    Project.findOneByFields({
      _id: req.query.id
    }, {}, (err, project) => {
      if (err) return res.redirect('/');

      return res.render('projects/report/index', {
        page: 'projects/report/index',
        title: 'Results',
        includes: {
          external: {
            css: ['page', 'general', 'header', 'contentHeader', 'logo', 'buttons', 'inputs', 'fontawesome'],
            js: ['page']
          }
        },
        company: req.session.company,
        project,
        questions
      });
    });
  });
}
