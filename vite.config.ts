/// <reference types="./env" />
import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import fs from 'fs';

/**
 * 读取 manifest.json ，修改后重新写入
 * @param {string} path
 * @param {(string | boolean)} value
 */
function replaceManifest(path: string, value: string | boolean) {
  const manifestPath = './src/manifest.json';
  let Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' });
  const arr = path.split('.');
  const len = arr.length;
  const lastItem = arr[len - 1];

  let i = 0;
  const ManifestArr = Manifest.split(/\n/);

  for (let index = 0; index < ManifestArr.length; index++) {
    const item = ManifestArr[index];
    if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
    if (i === len) {
      const hasComma = /,/.test(item);
      ManifestArr[index] = item.replace(
        new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
        `"${lastItem}": ${value}${hasComma ? ',' : ''}`
      );
      break;
    }
  }

  Manifest = ManifestArr.join('\n');
}
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv;
  replaceManifest('mp-weixin.appid', env.VITE_APPID);

  return defineConfig({
    plugins: [uni()]
  });
};
