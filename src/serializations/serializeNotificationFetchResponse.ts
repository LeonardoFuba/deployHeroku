import { ElementCompact } from 'xml-js';

export default function serializeNotificationFetchResponse(responseObject: ElementCompact) {
  /**
   * @param {Object} responseObject
   *
   * Formata a resposta dos dados da consulta via codigo de notificacao vindos do pagseguro
   */

  return {
    date: responseObject.transaction.date._text,
    code: responseObject.transaction.code._text,
    reference: responseObject.transaction.reference._text,
    type: responseObject.transaction.type._text,
    status: responseObject.transaction.status._text,
    lastEventDate: responseObject.transaction.lastEventDate._text,
    paymentMethod: {
      type: responseObject.transaction.paymentMethod.type._text,
      code: responseObject.transaction.paymentMethod.code._text,
    },
    paymentLink: responseObject.transaction.paymentLink ? responseObject.transaction.paymentLink : '',
    grossAmount: responseObject.transaction.grossAmount._text,
    discountAmount: responseObject.transaction.discountAmount._text,
    creditorFees: {
      intermediationRateAmount: responseObject.transaction.creditorFees.intermediationRateAmount._text,
      intermediationFeeAmount: responseObject.transaction.creditorFees.intermediationFeeAmount._text,
    },
    netAmount: responseObject.transaction.netAmount._text,
    extraAmount: responseObject.transaction.extraAmount._text,
    escrowEndDate: responseObject.transaction.escrowEndDate,
    installmentCount: responseObject.transaction.installmentCount._text,
    itemCount: responseObject.transaction.itemCount._text,
    items: {
      item: {
        id: responseObject.transaction.items.item.id._text,
        description: responseObject.transaction.items.item.description._text,
        quantity: responseObject.transaction.items.item.quantity._text,
        amount: responseObject.transaction.items.item.amount._text,
      },
    },
    sender: {
      name: responseObject.transaction.sender.name._text,
      email: responseObject.transaction.sender.email._text,
      phone: {
        areaCode: responseObject.transaction.sender.phone.areaCode._text,
        number: responseObject.transaction.sender.phone.number._text,
      },
      documents: {
        document: {
          type: responseObject.transaction.sender.documents.document.type._text,
          value: responseObject.transaction.sender.documents.document.value._text,
        }
      },
    },
    shipping: {
      address: {
        street: responseObject.transaction.shipping.address.street._text,
        number: responseObject.transaction.shipping.address.number._text,
        complement: responseObject.transaction.shipping.address.complement._text,
        district: responseObject.transaction.shipping.address.district._text,
        city: responseObject.transaction.shipping.address.city._text,
        state: responseObject.transaction.shipping.address.state._text,
        country: responseObject.transaction.shipping.address.country._text,
        postalCode: responseObject.transaction.shipping.address.postalCode._text,
      },
      type: responseObject.transaction.shipping.type._text,
      cost: responseObject.transaction.shipping.cost._text,
    },
    primaryReceiver: {
      publicKey: responseObject.transaction.primaryReceiver.publicKey._text
    }
  };
}
