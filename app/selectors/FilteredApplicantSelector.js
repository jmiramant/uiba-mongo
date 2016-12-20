import { createSelector } from 'reselect';

const ApplicantSelector = state => state.applicant.applicants
const ApplicantFilterSelector = state => state.applicant.filters
const ApplicantScoreFilter = state => state.score.scores

const getApplicants = (applicants, filters, scores) => {
  let filtered = [...applicants];

  if (filters.school && filters.school.length > 0) {
    filtered = _.filter(filtered, (appl) => {
      return appl.filterData.school.some(r=> filters.school.indexOf(r) >= 0)
    });
  }
  if (filters.skill && filters.skill.length > 0) {
    const resp = [];
    
    _.forEach(filters.skill, (s) => {
      const pass = _.filter(filtered, (a) => {
        return a.filterData.skill.some(r => {return (s.type === r.type) && (s.proficiency <= r.proficiency) && (s.lengthOfUse <= r.lengthOfUse)})
      });
      resp.push(pass)
    });
    filtered = _.uniq(_.flatten(resp));
  }

  if (filters.address && filters.address.rangeZips) {
    const filterZips = _.map(filters.address.rangeZips, (a) => {return a.zip_code})
    filtered = _.filter(filtered, (a) => {
      if (a.filterData && a.filterData.address.length > 0) {
        return _.intersection(a.filterData.address, filterZips).length > 0
      } else {return false}
    });
  } 

  if (filters.score && filters.score.min && filters.score.max) {
    const sIds = _.map(scores, s => {return s._id});
    filtered = _.filter(filtered, (appl) => {
      return sIds.indexOf(appl._id) >= 0
    });
  }


  return filtered
}

export default createSelector(
  ApplicantSelector,
  ApplicantFilterSelector,
  ApplicantScoreFilter,
  getApplicants
);