using ExternalService as service from '../../srv/service';
annotate service.PurchaseOrders with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'PurchaseOrder',
                Value : PurchaseOrder,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchaseOrderType',
                Value : PurchaseOrderType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchaseOrderSubtype',
                Value : PurchaseOrderSubtype,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchasingDocumentOrigin',
                Value : PurchasingDocumentOrigin,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchasingDocumentProcessCode',
                Value : PurchasingDocumentProcessCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CreatedByUser',
                Value : CreatedByUser,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CreationDate',
                Value : CreationDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchaseOrderDate',
                Value : PurchaseOrderDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'LastChangeDateTime',
                Value : LastChangeDateTime,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ValidityStartDate',
                Value : ValidityStartDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ValidityEndDate',
                Value : ValidityEndDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Language',
                Value : Language,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchaseOrderDeletionCode',
                Value : PurchaseOrderDeletionCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ReleaseIsNotCompleted',
                Value : ReleaseIsNotCompleted,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchasingCompletenessStatus',
                Value : PurchasingCompletenessStatus,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchasingProcessingStatus',
                Value : PurchasingProcessingStatus,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurgReleaseSequenceStatus',
                Value : PurgReleaseSequenceStatus,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ReleaseCode',
                Value : ReleaseCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchasingReleaseStrategy',
                Value : PurchasingReleaseStrategy,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurgReasonForDocCancellation',
                Value : PurgReasonForDocCancellation,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CompanyCode',
                Value : CompanyCode,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchasingOrganization',
                Value : PurchasingOrganization,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchasingGroup',
                Value : PurchasingGroup,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Supplier',
                Value : Supplier,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ManualSupplierAddressID',
                Value : ManualSupplierAddressID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SupplierAddressID',
                Value : SupplierAddressID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SupplierRespSalesPersonName',
                Value : SupplierRespSalesPersonName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SupplierPhoneNumber',
                Value : SupplierPhoneNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SupplyingSupplier',
                Value : SupplyingSupplier,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SupplyingPlant',
                Value : SupplyingPlant,
            },
            {
                $Type : 'UI.DataField',
                Label : 'InvoicingParty',
                Value : InvoicingParty,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Customer',
                Value : Customer,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchaseContract',
                Value : PurchaseContract,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SupplierQuotationExternalID',
                Value : SupplierQuotationExternalID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'QuotationSubmissionDate',
                Value : QuotationSubmissionDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ItemNumberIntervalForSubItems',
                Value : ItemNumberIntervalForSubItems,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PaymentTerms',
                Value : PaymentTerms,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CashDiscount1Days',
                Value : CashDiscount1Days,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CashDiscount2Days',
                Value : CashDiscount2Days,
            },
            {
                $Type : 'UI.DataField',
                Label : 'NetPaymentDays',
                Value : NetPaymentDays,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CashDiscount1Percent',
                Value : CashDiscount1Percent,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CashDiscount2Percent',
                Value : CashDiscount2Percent,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DownPaymentType',
                Value : DownPaymentType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DownPaymentPercentageOfTotAmt',
                Value : DownPaymentPercentageOfTotAmt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DownPaymentAmount',
                Value : DownPaymentAmount,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DownPaymentDueDate',
                Value : DownPaymentDueDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'IncotermsClassification',
                Value : IncotermsClassification,
            },
            {
                $Type : 'UI.DataField',
                Label : 'IncotermsTransferLocation',
                Value : IncotermsTransferLocation,
            },
            {
                $Type : 'UI.DataField',
                Label : 'IncotermsVersion',
                Value : IncotermsVersion,
            },
            {
                $Type : 'UI.DataField',
                Label : 'IncotermsLocation1',
                Value : IncotermsLocation1,
            },
            {
                $Type : 'UI.DataField',
                Label : 'IncotermsLocation2',
                Value : IncotermsLocation2,
            },
            {
                $Type : 'UI.DataField',
                Label : 'IsIntrastatReportingRelevant',
                Value : IsIntrastatReportingRelevant,
            },
            {
                $Type : 'UI.DataField',
                Label : 'IsIntrastatReportingExcluded',
                Value : IsIntrastatReportingExcluded,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CorrespncExternalReference',
                Value : CorrespncExternalReference,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CorrespncInternalReference',
                Value : CorrespncInternalReference,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PricingDocument',
                Value : PricingDocument,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PricingProcedure',
                Value : PricingProcedure,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DocumentCurrency',
                Value : DocumentCurrency,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ExchangeRate',
                Value : ExchangeRate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ExchangeRateIsFixed',
                Value : ExchangeRateIsFixed,
            },
            {
                $Type : 'UI.DataField',
                Label : 'TaxReturnCountry',
                Value : TaxReturnCountry,
            },
            {
                $Type : 'UI.DataField',
                Label : 'VATRegistrationCountry',
                Value : VATRegistrationCountry,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurgAggrgdProdCmplncSuplrSts',
                Value : PurgAggrgdProdCmplncSuplrSts,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurgAggrgdProdMarketabilitySts',
                Value : PurgAggrgdProdMarketabilitySts,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurgAggrgdSftyDataSheetStatus',
                Value : PurgAggrgdSftyDataSheetStatus,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurgProdCmplncTotDngrsGoodsSts',
                Value : PurgProdCmplncTotDngrsGoodsSts,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PurchasingCollectiveNumber',
                Value : PurchasingCollectiveNumber,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'PurchaseOrder',
            Value : PurchaseOrder,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PurchaseOrderType',
            Value : PurchaseOrderType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PurchaseOrderSubtype',
            Value : PurchaseOrderSubtype,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PurchasingDocumentOrigin',
            Value : PurchasingDocumentOrigin,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PurchasingDocumentProcessCode',
            Value : PurchasingDocumentProcessCode,
        },
    ],
);

