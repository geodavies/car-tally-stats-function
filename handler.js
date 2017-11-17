'use strict';

const DynamoDbDao = require('./lib/dynamoDbDao');

module.exports.stats = (event, context, callback) => {
    const totalSpaces = 100;

    const carStatsIn = new Promise(function (resolve, reject) {
        DynamoDbDao.getCarStats('in', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

    const carStatsOut = new Promise(function (resolve, reject) {
        DynamoDbDao.getCarStats('out', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

    Promise.all([
        carStatsIn,
        carStatsOut
    ]).then(values => {
        const availableSpaces = totalSpaces - values[0].Count + values[1].Count;
        callback(null, {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify({
                total: totalSpaces,
                available: availableSpaces
            })
        });
    }).catch(error => {
        console.log(error);
        callback(null, {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify({
                error: error
            })
        });
    });
};
