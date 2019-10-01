/**
 *  oppDateRoute.js
 *
 *  Receives a get request at path /oppDate
 *
 *  Establishes connection to Salesforce using session cookie containing accessToken
 *
 *  Queries Salesforce for a list of Dates for opportunities in SOPS Control
 *
 *
 */


const jsforce = require('jsforce');
const express = require('express');
const oppDateRoute = express.Router();

// String of Dates requested from Opportunity Object

const oppDates = 'Bid_Due_Date__c, OrderDate__c, Ship_Date__c';

oppDateRoute.route('/').get((req, res) => {
  if (req.session.userId ) {

    const connection = new jsforce.Connection({
      sessionId: req.session.accessToken,
      instanceUrl: req.session.instanceUrl
    });
    connection.query(
      'SELECT Id, ' + oppDates + ', Name, Primary_Quote_Status__c ' +
      'FROM Opportunity WHERE SOPS_Control__c = True ' +
      'AND StageName NOT IN (\'Unqualified\', \'Cray No Bid\', \'Lost\', \'No Budget\', \'No Authority\', \'No Need\', \'Closed - Duplicate\') ' +
      'AND Primary_Quote_Status__c IN (\'Pending\', \'Approved\', \'Revision Pending\',\'Export Pending\', \'Export Complete\') ' +
      'AND Sales_Enablement_User__c = \'' + req.session.userId + '\'  ORDER BY Name',
      (err, result) => {
        if (err)
          return console.error(err);
        else {
          res.json(result.records);
        }

    });
  }
  else
    res.status(400).send('Error: Not Logged in');
});

// Change Date

oppDateRoute.route('/change/:id').post( (req, res) => {
  if (req.session.userId ) {

    const connection = new jsforce.Connection({
      sessionId: req.session.accessToken,
      instanceUrl: req.session.instanceUrl
    });
    connection.sobject('Opportunity').update( {
      Id: req.params.id,
      Bid_Due_Date__c: req.body.Bid_Due_Date__c,
      OrderDate__c: req.body.OrderDate__c,
      Ship_Date__c: req.body.Ship_Date__c,
    }, (err, ret) => {
      if (err || !ret.success) {
        return console.error(err, ret);
      }
      else {
        res.status(200).send('update success');
      }
    });
  }
  else
    res.status(400).send('Error: Not Logged in');
});

module.exports = oppDateRoute;
