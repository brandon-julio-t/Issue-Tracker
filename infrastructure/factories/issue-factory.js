const { uniqueID } = require("mocha/lib/utils");
const Issue = require("../entities/issue");

class IssueFactory {
  create(data) {
    const entity = new Issue();
    Object.assign(entity, data);
    entity._id = entity._id || uniqueID();
    return entity;
  }
}

module.exports = IssueFactory;
