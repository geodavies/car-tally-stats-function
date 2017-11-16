'use strict';

const DynamoDbDao = require('./lib/dynamoDbDao');

module.exports.stats = (event, context, callback) => {
    //const bodyObject = JSON.parse(event.body);
    var totalSpaces = 100;
    var carsIn = 0;
    var carsOut = 0;
    console.log('getting stats for ');
    DynamoDbDao.getCarStats('in', function (err, dataCarsIn) {
        if (err) {
            console.log('Error getting data for cars in:', err);

            callback(null, {
                statusCode: 400,
                body: JSON.stringify({
                    error: err
                })
            });

        } else {
            console.log('Successfully call cars in data');

            carsIn = dataCarsIn.Items.length;

            DynamoDbDao.getCarStats('out', function (err, dataCarsOut) {
                if (err) {


                    callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({
                            error: err
                        })
                    });
                } else {


                    carsOut = dataCarsOut.Items.length;

                    console.log('totalSpaces ' + totalSpaces);
                    console.log('carsIn ' + carsIn);
                    console.log('carsOut ' + carsOut);

                    var availableSpaces = totalSpaces - carsIn + carsOut;
                    callback(null, {
                        statusCode: 200,
                        body: JSON.stringify({
                            count: availableSpaces
                        })
                    });
                }
            });
        }
    });
};
