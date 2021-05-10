// Save the data of filters on the target with id from the query
// XMLHTTP request

const Project = require('../../../../../models/project/Project');
const Target = require('../../../../../models/target/Target');

module.exports = (req, res) => {
  Target.findTargetById(req.query.id, (err, target) => {
    if (err) {
      res.write(JSON.stringify({ error: err, success: false }));
      return res.end();
    }
    
    Project.findOneByFields({
      _id: target.project_id,
      creator: req.session.company._id
    }, {}, (err, project) => {
      if (err || !project) {
        res.write(JSON.stringify({ error: err, success: false }));
        return res.end();
      }

      Target.saveFilters(req.query.id, req.body, err => {
        if (err) {
          res.write(JSON.stringify({ error: err, success: false }));
          return res.end();
        }
    
        res.write(JSON.stringify({ success: true }));
        return res.end();
      });
    });
  });
}
