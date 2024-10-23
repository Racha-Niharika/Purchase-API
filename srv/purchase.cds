using {ExternalService.PurchaseOrder as Product} from './service';

annotate Product with @(
    UI.LineItem:[
        {
            $Type:'UI.DataField',
            Value: PurchaseOrder
        },
        {
            $Type:'UI.DataField',
            Value: PurchaseOrderType
        },
        {
            $Type:'UI.DataField',
            Value: PurchaseOrderSubtype
        },
        {
            $Type:'UI.DataField',
            Value: CreatedByUser
        },
        {
            $Type:'UI.DataField',
            Value: CreationDate
        },

    ]
);
//annotate Product with @odata.draft.enabled;

annotate Product with @(
    UI.SelectionFields: [ PurchaseOrder , PurchaseOrderType, PurchaseOrderType],  
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
           {
            $Type:'UI.DataField',
            Value: PurchaseOrder
        },
        {
            $Type:'UI.DataField',
            Value: PurchaseOrderType
        },
        {
            $Type:'UI.DataField',
            Value: PurchaseOrderSubtype
        },
        {
            $Type:'UI.DataField',
            Value: CreatedByUser
        },
        {
            $Type:'UI.DataField',
            Value: CreationDate
        },
            
        ]
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        }
    ]
);