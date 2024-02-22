// file
import { lsdir, rm } from 'qiao-file';

// logger
import Debug from 'debug';
const debug = Debug('qiao-z');
const methodName = 'clearHtml';

/**
 * clear html
 */
export default async () => {
  // files
  const serverFiles = await lsdir(process.cwd());
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach(async (serverFile) => {
    const file = serverFile.path;

    if (/\.html\.html$/.test(file)) {
      debug(methodName, 'file', file);
      await rm(file);
      debug(methodName, 'rm success');
    }
  });
};
