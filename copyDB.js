function writeCatToDB () {
    const DB = [...jsonDB.job];
    var newData = DB.map (data=> {
        delete data.links;
        data.description = data.desc
        delete data.desc;
        console.log (data)
        return  {
            insertOne: { document: data }
        }
    })

    console.log (newData);
    categories.bulkWrite(newData)
    .then(res => {
        console.log(res);
    });
}

writeCatToDB();
