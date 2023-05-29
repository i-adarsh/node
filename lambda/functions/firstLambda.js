'use strict';
const fs = require('fs');
const papa = require('papaparse');

module.exports.handler = async (event) => {
    const stage = process.env.stage;
    const file = fs.createReadStream(`sample-${stage}.csv`);
    const jsonData = await toJson(file);
    return jsonData;

};

const toJson = ( file ) => {
    return new Promise(( resolve, reject) => {
        papa.parse(file, {
            header: true,
            complete ( results ) {
                resolve({ data: results.data })
            },
            error ( err ){
                reject ( err )
            }
        })
    })
}