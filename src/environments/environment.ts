// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let serverUrl = 'http://localhost';
let serverPort = 5000;

export const environment = {
  production: false,
  envName: 'dev',
  facebookUrl: `${serverUrl}:${serverPort}/api/v1/fb/`,
  emailUrl: `${serverUrl}:${serverPort}/api/v1/email/`,
  listservUrl: `${serverUrl}:${serverPort}/api/v1/email/listserv/`,
  emailAddress: 'ufssdc@gmail.com',
  facebookLink: 'https://www.facebook.com/groups/ufssdc/',
  office: 'NEB 225'
};
