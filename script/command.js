const path = require("path");
const { readdirSync } = require("fs");

async function run() {
  global.log("Binding Commands...", "yellow", false);
  let errors = 0;
  let loaded = 0;
  global.cmds = new Map();
  const commandsPath = path.join(__dirname, "commands");
  const files = readdirSync(commandsPath);

  try {
    for (let file of files) {
      if (file.endsWith(".js")) {
        const command = require(path.join(commandsPath, file));
        global.cmds.set(file, command);
        loaded++;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Bonded ${loaded} commands`);
      }
    }
  } catch (err) {
    errors++;
    global.log(`\nCaught ${errors} error(s) while binding commands`, "blue", true);
  } finally {
    await new Promise(res => setTimeout(res, 1500))
    process.stdout.write("\n");
    global.log(`Commands bonded: ${loaded}`, "cyan", false);
    return null;
  }
}

module.exports = run;