## Seed

Here are some test seed mongo db inserst. 


##### Companies

```
db.companies.insertMany(
   [
    {
      name: "Truveris",
      name_lower: 'truveris',
      description: "Brokers, health plans, unions, employers, pharmaceutical manufacturers, and consumers use our technology and insights to make smarter decisions.",
      description: 'This is a super duper fantastic company, YO!'
      logoUrl: 'https://uiba-test.s3.amazonaws.com/5932244f-7592-44bf-b5e1-61cabe9b9523_sailing.jpg',
      websiteUrl: 'https://www.facebook.com',
      specialties: ['Magic', 'Sex', 'Ducks', 'Rock n roll'],
      industry: 'Awesome Sauce'
      foundedDate: new Date(2009, 1, 1),
      size: 100,
      logoImg: "images/truveris-logo.png"
    },
    {
      name: "Blue Orange Digital",
      name_lower: "blue_orange_digital",
      description: "Quinoa brooklyn echo park, trust fund meh viral pork belly.",
      description: 'This is a super duper fantastic company, YO!'
      logoUrl: 'https://uiba-test.s3.amazonaws.com/5932244f-7592-44bf-b5e1-61cabe9b9523_sailing.jpg',
      websiteUrl: 'https://www.facebook.com',
      specialties: ['Magic', 'Sex', 'Ducks', 'Rock n roll'],
      industry: 'Awesome Sauce'
      foundedDate: new Date(2010, 1, 20),
      size: 100,
      logoImg: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
    }, 
    {
      name: "Good.Co",
      name_lower: "goodco",
      description: "Quinoa brooklyn echo park, trust fund meh viral pork belly.",
      description: 'This is a super duper fantastic company, YO!'
      logoUrl: 'https://uiba-test.s3.amazonaws.com/5932244f-7592-44bf-b5e1-61cabe9b9523_sailing.jpg',
      websiteUrl: 'https://www.facebook.com',
      specialties: ['Magic', 'Sex', 'Ducks', 'Rock n roll'],
      industry: 'Awesome Sauce'
      foundedDate: new Date(2010, 1, 20),
      size: 100,
      logoImg: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
    },
    {
      name: "EverFi, Inc",
      name_lower: "everfi_inc",
      description: "Quinoa brooklyn echo park, trust fund meh viral pork belly.",
      description: 'This is a super duper fantastic company, YO!'
      logoUrl: 'https://uiba-test.s3.amazonaws.com/5932244f-7592-44bf-b5e1-61cabe9b9523_sailing.jpg',
      websiteUrl: 'https://www.facebook.com',
      specialties: ['Magic', 'Sex', 'Ducks', 'Rock n roll'],
      industry: 'Awesome Sauce'
      foundedDate: new Date(2010, 1, 20),
      size: 100,
      logoImg: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
    }
   ]
)
```

##### Jobs

Companies Need to Be loaded First.

```
var companies = [{name: 'Blue Orange Digital', start: new Date(2014, 6, 20), end: new Date(2015, 1, 20)},
                 {name: 'Good.Co', start: new Date(2013, 2, 20), end: new Date(2014, 5, 20)},
                 {name: "EverFi, Inc", start: new Date(2012, 1, 20), end: new Date(2013, 1, 20)}]

var profile = db.profiles.findOne();

db.companies.find().snapshot().forEach(function (company) {
  var companyData = companies.filter(function (a) {return a.name === company.name })
  if (companyData.length){
    db.jobs.insertOne(
      {
        company_id: company._id,
        profile_id: profile._id,
        current: false,
        companyName: companyData[0].name,
        title: 'Software Engineer',
        description: "Vinyl swag actually mixtape authentic. Vinyl swag actually mixtape authentic. Vinyl swag actually mixtape authentic. Quinoa brooklyn echo park, trust fund meh viral pork belly XOXO. Banh mi blue bottle tattooed pug, keffiyeh pabst craft beer biodiesel neutra try-hard VHS waistcoat polaroid portland cold-pressed. Before they sold out polaroid ennui vinyl schlitz.",
        startDate: companyData[0].start,
        endDate: companyData[0].end, 
        active: true
      }
    )
  }
})

```

##### Skills

```
var skills = [
  {type: 'Node.JS', proficiency: 'expert', lengthOfUse: 5},
  {type: 'Ruby', proficiency: 'expert', lengthOfUse: 1},
  {type: 'WebGL', proficiency: 'learning', lengthOfUse: 0},
  {type: 'EMACS', proficiency: 'intermediate', lengthOfUse: 5},
]

var profile = db.profiles.findOne();

skills.forEach(function (skill) {
    
  db.skills.insertOne(
    {
      profile_id: profile._id,
      type: skill.type,
      proficiency: skill.proficiency,
      lengthOfUse: skill.lengthOfUse,
    }
  )

});


```

##### Languages


```
var languages = [
                {language: 'English', proficiency: 'elementary proficiency', experience: 2},
                {language: 'French', proficiency: 'minimum professional proficiency', experience: 2},
              ]

var profile = db.profiles.findOne();

languages.forEach(function (school) {
    
  db.languages.insertOne(
    {
      profile_id: profile._id,
      language: school.language,
      proficiency: school.proficiency,
      experience: school.experience,
    }
  )

});

```
##### Projects


```
var projects = [
                {projectUrl: 'www.google.com', name: 'Whitepaper', start: new Date(2013, 2, 20), end: new Date(2014, 5, 20)},
                {projectUrl: 'www.google.com', name: "Website", start: new Date(2012, 1, 20), end: new Date(2013, 1, 20)}]
              ]

var profile = db.profiles.findOne();

projects.forEach(function (project) {
    
  db.projects.insertOne(
    {
      profile_id: profile._id,
      name: project.name,
      projectUrl: project.projectUrl,
      startDate: project.start,
      endDate: project.end,
      current: false,
    }
  )

});

```


##### Schools


```
var schools = [
              {name: 'Dev Bootcamp', start: new Date(2014, 6, 20), end: new Date(2015, 1, 20), major: ['Computer Science', 'Philosophy'], minor: ['Theater'], degree: ['Baccalaureate', 'Masters']},
               {name: 'Duke University', start: new Date(2012, 1, 20), end: new Date(2013, 1, 20), major: ['Art History'], minor: [], degree: ['Baccalaureate']}
               ]

var profile = db.profiles.findOne();

schools.forEach(function (school) {
    
  db.schools.insertOne(
    {
      profile_id: profile._id,
      name: school.name,
      startDate: school.start,
      endDate: school.end,
      current: false,
      major: school.major,
      minor: school.minor,
      degree: school.degree
    }
  )

});

```

#### School Names

First [download the seed list](https://inventory.data.gov/dataset/032e19b4-5a90-41dc-83ff-6e4cd234f565/resource/38625c3d-5388-4c16-a30f-d105432553a4/download/postscndryunivsrvy2013dirinfo.csv)

Then set the dir path in the line below:

From Command Line: 

```
mongoimport -d uiba -c schoolnames --type csv --file ~/<DIR PATH>/postscndryunivsrvy2013dirinfo.csv --headerline

From Database, run the next two commands.
```
db.schoolnames.update({}, { $unset: { UNITID: '', ADDR: '', CITY: '', STABBR: '', ZIP: '', FIPS: '', OBEREG: '', CHFNM: '', CHFTITLE: '', GENTELE: '', FAXTELE: '', EIN: '', OPEID: '', OPEFLAG: '', WEBADDR: '', ADMINURL: '', FAIDURL: '', APPLURL: '', NPRICURL: '', SECTOR: '', ICLEVEL: '', CONTROL: '', HLOFFER: '', UGOFFER: '', GROFFER: '', HDEGOFR1: '', DEGGRANT: '', HBCU: '', HOSPITAL: '', MEDICAL: '', TRIBAL: '', LOCALE: '', OPENPUBL: '', ACT: '', NEWID: '', DEATHYR: '', CLOSEDAT: '', CYACTIVE: '', POSTSEC: '', PSEFLAG: '', PSET4FLG: '', RPTMTH: '', IALIAS: '', INSTCAT: '', CCBASIC: '', CCIPUG: '', CCIPGRAD: '', CCUGPROF: '', CCENRPRF: '', CCSIZSET: '', CARNEGIE: '', LANDGRNT: '', INSTSIZE: '', CBSA: '', CBSATYPE: '', CSA: '', NECTA: '', F1SYSTYP: '', F1SYSNAM: '', F1SYSCOD: '', COUNTYCD: '', COUNTYNM: '', CNGDSTCD: '', LONGITUD: '', LATITUDE: '' } } , {multi: true});
db.schoolnames.update({}, { $rename: { 'INSTNM': 'name' } } , {multi: true})

```
