// file
import { lsdir, rm } from 'qiao-file';

/**
 * clear html
 */
export default async () => {
  //
  console.log();
  // files
  const serverFiles = await lsdir(process.cwd());
  if (!serverFiles || !serverFiles.files || !serverFiles.files.length) return;

  // init
  serverFiles.files.forEach(async (serverFile) => {
    const file = serverFile.path;

    if (/\.html\.html$/.test(file)) {
      console.log(`clear html: ${file}`);
      await rm(file);
    }
  });
};
