import { AppConstants } from "./common/CommonConstants";
import { Helper } from "./common/helper";
import { Engine } from "./engine";

const importer = new Engine();

// init().then(()=>{
//     importer.DoWork();
// });

init().then(() => {
  importer.Start().then((_res) => { });
});

async function init() {
  try {

    await Helper.CreateDir(AppConstants.APP_FILES);
    Helper.Log(`Daemon: ${AppConstants.APP_NAME} started `);
  } catch (error) {
    Helper.LogError(`The server started but got an error trying to write to a file: ${error.message}`);
  }
}
