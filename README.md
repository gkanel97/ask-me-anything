## About
**ask**me**anything** is a Q&A application which can be deployed in the form of Software-as-a-Service (SaaS). The application may be used by as a forum, by help-desk providers or by corporations wishing to organize their internal procedures. The current project presents two different software design patterns for the backend part of the application:

- Model-View-Controller (MVC)
- Microservices controlled by a choreographer
<p>The applications requires users to sign up. Unregistered can access only the home page and browse the 10 most recent questions. Registered users have access to the following functionalities:</p>

- Create a new question
- Tag a question with keywords
- Answer a question
- Browse questions and answers
- Question statistics based on keywords
- Question statistics based on dates
- Sign up, sign in

## Implementation stack

<p>The application has been developed using the PERN stack (PostgreSQL, Express, React, Node.js). JavaScript has been used both on the backend and the frontend part of the application. The NestJS framework was used for the backend, while the frontend was implemented using React and some Bootstrap. The application data is stored in Postgres databases.</p>
<p>Following development, the application was deployed on Heroku, a Platform-as-a-Service provider and can be accessed on the following link: https://ask-me-anything-saas.herokuapp.com</p>
