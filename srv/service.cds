
//using {com.satinfotech.cloudapps as ClKitchen} from '../db/schema';
/*
using {CE_PURCHASEORDER_0001 as purchaseapi} from './external/CE_PURCHASEORDER_0001';
service ExternalService   {
  entity Purchase as projection on purchaseapi.PurchaseOrderItem{
    PurchaseOrder,
    PurchaseOrderItem,
    Material,
    MaterialType,
    BaseUnit   
  } 
}


*/
using { CE_PURCHASEORDER_0001 as external } from './external/CE_PURCHASEORDER_0001';

service ExternalService {
    entity PurchaseOrders as projection on external.PurchaseOrder actions{
    

      action label(
            name: String(80) @Common.Label: 'name',
            amount: String(80) @Common.Label: 'amount',
            Forms: String(80) @Common.Label: 'Forms' @Common.ValueList: {
              CollectionPath: 'Forms', 
              Label: 'Label',
              Parameters: [
                {
                  $Type: 'Common.ValueListParameterInOut',
                  LocalDataProperty: 'Forms',  
                  ValueListProperty: 'FormName'    
                }
              ]
            }) returns String;
  
  }; // Expose the external API's data
    entity Forms {
        key ID: UUID;
        FormName: String(80);
    }
}
//annotate ExternalService.PurchaseOrders with @odata.draft.enabled;
annotate ExternalService.Forms with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: 'ID'
    },
    {
        $Type: 'UI.DataField',
        Value: 'FormName'
    }
]);
