## Seed

Here are some test seed mongo db inserst. 

##### Companies

```
db.companies.insertMany(
   [
    {
      name: "Blue Orange Digital",
      location: "The World",
      description: "Quinoa brooklyn echo park, trust fund meh viral pork belly.",
      foundedDate: new Date(2010, 1, 20),
      size: 100,
      logoImg: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
    }, 
    {
      name: "Good.Co",
      location: "San Francisco",
      description: "Quinoa brooklyn echo park, trust fund meh viral pork belly.",
      foundedDate: new Date(2010, 1, 20),
      size: 100,
      logoImg: "http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png"
    },
    {
      name: "EverFi, Inc",
      location: "Washington D.C.",
      description: "Quinoa brooklyn echo park, trust fund meh viral pork belly.",
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

var user = db.users.findOne();

db.companies.find().snapshot().forEach(function (company) {
  var companyData = companies.filter(function (a) {return a.name === company.name })
  if (companyData.length){
    db.jobs.insertOne(
      {
        company_id: company._id,
        user_id: user._id,
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