# Witches Den

Witches Den is a play analyzer for Juho Snellman's online 
[Terra Mystica implementation](http://terra.snellman.net). As I play more, I've 
been studying my play to figure out how and where I can improve. I started 
building this site to figure out how to improve. My original questions were along 
the line os:

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
[angular seed project](http://github.com/angular/angular-seed), to which I then 
added Express. 

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


## Domain Specific Languages

I have always been facinated by Domain Specific Languages (DSLs), and have always
wanted to use them in a project. Juho's use of a DSL to be his command language
to power the game is awesome, and a really strong aspect of his site, in my 
opinion.

When building out this site, I looked through the information that Juho already
provides, but I quickly realized that I was looking for a level of detail much
more nuanced than he was providing. Since Juho uses a command langauge to 
fully describe the game state, I was very confident that I could write my own
grammar to parse his language and pull out the data I needed. 

I built my language using [PegJS](http://www.pegjs.org), which was perfect for the 
job. PegJS's online sandbox was perfect for figuring out what I needed and how. I 
give it 2 big thumbs up. To simplify matters further, I opted not to implement
any validation on Juho's log -- i.e. if it's in Juho's log, I assume its a valid 
move and parse it accordingly. I figure that if there is an issue here, Juho has
far more cause to fix it than I would, and I can leverage his efforts. 

There are probably two drawbacks to my approach. First, it requires a bit of 
duplicated effort for me to write my own grammar. Since I wanted to do this anyway,
this wasn't a huge cost in my eyes. Secondly, there may come a time wen Juho 
changes his log -- this will definitely break my site. Short term, I intend to 
cache a lot more of my data, which should help mitigate this in the short term. 
Longer term, I don't currently see a great solution, other than deal with it -- 
I'm interested if anyone has a better idea. 


