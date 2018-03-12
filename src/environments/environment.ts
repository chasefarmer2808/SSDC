// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let localUrl = 'http://localhost';
let serverPort = 5000;
let localPort = 4200;

export const environment = {
  production: false,
  envName: 'dev',
  assetsUrl: `${localUrl}:${localPort}/assets`,
  facebookUrl: `${localUrl}:${serverPort}/api/v1/fb/`,
  emailUrl: `${localUrl}:${serverPort}/api/v1/email/`,
  listservUrl: `${localUrl}:${serverPort}/api/v1/email/listserv/`,
  teamsUrl: `${localUrl}:${serverPort}/api/v1/teams/`,
  officersUrl: `${localUrl}:${serverPort}/api/v1/officers/`,
  authUrl: `${localUrl}:${serverPort}/api/v1/auth`,  // keep off trailing slash
  emailAddress: 'ufssdc@gmail.com',
  facebookLink: 'https://www.facebook.com/groups/ufssdc/',
  office: 'NEB 225'
};
