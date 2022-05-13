class Issue {
  constructor(
    _id = "",
    issue_title = "",
    issue_text = "",
    created_on = new Date(),
    updated_on = new Date(),
    created_by = "",
    project_id = "",
    assigned_to = "",
    open = true,
    status_text = ""
  ) {
    this._id = _id;
    this.issue_title = issue_title;
    this.issue_text = issue_text;
    this.created_on = created_on;
    this.updated_on = updated_on;
    this.created_by = created_by;
    this.project_id = project_id;
    this.assigned_to = assigned_to;
    this.open = open;
    this.status_text = status_text;
  }
}

module.exports = Issue;
