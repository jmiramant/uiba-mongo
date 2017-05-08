import mongoose from 'mongoose';
import Profile from '../../models/profile';
import Skill from '../../models/skill';
import Interest from '../../models/interest';
import School from '../../models/school';
import Job from '../../models/job';
import Language from '../../models/language';
// {
//   profile: {
//     // user_id: {type: Schema.Types.ObjectId, ref: 'User'},
//     // company_id: {type: Schema.Types.ObjectId, ref: 'Company'},
//     name: `${firstName} ${lastName}`,
//     firstName: 'testapi',
//     lastName: { type: String, default: '' },
//     email: { type: String, default: '' },
//     headline: { type: String, default: '' },
//     gender: { type: String, default: '' },
//     location: { type: String, default: '' },
//     website: { type: String, default: '' },
//     picture: { type: String, default: '' },
//   },
//   interests: [{language: 'asdlas', proficiency: 1, experience:1 }],
//   projects: [{
//     profile_id: {type: Schema.Types.ObjectId, ref: 'Profile', required: true },
//     name: { type: String, default: '', required: true },
//     projectUrl: { type: String, default: ''},
//     description: { type: String, default: '', required: true },
//     startDate: {type: Date, required: true},
//     endDate: {type: Date},
//     current: {type: Boolean, required: true, default: false },
//   }],
//   languages: [
//     profile_id: {type: Schema.Types.ObjectId, ref: 'Profile', required: true },
//     language: { type: String, default: '', required: true },
//     proficiency: { type: Number,
//                    enum: [1,2,3,4],
//                    required: true
//                  },
//     experience: { type: Number, enum: [0,1,3,5,10] }
//   ],
//   schools: [{
//     profile_id: {type: Schema.Types.ObjectId, ref: 'Profile'},
//     name: { type: String, required: true },
//     major: [{type: String, default: '', required: true}],
//     minor: [{type: String, default: ''}],
//     degree: {type: String, default: '', required: true},
//     startDate: {type: Date, required: true},
//     endDate: {type: Date},
//     current: {type: Boolean, required: true, default: false },
//   }],
//   jobs: [{
//     company_id: {type: Schema.Types.ObjectId, ref: 'Company'},
//     profile_id: {type: Schema.Types.ObjectId, ref: 'Profile'},
//     companyName: { type: String, required: true },
//     title: {type: String, default: '', required: true},
//     headline: {type: String, default: ''},
//     description: {type: String, default: ''},
//     startDate: {type: Date, required: true},
//     endDate: {type: Date},
//     current: {type: Boolean, required: true, default: false },
//   }],
// }

const errHandler = (err) => {
  new Error(err);
};

// const JSONize =(str) => {
//   return JSON.parse(str
//     .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":'})
//     .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"'}));
// }
//
// const createNewAcct = async function(data) {
//   const profData = {
//     ...JSONize(data.profile),
//     service: 'api'
//   };
//
//   Profile.create(profData, (err, profile) => {
//     if (data.skills) {
//       const skillData = JSONize(data.skills).map( s => {return {...s, profile_id: profile._id} });
//       Skill.create(skillData, err => console.log(err))
//     }
//
//     if (data.interests) {
//       const interestData = JSONize(data.interests).map( s => {return {...s, profile_id: profile._id} });
//       Interest.create(interestData, err => console.log(err))
//     }
//
//     if (data.schools) {
//       const schoolData = JSONize(data.schools).map( s => {return {...s, profile_id: profile._id} });
//       Schools.create(schoolData, err => console.log(err))
//     }
//
//     if (data.jobs) {
//       const jobData = JSONize(data.jobs).map( s => {return {...s, profile_id: profile._id} });
//       Schools.create(jobData, err => console.log(err))
//     }
//
//     if (data.languages) {
//       const languageData = JSONize(data.languages).map( s => {return {...s, profile_id: profile._id} });
//       Language.create(languageData, err => console.log(err))
//     }
//
//
//     return profile;
//   });
// }
//
// export function create(req, res) {
//   let data = req.body || {}
//   // if (!req.user || !req.user.profile_id) return res.status(404).send({error: 'No Current Profile'});
//   // const query = {"_id": mongoose.Types.ObjectId(req.user.profile_id)};
//   createNewAcct(data);
//   return res.json({ msg: 'yay'});
// }

export default {
};
