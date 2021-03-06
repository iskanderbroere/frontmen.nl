import glob from 'glob';
import logger from '../util/logger';
import buildPage from './page';
export const PAGE_FORMATS = 'ejs|html|md';

const log = logger('build:pages');

const build = (options = {}) =>
  Promise.resolve().then(() => {
    log.info('Building pages...');

    const { srcPath, outputPath, site } = options;

    // read pages
    const files = glob.sync(`**/*.@(${PAGE_FORMATS})`, { cwd: `${srcPath}/pages` });
    return Promise.all([...files.map(file => buildPage(file, { srcPath, outputPath, site }))])
      .then(() => {
        log.success(`Building pages done`);
      })
      .catch(error => {
        log.error(`Error trying to build pages`);
        log.error(error);
      });
  });

export default build;
