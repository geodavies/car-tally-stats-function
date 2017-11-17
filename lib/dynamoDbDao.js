'use strict';

const AWS = require('aws-sdk');
const dateFormat = require('dateformat');

class DynamoDbDao {

    static getCarStats(eventType, callback) {
        const d3 = dateFormat(new Date(), "isoDate");
        const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
        const params = {
            ExpressionAttributeValues: {
                ':v': {S: 'Van'},
                ':c': {S: 'Car'},
                ':d1': {S: d3 + ' 00:00:00'},
                ':d2': {S: d3 + ' 23:59:59'},
                ':e': {S: eventType}
            },
            FilterExpression: 'vehicleType in (:c, :v) and dateAdded >= :d1 and dateAdded <= :d2 and eventType = :e',
            TableName: 'CarTallyEvents'
        };

        ddb.scan(params, callback);
    }

}

module.exports = DynamoDbDao;
