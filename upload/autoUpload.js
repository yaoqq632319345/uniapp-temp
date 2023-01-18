/* eslint-disable @typescript-eslint/no-var-requires */
const ci = require('miniprogram-ci');
const path = require('path');
const mainfest = require('../src/manifest.json');
const { 'mp-weixin': weixin, versionName } = mainfest;
const appid = weixin.appid;
const isProduction = !!process.env.NODE_ENV;

try {
  console.log(`=================开始上传=================`);
  upload();
} catch (error) {
  console.log(`上传失败!!!!!!!!!!!!!!!!!!!!!!!!`);
}
function upload() {
  const project = new ci.Project({
    appid,
    type: 'miniProgram',
    projectPath: path.resolve(__dirname, '../dist/build/mp-weixin'), //项目路径
    privateKeyPath: path.resolve(__dirname, `./private.${appid}.key`), //小程序后台的上传密匙
    ignores: ['node_modules/**/*']
  });

  ci.upload({
    project,
    robot: isProduction ? 18 : 1,
    version: versionName,
    desc: isProduction ? '接口地址为生产地址' : '接口地址为测试地址',
    setting: weixin.setting
  })
    .then(() => {
      console.log(
        `=================上传成功=================
=======appId:${appid}====版本号:${versionName}`
      );
    })
    .catch((error) => {
      throw error;
    });
}
