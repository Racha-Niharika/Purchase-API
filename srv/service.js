
const cds = require('@sap/cds');
const axios = require('axios');
const { json2xml } = require('xml-js');
const fs = require('fs');

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

    
    this.on('READ', Forms, async (req) => {
        const formsData = [
            {  FormName: 'PrePrintedLabel/Default' },
            {  FormName: 'niharika/Default' },
            {  FormName: 'sonia/Default' }
        ];
        return formsData; // Return in-memory static data
    });

    // Operation for labeling PurchaseOrders
    this.on('label', 'PurchaseOrder', async (req) => {
        const productapi = await cds.connect.to('CE_PURCHASEORDER_0001');
        //console.log(productapi);
        const businessapi = await cds.connect.to('API_BUSINESS_PARTNER');
        console.log(businessapi);
        //const { PurchaseOrder, Forms,PurchaseOrderItem } = this.entities;
        const { PurchaseOrder } = req.params[0];  
        console.log(PurchaseOrder);
        try {
            // Fetch Purchase Orders with selected fields
            const purchaseOrders = await productapi.run(
                SELECT.from('PurchaseOrder').where({ PurchaseOrder: PurchaseOrder }).columns(
                    'Supplier',
                    'PurchaseOrder',
                    'PurchaseOrderType',
                    'PurchaseOrderSubtype',
                    'PurchasingDocumentOrigin',
                    'PurchasingDocumentProcessCode',
                    'CreatedByUser',
                    'CreationDate',
                    'PurchaseOrderDate'
                )
            );

            // Initialize an empty array to store combined results
            let combinedResult = [];

            // Loop through each purchase order to fetch corresponding items and related data
            for (let order of purchaseOrders) {
                const purchaseOrderItems = await productapi.run(
                    SELECT.from('PurchaseOrderItem').where({ PurchaseOrder: order.PurchaseOrder }).columns(
                        'PurchaseOrder',
                        'PurchaseOrderItem',
                        'PurchaseOrderCategory',
                        'DocumentCurrency',
                        'PurchasingDocumentDeletionCode',
                        'MaterialGroup',
                        'Material',
                        'PurchaseOrderItemText',
                        'PurchaseOrderQuantityUnit',
                        'BaseUnit',
                        'OrderQuantity',
                        'NetPriceAmount',
                        'ItemVolume',
                        'ItemGrossWeight',
                        'ItemNetWeight',
                        'OrderPriceUnitToOrderUnitNmrtr',
                        'OrdPriceUnitToOrderUnitDnmntr',
                        'GoodsReceiptIsNonValuated',
                        'IsToBeAcceptedAtOrigin',
                        'TaxCode',
                        'NetAmount',
                        'GrossAmount'
                    )
                );
                
                // Fetch corresponding Purchase Order Items for each PurchaseOrder
                const _SupplierAddress = await productapi.run(
                    SELECT.from('PurchaseOrder')
                        .where({ PurchaseOrder: order.PurchaseOrder })
                        .columns(
                            'PurchaseOrder', // Purchase Order fields
                            {
                                ref: ['_SupplierAddress'], // Expanding Supplier Address data
                                expand: [
                                    'PurchaseOrderItem',
                                    'PurchaseOrderCategory',
                                    'DocumentCurrency',
                                    'PurchasingDocumentDeletionCode',
                                    'MaterialGroup',
                                    'AddresseeFullName',
                                    'OrganizationName1',
                                    'OrganizationName2',
                                    'OrganizationName3',
                                    'OrganizationName4',
                                    'AddressSearchTerm1',
                                    'AddressSearchTerm2',
                                    'CityName',
                                    'DistrictName',
                                    'VillageName',
                                    'PostalCode',
                                    'CompanyPostalCode',
                                    'StreetName',
                                    'StreetPrefixName1',
                                    'StreetPrefixName2',
                                    'StreetSuffixName1',
                                    'StreetSuffixName2'
                                ]
                            }
                        )
                );
                const GSTNO = await businessapi.run(
                    SELECT.from('A_Supplier')
                    .where({
                        Supplier : order.Supplier
                    }).columns(
                        'Supplier',
                        'SupplierFullName',
                        'SupplierName',
                        'VATRegistration',
                        'TaxNumber3'

                    )
                )
                const companycode = await businessapi.run(
                    SELECT.from('A_SupplierCompany')
                    .where({
                        Supplier : order.Supplier
                    }).columns(
                        'Supplier',
                        'CompanyCode',
                        'PaymentTerms'

                    )
                )
                
                

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
                                'ConditionRateAmount',
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
                    const PurOrderItemDeliveryAddress = await productapi.run(
                        SELECT.from('PurchaseOrderItem')
                        .where({ PurchaseOrderItem: item.PurchaseOrderItem ,PurchaseOrder:item.PurchaseOrder})
                        .columns(
                            'PurchaseOrder',
                            'PurchaseOrderItem',
                            {
                                ref: ['_DeliveryAddress'], // Expanding Supplier Address data
                                expand: [
                                    'PurchaseOrder',
    'PurchaseOrderItem',
    'DeliveryAddressID',
    'AddressID',
    'AddresseeFullName',
    'OrganizationName1',
    'OrganizationName2',
    'OrganizationName3',
    'OrganizationName4',
    'AddressSearchTerm1',
    'AddressSearchTerm2',
    'CityName',
    'DistrictName',
    'VillageName',
    'PostalCode',
    'CompanyPostalCode',
    'StreetName',
    'StreetPrefixName1',
    'StreetPrefixName2',
    'StreetSuffixName1',
    'StreetSuffixName2',
    'HouseNumber',
    'HouseNumberSupplementText',
    'Building',
    'Floor',
    'RoomNumber',
    'Country',
    'Region',
    'FormOfAddress'
                                ]
                            }
                        )
                                            );
                    

                    // Attach nested data to PurchaseOrderItem
                    
                    item.PurOrderItemDeliveryAddress = PurOrderItemDeliveryAddress;
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

                    _SupplierAddress:_SupplierAddress,
                    GSTNO:GSTNO,
                    companycode:companycode,
                    PurchaseOrderItems: purchaseOrderItems, // Add the related PurchaseOrderItems with nested PurOrderItemPricingElement and PurchaseOrderScheduleLine
                    PurchaseOrderNotes: purchaseOrderNotes // Add PurchaseOrderNotes
                });
            }
            let formsData = req.data.Forms;
console.log(combinedResult);
console.log(JSON.stringify(combinedResult, null, 2));
jsonData=JSON.stringify(combinedResult, null, 2);
const wrappedJsonData = { PurchaseOrders: combinedResult };

// Convert wrapped JSON object to XML
const xmlOptions = { compact: true, ignoreComment: true, spaces: 4 };
const xmlData = json2xml(wrappedJsonData, xmlOptions); // Convert JSON to XML

console.log("Generated XML:", xmlData);
/*
const filePath = './purchase.xml'; // Specify the file path
fs.writeFile(filePath, xmlData, (err) => {
    if (err) {
        console.error('Error writing XML to file:', err);
    } else {
        console.log('XML successfully saved to', filePath);
    }
});
*/
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
                xdpTemplate: formsData,
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
            /*
            const filePath = './purchase.xml'; // Specify the file path
fs.writeFile(filePath, xmlData, (err) => {
    if (err) {
        console.error('Error writing XML to file:', err);
    } else {
        console.log('XML successfully saved to', filePath);
    }
});
*/
            return fileContent; 
                
        } catch (err) {
            console.error(err);
            return req.error(500, 'Error retrieving Purchase Orders and related data');
        }

    });
});

