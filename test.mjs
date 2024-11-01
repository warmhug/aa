/*
const os = require('os');
const fs = require('fs');
const path = require('path');
const semver = require('semver');
*/
// import { join } from 'path';
import path from 'path';
import semver from 'semver';

// __dirname is not defined in ES module scope
// const pkgFile = path.join(__dirname, './packages');
// console.log('pkgFile: ', pkgFile);
const cwd = process.cwd();
const pkgPath = path.join(cwd, 'packages', 'pkg');
console.log('pkgPath: ', pkgPath);
console.log('resolve: ', path.resolve(__dirname, './package.json'));

await test();
async function test() {
  // https://github.com/npm/node-semver

  const testVersions = [
    // '0.9.8', '0.9.9', '0.9.10',
    // '0.9.10-beta',
    '0.9.0-beta', '0.9.0-beta.1',
    // '0.9.9-beta', '0.9.9-beta.1',
    // '0.9.9-alpha.2', '0.9.9-alpha.3',
    // '0.9.9-rc'
  ];
  console.log(
    'filter versions',
    testVersions.filter(v => semver.gte(v, '0.9.0-beta')),
    testVersions.filter(v => semver.satisfies(v, '>=0.9')),
    testVersions.filter(v => semver.satisfies(v, '>=0.9.0-beta')),
  );

  const gtMinors = testVersions.filter(v => semver.gte(v, '0.9.0-beta.4') && v.startsWith('0.9'));
  console.log('gtMinors: ', gtMinors);
  console.log('semver.maxSatisfying: ', semver.maxSatisfying(testVersions, '0.9.*'));
  console.log('semver.maxSatisfying: ', semver.maxSatisfying(testVersions, '0.9.*', { includePrerelease: true }));
  console.log('semver.maxSatisfying: ', semver.maxSatisfying(testVersions, '0.10.*'));
  console.log('semver.maxSatisfying: ', semver.maxSatisfying(testVersions, '0.10.*', { includePrerelease: true }));

  console.log('sort: ', semver.sort(testVersions));

  console.log('prerelease: ', semver.prerelease('1.2.3'));
  console.log('prerelease: ', semver.prerelease('1.2.3-beta.1'));

  console.log('major: ', semver.inc('1.2.3-beta.1', 'major'));
  console.log('minor: ', semver.inc('1.2.3-beta.1', 'minor'));
  console.log('patch: ', semver.inc('1.2.3-beta.1', 'patch'));
  console.log('premajor: ', semver.inc('1.2.3-beta.1', 'premajor'));
  console.log('preminor: ', semver.inc('1.2.3-beta.1', 'preminor'));
  console.log('prepatch: ', semver.inc('1.2.3-beta.1', 'prepatch'));
  console.log('prerelease', semver.inc('1.2.3', 'prerelease', 'beta'));
  console.log('prerelease beta: ', semver.inc('1.2.3-beta', 'prerelease', 'beta'));
  console.log('prerelease alpha: ', semver.inc('1.2.3-beta', 'prerelease', 'alpha'));
  console.log('prerelease beta0: ', semver.inc('1.2.3-beta.0', 'prerelease', 'beta'));
  console.log('prerelease alpha: ', semver.inc('1.2.3-beta.0', 'prerelease', 'alpha'));
  console.log('major: ', semver.major('1.2.3-beta.0'));
  console.log('minor: ', semver.minor('1.2.3-beta.0'));
  console.log('semver.valid', semver.valid('1.2.3-beta.20+aseds'));
  console.log('semver.parse build: ', semver.parse('1.2.3-beta.20+aseds'));
  console.log('semver.parse build: ', semver.parse('1.2.3+afebuild'));
  console.log('semver.parse build inc: ', semver.inc('1.2.3+afebuild', 'patch'));
  console.log('semver.parse build inc: ', semver.inc('1.2.3-beta+afebuild', 'patch'));
  console.log('semver.parse canary build inc: ', semver.inc('1.2.3-canary.20240924.1', 'patch'));

}
