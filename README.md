# Witches Den

Witches Den is a play analyzer for Juho Snellman's online 
[Terra Mystica implementation](terra.snellman.net). As I play more, I've been 
studying my play to figure out how and where I can improve. I started building this 
site to figure out how to improve. My original questions were along the line os:

- How many points am I spending on leech? How many points do good players spend?
- How many points is fav11 really worth? Was there a better option?
- Am I using the pass bonus tiles well for gaining points?

As I see this project involving, I'm hoping to provide tools and analysis to help
everyone improve their Terra Mystica play. 

# Project Goals

I have 3 main goals for this project:

1. Learn some new progarmming technologies
2. Apply machine learning and data analysis to a real-life project
3. Get better at Terra Mystica

I keep a Trello Board with my current and future goals 


# Technologies used

I'm using a wide range of technologies on this project, and hoping to get better
at all of them. They include:

- MEAN Stack
- Assorted Web libraries 
- Git / GitHub
- Azure 
- Domain Specific Languages


## Mean Stack

The site is built on the MEAN stack (Mongo, Express, Angular, and Node), and is my
first foray into this stack. It was originally a fork of the
[angular seed project](github.com/angular/angular-seed), to which I then added 
Express. 

The one caveat to this is that instead of using Mongo, I'll be using DocumentDb, 
which is Azure's schemaless NoSql implementation. 

I'm not currently doing much on the testing front, but I'm planning to change that
moving forward. 

## Assorted Web Libraries

So far, I'm currently leveraging the following libraries for the site:

- Bootstrap
- Underscore
- d3 (graphing)

I'm sure I'll be adding more as a delve deeper into the databasing, user/identity
management, and UI/UX. 


## Git / GitHub

While Git and GitHub have become quite popular in the open source world, most of 
my experience was focused on TFS, so I wanted to learn them on this project. 

My current branch strategy is patterned off of 
[this great article](http://nvie.com/posts/a-successful-git-branching-model/)

My current versioning is based off of 
[this article](http://cd34.com/blog/programming/using-git-to-generate-an-automatic-version-number/)


## Azure - Leveraing PaaS

I've been exposed to Azure's PaaS offerings through my work as a consultant, and I 
wanted to try it out on a personal project to see how I liked it. Moreover, I had
heard that Azure was opening up to non-Microsoft technologies and the open source
world, and I wanted to see how true that was. 

I'm honestly blown away with how mature Azure currently is. This entire project
doesn't have a single line of Microsoft code and is hosted and GitHub. With a few
simple mouse clicks I had Continuous Deployment up and running. 

My goal is to only leverage Azure's PaaS offerings for this project. That will
probably include a combination of:

- Websites
- DocumentDb
- Web Jobs


##

