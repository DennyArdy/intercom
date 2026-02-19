import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const events = {};

function banner() {
  console.clear();
  console.log("\x1b[33m");
  console.log("═══════════════════════════════");
  console.log("        SENTINEL MONITOR");
  console.log("═══════════════════════════════");
  console.log("\x1b[0m");
  console.log("CLI Event Watcher\n");
}

function menu() {
  console.log("Commands:");
  console.log("register");
  console.log("update");
  console.log("inspect");
  console.log("history");
  console.log("exit\n");

  rl.question("sentinel> ", handle);
}

function handle(cmd) {
  switch (cmd.trim()) {

    case "register":
      rl.question("Event ID: ", (id) => {
        events[id] = { status: "NEW", log: ["Registered"] };
        console.log("\n✓ Event created\n");
        menu();
      });
      break;

    case "update":
      rl.question("Event ID: ", (id) => {
        if (!events[id]) {
          console.log("\nEvent not found\n");
          return menu();
        }
        rl.question("Status: ", (status) => {
          events[id].status = status;
          events[id].log.push(`Updated → ${status}`);
          console.log("\n✓ Status updated\n");
          menu();
        });
      });
      break;

    case "inspect":
      rl.question("Event ID: ", (id) => {
        if (!events[id]) {
          console.log("\nEvent not found\n");
        } else {
          console.log("\n", events[id], "\n");
        }
        menu();
      });
      break;

    case "history":
      console.log("\nAll Events:");
      console.log(events, "\n");
      menu();
      break;

    case "exit":
      console.log("\nSentinel shutting down...");
      rl.close();
      break;

    default:
      console.log("\nUnknown command\n");
      menu();
  }
}

banner();
menu();
