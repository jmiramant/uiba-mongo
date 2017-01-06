const setSibRole = (user) => {
  let role = 'applicant';
  if (user.role.indexOf(2) >= 0 ) {role = 'admin'};
  return role
}

export function SIBIdentifyAndSignIn(prof, user) {
  if (sendinblue) {
    sendinblue.identify(prof.email, {
      'firstName': prof.firstName,
      'lastName': prof.lastName,
      'profile_id' : prof._id,
    });
    const role = setSibRole(user);
    sendinblue.track('userSignUp', {role})
  }
};

export function SIBsignIn(user) {
  if (sendinblue) {
    const role = setSibRole(user);
    sendinblue.track('userSignIn', {role});
  }
};

export function SIBApplySubmit(prof) {
  if (sendinblue) {
    if(!prof.apply.applyComplete) {sendinblue.track('applicantSubmitted', {...prof})}
  }
}

export default {
  SIBIdentifyAndSignIn,
  SIBsignIn,
  SIBApplySubmit,
}