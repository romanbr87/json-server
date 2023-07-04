import categories from "./models/categories.model";
import { Kishurit } from "./types";
function writeCatToDB(jsonDB: Kishurit) {
  console.log ("12222222222222222222222222222222");  
  
  const DB: Array<Object> = [...jsonDB.job];
    var newData = DB.map((data: any) => {
      delete data.links;
      data.description = data.desc;
      delete data.desc;
      console.log(data);
      return {
        insertOne: { document: data },
      };
    });
  
    console.log(newData);
    categories
      .bulkWrite(newData)
      .then((res: any) => {
        console.log(res);
        console.log ("12")
    })
    .catch (err => console.error (err));
  }
  
  export default writeCatToDB