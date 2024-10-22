/*const express = require('express');
const app = express();
module.exports = cds.service.impl(async function () {
    const productapi = await cds.connect.to('CE_PURCHASEORDER_0001');
   
      this.on('READ','PurchaseOrder', async req => {
        try {
            // Fetch Purchase Orders with selected fields
            const purchaseOrders = await productapi.run(
                SELECT.from('PurchaseOrder').where({ PurchaseOrder: '3100000016' }).columns(
                    'PurchaseOrder',
                    'PurchaseOrderType',
                    'PurchaseOrderSubtype',
                    'PurchasingDocumentOrigin',
                    'PurchasingDocumentProcessCode',
                    'CreatedByUser',
                    'CreationDate'
                )
            );

            // Initialize an empty array to store combined results
            let combinedResult = [];

            // Loop through each purchase order to fetch corresponding items and related data
            for (let order of purchaseOrders) {
                // Fetch corresponding Purchase Order Items for each PurchaseOrder
                const purchaseOrderItems = await productapi.run(
                    SELECT.from('PurchaseOrderItem').where({ PurchaseOrder: order.PurchaseOrder }).columns(
                        'PurchaseOrder',
                        'PurchaseOrderItem',
                        'PurchaseOrderCategory',
                        'DocumentCurrency',
                        'PurchasingDocumentDeletionCode',
                        'MaterialGroup'
                    )
                );

                // For each PurchaseOrderItem, fetch nested pricing elements and schedule lines
                for (let item of purchaseOrderItems) {
                    // Fetch PurOrderItemPricingElement for each PurchaseOrderItem
                    const pricingElements = await productapi.run(
                        SELECT.from('PurOrderItemPricingElement')
                            .where({
                                PurchaseOrder: item.PurchaseOrder,
                                PurchaseOrderItem: item.PurchaseOrderItem
                            })
                            .columns(
                                'PurchaseOrder',
                                'PurchaseOrderItem',
                                'PricingDocumentItem',
                                'PricingProcedureStep'
                            )
                    );
                    

                    // Fetch PurchaseOrderScheduleLine for each PurchaseOrderItem
                    const scheduleLines = await productapi.run(
                        SELECT.from('PurchaseOrderScheduleLine').where({ PurchaseOrderItem: item.PurchaseOrderItem ,PurchaseOrder:item.PurchaseOrder}).columns(
                            'PurchaseOrder',
                            'PurchaseOrderItem',
                            'ScheduleLine',
                            'ScheduleLineDeliveryDate',
                            'SchedLineStscDeliveryDate',
                            'PerformancePeriodStartDate',
                            'PerformancePeriodEndDate',
                            'ScheduleLineDeliveryTime'
                        )
                    );

                    // Attach nested data to PurchaseOrderItem
                    item.PurOrderItemPricingElement = pricingElements;
                    item.PurchaseOrderScheduleLine = scheduleLines;
                }

                // Fetch PurchaseOrderNote for each PurchaseOrder
                const purchaseOrderNotes = await productapi.run(
                    SELECT.from('PurchaseOrderNote').where({ PurchaseOrder: order.PurchaseOrder }).columns(
                        'PurchaseOrder',
                        'TextObjectType',
                        'Language',
                        'PlainLongText'
                    )
                );

                // Combine PurchaseOrder and related PurchaseOrderItems, including notes
                combinedResult.push({
                    ...order, // All fields from PurchaseOrder
                    PurchaseOrderItems: purchaseOrderItems, // Add the related PurchaseOrderItems with nested PurOrderItemPricingElement and PurchaseOrderScheduleLine
                    PurchaseOrderNotes: purchaseOrderNotes // Add PurchaseOrderNotes
                });
            }

            // Return the combined result
            return combinedResult;

        } catch (err) {
            console.error(err);
            return req.error(500, 'Error retrieving Purchase Orders and related data');
        }

      
});
  */

// Start the Express server

  /*
  this.on('READ','PurchaseOrderItem', async req => {
    
   
    req.query.SELECT.columns = [{ref:['PurchaseOrder']},{ref:['PurchaseOrderItem']},{ref:['PurchaseOrderCategory']},{ref:['DocumentCurrency']},{ref:['PurchasingDocumentDeletionCode']},{ref:['MaterialGroup']}]
    let res2 = await productapi.run(req.query);  

    console.log(res2);
return res2;

});
*/

  /*
    this.before('READ','ProductLocal',async req=>{
  //console.log("working");
  //console.log(this.entities);
  const {Products,ProductLocal} = this.entities;
  console.log("Fired Read");
  qry = SELECT.from(Products).columns([{ref:['Product']},{ref:['ProductType']},{ref:['ProductGroup']},{ref:['BaseUnit']},{ref:['to_Description'],expand:['*']}]).limit(1000);
  let res=await productapi.run(qry);
  res.forEach((element) => {
    //console.log(element.to_Description);
    element.to_Description.forEach((item) => {
        if (item.Language='EN'){
            element.ProductDescription=item.ProductDescription; 
        }
    });
    delete(element.to_Description);
          });
  insqry = UPSERT.into(ProductLocal).entries(res);
  await cds.run(insqry);     
    })
    this.before('UPDATE','ProductLocal',async req=>{
      const {Products, ProductLocal, ProductDescription}=this.entities;
      console.log(req.data);
      console.log("fired update");
      
          //delete(req.data.ProductDescription);
          console.log(req.data);
          updqry = UPDATE(ProductDescription).data({"ProductDescription":req.data.ProductDescription}).where({Product: req.data.Product, Language: 'EN'})
          await productapi.run(updqry);
      
    });
    
      // INSERT handler
      this.before('CREATE', 'ProductLocal', async req => {
          const { Products, ProductLocal, ProductDescription } = this.entities;
          console.log(req.data);
          console.log("Fired Update");
      
          // Correct the structure of the INSERT query
          const insqry = INSERT.into(Products).entries({
              Product: req.data.Product,
              ProductType: req.data.ProductType,
              BaseUnit: req.data.BaseUnit,
              ProductGroup: req.data.ProductGroup,
              to_Description: [{
                  Product: req.data.Product, 
                  Language: 'EN',
                  ProductDescription: req.data.ProductDescription
              }]
          });
      
          await productapi.run(insqry);
      });
      */
     /*
})  
     */

const cds = require('@sap/cds');
const axios = require('axios');
const { json2xml } = require('xml-js');

module.exports = cds.service.impl(async function () {
    const { PurchaseOrder, Forms } = this.entities;

    // READ operation for PurchaseOrders
    this.on('READ', PurchaseOrder, async (req) => {
        try {
            const productapi = await cds.connect.to('CE_PURCHASEORDER_0001');
            req.query.SELECT.columns = [{ref:['PurchaseOrder']},{ref:['PurchaseOrderType']},{ref:['PurchaseOrderSubtype']},{ref:['CreatedByUser']},{ref:['CreationDate']}]
        let res = await productapi.run(req.query);  

       
    console.log(res);
    return res;
            /*
            const serviceUrl = 'https://my409860-api.s4hana.cloud.sap/sap/opu/odata4/sap/api_purchaseorder_2/srvd_a2x/sap/purchaseorder/0001/PurchaseOrder';

            // Make the GET request using axios
            const response = await axios.get(serviceUrl, {
                auth: {
                    username: 'BTP_CLASS_USER',
                    password: 'Bze8GiFnoYiWWjLQdcqGVdMZtiADoVe~BqvPAnMK'
                },
                params: {
                    // '$top': '30', // Adjust based on your needs
                    ...req.query
                }
            });

            // Assuming the OData service returns a 'value' array with the data
            return response.data.value; // Return the fetched data directly
            */

        } catch (error) {
            console.error('Error fetching data from external service:', error);
            req.error(500, 'Failed to fetch data from external service');
        }
    });

    // READ operation for Forms (assuming this is static or predefined)
    this.on('READ', Forms, async (req) => {
        const formsData = [
            { ID: '1', FormName: 'PrePrintedLabel/Default' },
            { ID: '2', FormName: 'niharika/Default' },
            { ID: '3', FormName: 'Form C' }
        ];
        return formsData; // Return in-memory static data
    });

    // Operation for labeling PurchaseOrders
    this.on('label', 'PurchaseOrder', async (req) => {
        const productapi = await cds.connect.to('CE_PURCHASEORDER_0001');
        //const { PurchaseOrder, Forms,PurchaseOrderItem } = this.entities;
        const { PurchaseOrder } = req.params[0];  
        console.log(PurchaseOrder);
        try {
            // Fetch Purchase Orders with selected fields
            const purchaseOrders = await productapi.run(
                SELECT.from('PurchaseOrder').where({ PurchaseOrder: PurchaseOrder }).columns(
                    'PurchaseOrder',
                    'PurchaseOrderType',
                    'PurchaseOrderSubtype',
                    'PurchasingDocumentOrigin',
                    'PurchasingDocumentProcessCode',
                    'CreatedByUser',
                    'CreationDate'
                )
            );

            // Initialize an empty array to store combined results
            let combinedResult = [];

            // Loop through each purchase order to fetch corresponding items and related data
            for (let order of purchaseOrders) {
                // Fetch corresponding Purchase Order Items for each PurchaseOrder
                const purchaseOrderItems = await productapi.run(
                    SELECT.from('PurchaseOrderItem').where({ PurchaseOrder: order.PurchaseOrder }).columns(
                        'PurchaseOrder',
                        'PurchaseOrderItem',
                        'PurchaseOrderCategory',
                        'DocumentCurrency',
                        'PurchasingDocumentDeletionCode',
                        'MaterialGroup'
                    )
                );

                // For each PurchaseOrderItem, fetch nested pricing elements and schedule lines
                for (let item of purchaseOrderItems) {
                    // Fetch PurOrderItemPricingElement for each PurchaseOrderItem
                    const pricingElements = await productapi.run(
                        SELECT.from('PurOrderItemPricingElement')
                            .where({
                                PurchaseOrder: item.PurchaseOrder,
                                PurchaseOrderItem: item.PurchaseOrderItem
                            })
                            .columns(
                                'PurchaseOrder',
                                'PurchaseOrderItem',
                                'PricingDocumentItem',
                                'PricingProcedureStep'
                            )
                    );
                    

                    // Fetch PurchaseOrderScheduleLine for each PurchaseOrderItem
                    const scheduleLines = await productapi.run(
                        SELECT.from('PurchaseOrderScheduleLine').where({ PurchaseOrderItem: item.PurchaseOrderItem ,PurchaseOrder:item.PurchaseOrder}).columns(
                            'PurchaseOrder',
                            'PurchaseOrderItem',
                            'ScheduleLine',
                            'ScheduleLineDeliveryDate',
                            'SchedLineStscDeliveryDate',
                            'PerformancePeriodStartDate',
                            'PerformancePeriodEndDate',
                            'ScheduleLineDeliveryTime'
                        )
                    );

                    // Attach nested data to PurchaseOrderItem
                    item.PurOrderItemPricingElement = pricingElements;
                    item.PurchaseOrderScheduleLine = scheduleLines;
                }

                // Fetch PurchaseOrderNote for each PurchaseOrder
                const purchaseOrderNotes = await productapi.run(
                    SELECT.from('PurchaseOrderNote').where({ PurchaseOrder: order.PurchaseOrder }).columns(
                        'PurchaseOrder',
                        'TextObjectType',
                        'Language',
                        'PlainLongText'
                    )
                );

                // Combine PurchaseOrder and related PurchaseOrderItems, including notes
                combinedResult.push({
                    ...order, // All fields from PurchaseOrder
                    PurchaseOrderItems: purchaseOrderItems, // Add the related PurchaseOrderItems with nested PurOrderItemPricingElement and PurchaseOrderScheduleLine
                    PurchaseOrderNotes: purchaseOrderNotes // Add PurchaseOrderNotes
                });
            }
console.log(combinedResult);
console.log(JSON.stringify(combinedResult, null, 2));
jsonData=JSON.stringify(combinedResult, null, 2);
const wrappedJsonData = { PurchaseOrders: combinedResult };

// Convert wrapped JSON object to XML
const xmlOptions = { compact: true, ignoreComment: true, spaces: 4 };
const xmlData = json2xml(wrappedJsonData, xmlOptions); // Convert JSON to XML

console.log("Generated XML:", xmlData);
const base64EncodedXML = Buffer.from(xmlData).toString('base64');
console.log("Base64 Encoded XML:", base64EncodedXML);
const authResponse = await axios.get('https://chembonddev.authentication.us10.hana.ondemand.com/oauth/token', {
                params: {
                    grant_type: 'client_credentials'
                },
                auth: {
                    username: 'sb-ffaa3ab1-4f00-428b-be0a-1ec55011116b!b142994|ads-xsappname!b65488',
                    password: 'e44adb92-4284-4c5f-8d41-66f8c1125bc5$F4bN1ypCgWzc8CsnjwOfT157HCu5WL0JVwHuiuwHcSc='
                }
            });
            const accessToken = authResponse.data.access_token;
            console.log("Access Token:", accessToken);
            const pdfResponse = await axios.post('https://adsrestapi-formsprocessing.cfapps.us10.hana.ondemand.com/v1/adsRender/pdf?templateSource=storageName', {
                xdpTemplate: "niharika/Default",
                xmlData: base64EncodedXML, 
                formType: "print",
                formLocale: "",
                taggedPdf: 1,
                embedFont: 0
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const fileContent = pdfResponse.data.fileContent;
            console.log("File Content:", fileContent);
            return fileContent;
            // Return the combined result
            //return JSON.stringify(combinedResult, null, 2);
            //const xmlOptions = { compact: true, ignoreComment: true, spaces: 4 }; // Formatting options
                //const xmlData = json2xml(jsonData, xmlOptions); // Convert JSON to XML
    
                
               
    
                
                

        } catch (err) {
            console.error(err);
            return req.error(500, 'Error retrieving Purchase Orders and related data');
        }

        /*
        const { PurchaseOrder } = req.params[0];  
        console.log(PurchaseOrder);
        
        // Call the external API to fetch specific Purchase Order data
        try {
            const serviceUrl = `https://my409860-api.s4hana.cloud.sap/sap/opu/odata4/sap/api_purchaseorder_2/srvd_a2x/sap/purchaseorder/0001/PurchaseOrder('${PurchaseOrder}')`;
            const response = await axios.get(serviceUrl, {
                auth: {
                    username: 'BTP_CLASS_USER',
                    password: 'Bze8GiFnoYiWWjLQdcqGVdMZtiADoVe~BqvPAnMK'
                }
            });
console.log(req.data);
            const rowData = response.data; // Get the specific Purchase Order data
            //const rowData = await SELECT.one.from(PurchaseOrders).where({PurchaseOrder: PurchaseOrder});
            console.log(rowData);
            // Update the rowData with request data
            rowData.name = req.data.name;
            rowData.amount = req.data.amount;
            //console.log(rowData);
            const formsData = req.data.Forms;
            console.log('forms data:',formsData)
            if (!rowData) {
                return req.error(404, `No data found for PurchaseOrder: ${PurchaseOrder}`);
            }

            console.log("Row data:", rowData);
            
/*
            const xmlfun = (rowData) => {
                const xmlData = json2xml({ PurchaseOrder: rowData }, { header: true });
                console.log(xmlData);
                return xmlData;
            };

            const callxml = xmlfun(rowData);
            console.log("Generated XML:", callxml);
            */
           
        //     const jsonData = {
        //         PurchaseOrder: {
                    
        //             PurchaseOrder: rowData.PurchaseOrder,
        //             PurchaseOrderType: rowData.PurchaseOrderType,
        //             PurchaseOrderSubtype: rowData.PurchaseOrderSubtype,
        //             PurchasingDocumentOrigin: rowData.PurchasingDocumentOrigin,
        //             PurchasingDocumentProcessCode: rowData.PurchasingDocumentProcessCode,
        //             CreatedByUser: rowData.CreatedByUser,
        //             CreationDate: rowData.CreationDate,
        //             PurchaseOrderDate: rowData.PurchaseOrderDate,
        //             LastChangeDateTime: rowData.LastChangeDateTime,
        //             Language: rowData.Language,
        //             CompanyCode: rowData.CompanyCode,
        //             PurchasingOrganization: rowData.PurchasingOrganization,
        //             PurchasingGroup: rowData.PurchasingGroup,
        //             Supplier: rowData.Supplier,
        //             DocumentCurrency: rowData.DocumentCurrency,
        //             ExchangeRate: rowData.ExchangeRate,
        //             ExchangeRateIsFixed: rowData.ExchangeRateIsFixed,
        //             TaxReturnCountry: rowData.TaxReturnCountry,
        //             VATRegistrationCountry: rowData.VATRegistrationCountry,
        //             PricingDocument: rowData.PricingDocument,
        //             PricingProcedure: rowData.PricingProcedure,
        //             name: rowData.name,
        //             amount: rowData.amount
        //         }
        //     };

        //     // Convert JSON to XML using json2xml
        //     const xmlOptions = { compact: true, ignoreComment: true, spaces: 4 }; // Formatting options
        //     const xmlData = json2xml(jsonData, xmlOptions); // Convert JSON to XML

        //     console.log("Generated XML:", xmlData);
        //     const base64EncodedXML = Buffer.from(xmlData).toString('base64');

        //     console.log("Base64 Encoded XML:", base64EncodedXML);
        //     try {
        //         const authResponse = await axios.get('https://chembonddev.authentication.us10.hana.ondemand.com/oauth/token', {
        //             params: {
        //                 grant_type: 'client_credentials'
        //             },
        //             auth: {
        //                 username: 'sb-ffaa3ab1-4f00-428b-be0a-1ec55011116b!b142994|ads-xsappname!b65488',
        //                 password: 'e44adb92-4284-4c5f-8d41-66f8c1125bc5$F4bN1ypCgWzc8CsnjwOfT157HCu5WL0JVwHuiuwHcSc='
        //             }
        //         });
        //         const accessToken = authResponse.data.access_token;
        //         console.log("Access Token:", accessToken);
        //         const pdfResponse = await axios.post('https://adsrestapi-formsprocessing.cfapps.us10.hana.ondemand.com/v1/adsRender/pdf?templateSource=storageName', {
        //             xdpTemplate: formsData,
        //             xmlData: base64EncodedXML, 
        //             formType: "print",
        //             formLocale: "",
        //             taggedPdf: 1,
        //             embedFont: 0
        //         }, {
        //             headers: {
        //                 Authorization: `Bearer ${accessToken}`,
        //                 'Content-Type': 'application/json'
        //             }
        //         });
        //         const fileContent = pdfResponse.data.fileContent;
        //         console.log("File Content:", fileContent);
        //         return fileContent;

        //     } catch (error) {
        //         console.error("Error occurred:", error);
        //         return req.error(500, "An error occurred while processing your request.");
        //     }
        // } catch (error) {
        //     console.error('Error fetching specific Purchase Order data:', error);
        //     req.error(500, `Failed to fetch data for PurchaseOrder: ${PurchaseOrder}`);
        // }
        
    });
});

