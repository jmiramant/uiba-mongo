import { createSelector } from 'reselect';

const ApplicantSelector = state => state.applicant.applicants
const ApplicantFilterSelector = state => state.applicant.filters
const ApplicantAddressFilter = state => state.address

const getApplicants = (applicants, filters, address) => {
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
    
    filtered = _.filter(filtered, (a) => { 
      if (a.filterData && a.filterData.address) {
        filters.address.rangeZips.indexOf(a.filterData.address) >= 0
      } else {return false}
    });
    
  } 
  
  return filtered
}

export default createSelector(
  ApplicantSelector,
  ApplicantFilterSelector,
  ApplicantAddressFilter,
  getApplicants
);