/*
// const fs = require('fs');
// const path = require('path');
// const execa = require('execa');
// const semver = require('semver');
// const { yParser, chalk } = require('@umijs/utils');
*/
// import { join } from 'path';
import path from "path";
import chalk from "chalk";
import semver from 'semver';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
// const lernaCli = require.resolve('lerna/cli');
// console.log('lernaCli: ', lernaCli);

function printErrorAndExit(message) {
  console.error(chalk.blue(message));
  console.log("\x1b[31m This text will be red \x1b[0m");
  console.log('this is log');
  // process.exit(1);
}

printErrorAndExit('直接 node bash-node.mjs 执行此文件、会显示颜色');
printErrorAndExit('被 bash 直接调用、会显示颜色');
printErrorAndExit('被 bash 这样 $(node bash-node.mjs) 调用、不会显示颜色');

const asyncExec = () => {
  // 注意，不支持 await child_process.exec
  return new Promise((resolve, reject) => {
    child_process.exec(
      // `git name-rev --name-only HEAD`,
      'git log --pretty=format:"%h - %an - %s" -n 5',
      { encoding: 'utf-8' },
      (error, stdout, stderr) => {
        console.log('exec stdout: ', error, stdout, stderr);
        error ? reject(error) : resolve(stdout)
      }
    );
  });
};
const asyncSpawn = () => {
  // 如果输出量非常大，exec 的缓冲区可能会溢出。在这种情况下，child_process.spawn 更适合处理大文件或长输出。
  return new Promise((resolve, reject) => {
    const child = child_process.spawn(
      // 使用字符串会报错
      // 'git log --pretty=format:"%h - %an - %s" -n 5',
      // 出错提示 Your git status is not clean. Aborting.
      // 'git', ['status', '--porcelain'],
      'git', ['log', '--pretty=format:"%h - %an - %s"'],
      { encoding: 'utf-8' },
    );
    // console.log('child: ', child);
    child.stdout.on('data', (data) => {
      console.log('data: ', data.toString());
      resolve();
      // 处理标准输出并将其转换为字符串
      // process.stdout.write(data.toString());
    });
    child.once('error', (err) => {
      console.log('err: ', err);
      reject(err);
    });
    // child.on('close', (code) => {
    child.once('close', (code) => {
      console.log('close: ', code);
    });
  });
};

await test();
async function test() {
  // https://github.com/npm/node-semver

  const testVersions = [
    '0.9.9', '0.9.10',
    '0.9.9-beta', '0.9.9-beta.1',
    '0.9.9-alpha.2', '0.9.9-alpha.3',
    '0.9.9-rc'
  ];
  console.log(
    'filter versions',
    testVersions.filter(v => semver.gte(v, '0.9.0-beta')),
    testVersions.filter(v => semver.satisfies(v, '>=0.9')),
    testVersions.filter(v => semver.satisfies(v, '>=0.9.0-beta')),
  );
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

  // __dirname is not defined in ES module scope
  // const pkgFile = path.join(__dirname, './packages');
  // console.log('pkgFile: ', pkgFile);
  const cwd = process.cwd();
  const pkgPath = path.join(cwd, 'packages', 'pkg');
  console.log('pkgPath: ', pkgPath);

  process.exit(1);
  await asyncExec();
  await asyncSpawn();

  // console.log('pkgJson: ', pkgJson.name, pkgJson.version);
  // git tag -a @afe/pro-layout@0.1.5 -m 'Release version @afe/pro-layout@0.1.5'
  // await exec('git', [
  //   'tag', '-a', `${pkgJson.name}@${pkgJson.version}`,
  //   '-m', `${pkgJson.name}@${pkgJson.version}`,
  // ]);

  // await exec('npm', ['run', 'prettier']);
  // execa.sync('npm', ['version', 'prerelease', '--preid', 'rc', '--no-git-tag-version']);
  // execa.sync('cd', ['../../']);


  // "@lerna-lite/changed": "^3.8.0",
  // "@lerna-lite/cli": "^3.8.0",
  // "@lerna-lite/publish": "^3.8.0",

  // todo 引用不到 lerna-lite 包？
  // const lernaChanged = await import('@lerna-lite/changed');

  const lernaLiteVersion = async () => {
    // "preview": "lerna changed --dry-run",
    try {
      const { stdout, stderr } = execa.sync('npm', ['run', 'preview']);
      console.log('preview stdout: ', stdout);
    } catch(error) {
      console.error(`发布失败: ${error}`);
    }
  }
  // lernaLiteVersion();
}
