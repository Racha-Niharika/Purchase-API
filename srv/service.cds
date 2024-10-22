
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
service ExternalService{
  entity Forms {
        key ID: UUID;
        FormName: String(80);
    }
entity PurchaseOrder as projection on external.PurchaseOrder 
actions{
    

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
  
  };
entity PurchaseOrderItem as projection on external.PurchaseOrderItem{
     PurchaseOrder,
      PurchaseOrderItem,
      PurchaseOrderCategory,
      DocumentCurrency,
      PurchasingDocumentDeletionCode,
      MaterialGroup,
      
    
}
entity PurchaseOrderNote as projection on external.PurchaseOrderNote{
     PurchaseOrder,
      TextObjectType,
      Language,
      PlainLongText
      
    
}
entity PurchaseOrderScheduleLine as projection on external.PurchaseOrderScheduleLine{
      PurchaseOrder,
      PurchaseOrderItem,
      ScheduleLine,
      ScheduleLineDeliveryDate,
      SchedLineStscDeliveryDate,
      PerformancePeriodStartDate,
      PerformancePeriodEndDate,
      ScheduleLineDeliveryTime,
}

entity PurOrderItemPricingElement as projection on external.PurOrderItemPricingElement{
     key PurchaseOrder,
      PurchaseOrderItem,
      PricingDocumentItem,
      PricingProcedureStep,
}
  }
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
/*
service ExternalService {
    entity PurchaseOrders as projection on external.PurchaseOrder 
    actions{
    

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
*/
