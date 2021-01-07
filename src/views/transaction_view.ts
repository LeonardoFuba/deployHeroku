import convert from 'xml-js';

export default {
  render(xml: string) {
    const compactJson = convert.xml2js(xml, { compact: true } ) as convert.ElementCompact;
    return {
      transaction: {
        // date: compactJson.transaction.date._text,
        // code: compactJson.transaction.code._text,
        reference: compactJson.transaction.reference._text,
        // type: compactJson.transaction.type._text,
        status: compactJson.transaction.status._text,
        // lastEventDate: compactJson.transaction.lastEventDate._text,
        paymentMethod: {
          type: compactJson.transaction.paymentMethod.type._text,
          // code: compactJson.transaction.paymentMethod.code._text,
        },
        // paymentLink: compactJson.transaction.paymentLink ? compactJson.transaction.paymentLink : '',
        // grossAmount: compactJson.transaction.grossAmount._text,
        // discountAmount: compactJson.transaction.discountAmount._text,
        // creditorFees: {
        //   intermediationRateAmount: compactJson.transaction.creditorFees.intermediationRateAmount._text,
        //   intermediationFeeAmount: compactJson.transaction.creditorFees.intermediationFeeAmount._text,
        // },
        // netAmount: compactJson.transaction.netAmount._text,
        // extraAmount: compactJson.transaction.extraAmount._text,
        // escrowEndDate: compactJson.transaction.escrowEndDate,
        // installmentCount: compactJson.transaction.installmentCount._text,
        // itemCount: compactJson.transaction.itemCount._text,
        items: {
          item: {
            id: compactJson.transaction.items.item.id._text,
            // description: compactJson.transaction.items.item.description._text,
            // quantity: compactJson.transaction.items.item.quantity._text,
            // amount: compactJson.transaction.items.item.amount._text,
          },
        },
        // sender: {
        //   name: compactJson.transaction.sender.name._text,
        //   email: compactJson.transaction.sender.email._text,
        //   phone: {
        //     areaCode: compactJson.transaction.sender.phone.areaCode._text,
        //     number: compactJson.transaction.sender.phone.number._text,
        //   },
        //   documents: {
        //     document: {
        //       type: compactJson.transaction.sender.documents.document.type._text,
        //       value: compactJson.transaction.sender.documents.document.value._text,
        //     }
        //   },
        // },
        // shipping: {
        //   address: {
        //     street: compactJson.transaction.shipping.address.street._text,
        //     number: compactJson.transaction.shipping.address.number._text,
        //     complement: compactJson.transaction.shipping.address.complement._text,
        //     district: compactJson.transaction.shipping.address.district._text,
        //     city: compactJson.transaction.shipping.address.city._text,
        //     state: compactJson.transaction.shipping.address.state._text,
        //     country: compactJson.transaction.shipping.address.country._text,
        //     postalCode: compactJson.transaction.shipping.address.postalCode._text,
        //   },
        //   type: compactJson.transaction.shipping.type._text,
        //   cost: compactJson.transaction.shipping.cost._text,
        // },
        // primaryReceiver: {
        //   publicKey: compactJson.transaction.primaryReceiver.publicKey._text
        // }
      }
    };
  },
};
