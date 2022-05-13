class CreateIssueValidation {
  validate(issueData) {
    const { issue_title, issue_text, created_by } = issueData;
    
    const areSomeRequiredFieldsMissing = [issue_title, issue_text, created_by].some(value => !value);
    if (areSomeRequiredFieldsMissing) {
      throw new Error('required field(s) missing');
    }
  }
}

module.exports = CreateIssueValidation;
