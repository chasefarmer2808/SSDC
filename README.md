# SSDC [![Build Status](https://travis-ci.org/chasefarmer2808/SSDC.svg?branch=master)]

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2, and is being served [here](http://ssdc-website.herokuapp.com/).

## Environment Setup

You will need `Node` and `NPM` to run this application.  Head over to the official [site](https://nodejs.org/en/) to download the latest version
for your Operating System.  Follow default install instructions.  This will also install `NPM`.  On Windows, make sure to check the box that adds
the install path to your environment variables.

Once installation completes, verify the install by opening a terminal and running `node -v` and `npm -v`.  You should get a version number.  If
you get something like `command not found`, either the install was unsuccessful, or your machine does not know where `Node` is installed on your
machine.  Troubleshoot this by restarting your computer, or making an environment variable that points to the install directory.

When you have verified the installation, you must now install all of the dependencies listed in the `package.json` file located in the root of
this project.  To do this, open a terminal and navigate to the root of this project.  Run `npm install` and wait for everything to be downloaded
and installed.  If this works, you should see a new directory called `node_modules`.  You are now ready to run the front end of this application.

Next is installing the Angular CLI.  To do this, simply run `npm install -g @angular/cli` in any directory.

Next is grabbing all of the config variables from Heroku that our app needs to make API calls to external services such as Facebook or Gmail.  To do this,
you must first install the Heroku CLI.  Do this by running `npm install -g heroku-cli` in any directory.  Next, use the `heroku login` command to login to
the heroku account that holds this app.  You will need an email and password.  Grab them from a project admin.  Next, you need to point your heroku instance
to the remote heroku app.  Do this by running `heroku git:remote -a ssdc-website`.  Next, make a file in the root directory of this project named `.env`.  Make sure
this file does not have any extentions, or heroku will not recognize it.  You are now ready to pull the config vars from heroku.  To do this, run
`heroku config:git CONFIG_VAR_NAME -s >> .env`.  A list of the config vars can by found by logging into the heroku account with the same credentials used in the
`heroku login` command.  Click on the `ssdc-website` app.  Click the settings tab.  Then click `Reveal config vars`.  This information is sensative and confidential.
Make sure it remains a secret, and the values are not altered unless approved by an admin.  Also note to never commit the `.env` file to any kind of version
control system.  It too holds all of this information, and should only remain on a developer's hard drive.  With all config vars pulled, you are now
ready to run the backend of the app.  To do this, simply run `heroku local`.  This will spin up the Node server, enabling REST API calls to be made.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` from a browser. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running the backend NodeJS server

In another terminal, run `heroku local` to spin up Node in a dev environment.  Without the backend
running, the Angular application will not be able to communicate to the REST API.

## Config Variables

The backend uses config vars for secret information such as API keys.  These vars are not in source control.  You must get them from your system administrator.  They are not necessary for view development.

## Running unit tests

Running tests locally will require importing the secret config vars without hard-coding them into the source code.  In order to do this, we need the help of
Foreman.  Foreman is a manager for apps such as ours that run off a Procfile.  It can be installed through npm by running `npm install -g foreman`.  Once this
is done, you will be ready to run all tests.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).  This will run all of the unit tests in the front end that are in a
`*.spec.ts` file.  PRO-TIP: Have the browser dev tools open to the browser console when the tests are running to make sure there are no errors.  This can 
happen even if all the tests pass, and will break the build in Travis.

## Running integration tests

Currently, the only integration tests are for the backend server.  They are located in the test folder.  To run them, execute the command 
`nf run npm run test:int`.  The `nf` stands for Node Foreman.  NOTE: An internet connection is necessary to run these tests, as they make
HTTP requests.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Build and Deployment

### Travis CI

This application is currently using the Travis-CI for automated builds and deploys.  In order to make an actual deploy, a push needs to be 
made to the master branch.  This will automatically trigger a build in Travis.  The build clones the master branch of this repo, does an 
`npm install`, builds the entire app, runs unit and integration tests, and deploys to heroku.  If the build passes, the live site should
be updated with the changes.  The integration tests and actual deployment only happen on a push to the master branch.  Builds are kicked
off on pushes to ALL branches, but only compilation and unit tests are run.

### Heroku

This application is currently being hosted by Heroku.  When a feature is ready to be pushed to the live site, you must do the following.  First, 
make sure to rebase your code onto the `develop` branch of the repo.  Do this by checking out the branch with `git checkout develop`, and then 
`git rebase FEATURE_BRANCH_NAME`.  Your commits are now played on top of the develop branch.  Push them with `git push`.  Make sure the rebase was
successful by running the app and all automated tests.  You should have no merge conflicts or failed tests.  The develop branch acts as a staging
area for a new feature.  When everything on develop is error and bug free, it can then be rebased to the `master` branch.  Do this by following
the same steps as before; `git checkout master`, and then `git rebase develop`, and finally push the commits with `git push`.  Your code is still 
not on the live site yet.  To finally do this, make sure you are on the master branch, and run `git push heroku master`.  This will take some time,
and you will see some output in the terminal, but that just means heroku is rebuilding and republishing the application!  If it is successful, you
should be able to see your changes on the live site.  If things failed, or not behaving as expected, run `heroku logs --tail` to see logs from the
heroku machine. 

## Maintenance

### Facebook Access Token

The backend of this application currently depends on the Facebook Graph API to get things such as events and photos for the Gallery view.  The information
is taken from the SSDC Facebook group.  In orderto get access to the group, an access token needs to be provided to the url of the request.
Right now, the token is stored locally on the server's machine, and developers' machines, and appended to the request url in the via a 
template string.  This token has a lifetime of 60 days, and must be manually refreshed when it expires.  Follow the following steps to
get a fresh token:

1. Head over to the [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/).
2. Make sure you are logged into your facebook account, and select the SSDC application from the Application dropdown in the upper right corner.
3. In the dashboard for the ssdc Facebook app, you should see fields for the `app id` and `app secret`.  Have the dashboard up in a tab, as you
will need these values later.
4. In the url input field (the one next to the blue submit button), clear the contents after the version number.
5. Replace it with the following string: `oauth/access_token?client_id=APP_ID&client_secret=APP_SECRET&grant_type=fb_exchange_token&fb_exchange_token=CURRENT_ACCESS_TOKEN`.
6. Fill in the `APP_ID` with the app id, `APP_SECRET` with the app secret, and `CURRENT_ACCESS_TOKEN` with the expired api token.
7. Click submit and you should get a JSON object back that holds the fresh token.  Plug this into the Heroku config variables.
8. At this point, the live site should be talking to Facebook properly.  Getting the fresh api token locally in your `.env` file
is as easy as running `heroku config:get CONFIG_VAR_NAME`.

The corresponding config var on
Heroku must then be updated with the fresh token in order for the production server to read the token.  When Heroku is up to date, 
developers that are logged onto the Heroku app can pull the fresh token by running `heroku config:get CONFIG_VAR_NAME`.  Refer to 
this [link](https://devcenter.heroku.com/articles/config-vars) for more help and details.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Refs and Docs

[Angular CLI](https://cli.angular.io/)
[Angular 4](https://angular.io/docs)
[ExpressJS](https://expressjs.com/)
[Facebook Graph API](https://developers.facebook.com/docs/graph-api/)
[KarmaJS](https://karma-runner.github.io/1.0/index.html)
[JasmineJS](https://jasmine.github.io/)
[Heroku](https://www.heroku.com/)
[Angular Material](https://material.angular.io/)
[Nodemailer](https://nodemailer.com/about/)
