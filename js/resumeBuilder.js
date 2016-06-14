/*
This is empty on purpose! Your code to build the resume will go here.
 */

String.prototype.replaceData = function(value){
  return this.replace('%data%', value);
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var formatAttr = function(objectName, attrName, attrValue){
  var template = window['HTML' + objectName + attrName];
  return template ? template.replaceData(attrValue) : template;
};

var formatObject = function(object, name) {
  var formattedObject = {};
  for(var key in object) {
    if(object.hasOwnProperty(key)) {
      var formattedValue = formatAttr(name, key.capitalize(), object[key]);
      if(formattedValue) {
        formattedObject[key] = formattedValue;
      }
    }
  }
  return formattedObject;
};

var bio = {
  "name": "Richard Hendriks",
  "role": "Programmer",
  "contacts": {
    "mobile": "(912) 555-4321",
    "email": "richard.hendriks@gmail.com",
    "github": "neutralthoughts",
    "twitter": "neutralthoughts",
    "location": "San Francisco, CA"
  },
  "welcomeMessage": "Hello!",
  "skills": [
    "HTML", "CSS", "Javascript", "File compression"
  ],
  "bioPic": "images/rh.jpg",
  "display": function() {
    var name = HTMLheaderName.replaceData(this.name);
    var role = HTMLheaderRole.replaceData(this.role);
    var welcome = HTMLwelcomeMsg.replaceData(this.welcomeMessage);
    var pic = HTMLbioPic.replaceData(this.bioPic);

    $('#header').prepend([name, role, welcome, pic]);

    var formattedContacts = $.map(this.contacts, function(value, key){
      return formatAttr('contact', 'Generic', value).replace('%contact%', key);
    });
    $('#topContacts').append(formattedContacts);

    if(this.skills.length > 0) {
      $('#header').append(HTMLskillsStart);
      this.skills.forEach(function(skill) {
        $('#skills').append(HTMLskills.replaceData(skill));
      });
    }
  }
};

var education = {
  "schools": [
    {
      "name": "University of Oklahoma",
      "location": "Oklahoma, US",
      "degree": "Bachelors",
      "major": ["Information Technology"],
      "dates": "2011-2014",
      "url": "https://www.ou.edu/"
    }
  ],
  "onlineCourses": [
    {
      "title": "Front End Web Development Nanodegree",
      "school": "Udacity",
      "dates": "2015",
      "url": "https://www.udacity.com/degrees/front-end-web-developer-nanodegree--nd001"
    }
  ],
  display: function() {
    if(this.schools.length > 0) {
      this.schools.forEach(function(school) {

        $('#education').append(HTMLschoolStart);

        var formattedSchool = formatObject(school, 'school');
        formattedSchool.name = formattedSchool.name.replace('#', school.url);

        $('.education-entry:last').append([
          formattedSchool.name + formattedSchool.degree,
          formattedSchool.location,
          formattedSchool.dates,
          formattedSchool.major
        ]);
      });
    }

    if(this.onlineCourses.length > 0) {
      $('#education').append(HTMLonlineClasses);
      this.onlineCourses.forEach(function(course) {

        $('#education').append(HTMLschoolStart);

        var formattedCourse = formatObject(course, 'online');
        formattedCourse.url = HTMLonlineURL.replaceData(course.url);
        formattedCourse.title = formattedCourse.title.replace('#', course.url);

        $('.education-entry:last').append([
          formattedCourse.title + formattedCourse.school,
          formattedCourse.dates,
          formattedCourse.url
        ]);
      });
    }
  }
};

var work = {
  "jobs": [
    {
      "employer": "Pied Piper",
      "title": "CEO/President",
      "location": "San Francisco, CA",
      "dates": "2013-2014",
      "description": "Building an algorithm for artist to detect if their music was violating copy right infringement laws"
    },
    {
      "employer": "Pied Piper",
      "title": "CEO/President",
      "location": "San Francisco, CA",
      "dates": "2013-2014",
      "description": "Building an algorithm for artist to detect if their music was violating copy right infringement laws"
    }
  ],
  display: function() {
    if(this.jobs.length > 0) {
      this.jobs.forEach(function(job) {
        $('#workExperience').append(HTMLworkStart);

        var formattedJob = formatObject(job, 'work');

        $('.work-entry:last').append([
          formattedJob.employer + formattedJob.title,
          formattedJob.location,
          formattedJob.dates,
          formattedJob.description
        ]);
      });
    }
  }
};

var projects = {
  projects: [
    {
      "title": "Video compression for 3d media",
      "dates": "2014",
      "description": "Innovative middle-out compression algorithm that changes the way we store data.",
      "images": [
        "images/dilbert.jpg", "images/encoding-video.png"
      ]
    }
  ],
  display: function() {
    if(this.projects.length > 0) {
      this.projects.forEach(function(project) {
        $('#projects').append(HTMLprojectStart);

        var formattedProject = formatObject(project, 'project');
        var formattedImages = [];
        if(project.images.length > 0) {
          formattedImages = project.images.map(function(img){
            return HTMLprojectImage.replaceData(img);
          });
        }

        $('.project-entry:last').append([
          formattedProject.title,
          formattedProject.dates,
          formattedProject.description
        ]);
        $('.project-entry:last').append(formattedImages);
      });
    }
  }
};

bio.display();
work.display();
education.display();
projects.display();

$('#mapDiv').append(googleMap);
