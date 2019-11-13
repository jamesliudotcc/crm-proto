# CRM Front-End-Only Prototype

This is the first prototype of a lightweight customer relations management app. I am interested in targeting recent coding bootcamp grads who need to keep track of contacts in their job search. In addition, my wife says that lawyers need such a thing as well.

Eventually, this project will have a backend and will be mostly a mobile-app. It will probably require React Native (although I can be convinced otherwise), GraphQL (Don't try to convince me otherwise), and a database. Give me guidance whether I should use MongoDB, FaunaDB, or PostgreSQL.

I also want to create a coach view where an overview of mutliple jobseekers can be seen at once. Also, perhaps an admin view for user management.

For now, the back end is mocked out using Vuex.

Todo user stories:

A view for upcoming followups. Call this an agenda.
It is possible for followups to be owed.
In the agenda view, there is a checkbox for mark complete. When clicked, it opens up further to create a followup. If there is at least one followup in the future, then it is possible to mark no new followup. Otherwise, it is required to create a followup (e.g. email) to mark completed.
Exception. After 2 (3?) emails in a row, it is possible to mark a contact dead.
Possible to fake "today" for the purpose of the app for demoing.
A view per relationship.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
