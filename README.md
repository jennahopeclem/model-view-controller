# Tech Blog

## Description

This CMS-styled blog site was created as a space for developers to write blog posts about tech as well as interact with other user's blogpost by writing comments beneath posts.

Using the MVC paradaigm allowed the developer (me) to create functionality within the controllers, send them through to their models, and have the user see the outcome from through the views, or handlesbars.

## User Story 
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions

## Installation

In order to follow the MVC criterian, the express-handlebars package was installed and implemented Handlebars.js so that users would have an interactive blog to use. Also implemented is the MySQL2 and Sequelize packages that connects a user to the MySQL database. This is where our models come in handy, tranlsating and producing data in the database.

The dotenv and bcrypt packages were implemented as well in order to environment variables and hash passwords. Express-session (session data) and connection-session-sequelize packages are used to add authentication. 

## Usage   
As a user, you will enter the site and be prompted with a message "Leave a blog post!". If this is a user's first time entering the site, they should then click the sign-up button, as interacting with the rendered blog posts will result in an alert letting the user know they cannot interact with it.

Once signed up, the user will be logged in and have the ability to create a blog post, leave comments, and delete their owned blog posts and comments.

![demo] (/Users/jennah.clementi/Desktop/Homework/tech-blog/public/Tech Blog.gif) 