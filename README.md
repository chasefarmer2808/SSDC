# SSDC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2.

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

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
