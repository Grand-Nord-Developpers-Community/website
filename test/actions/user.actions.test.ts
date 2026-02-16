import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { getUsersListByRank } from "../../actions/user.actions";


async function main() {
  console.log("Testing getUsersListByRank...");
  
  try {
    const users = await getUsersListByRank(0, 5);
    const seenIds = new Set();
    console.log(users)
    const duplicates:any[] = [];

    users?.forEach((item) => {
      // Check if the id has already been added to the Set
      if (seenIds.has(item?.username)) {
        duplicates.push(item);
      } else {
        seenIds.add(item.username);
      }
    });

    console.log("duplication found : ")

    console.log(duplicates);

  } catch (error) {
    console.error("Test failed with error:", error);
  }
}

main();
