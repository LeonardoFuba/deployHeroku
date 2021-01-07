import convert from 'xml-js';

interface Checkout extends convert.ElementCompact{
  checkout: {
    code: { _text: string; }
    date: { _text: string; }
  }
}

export default {
  render(xml: string) {
    const compactJson = convert.xml2js(xml, { compact: true } ) as Checkout;
    return {
      checkout: {
        code: compactJson.checkout.code._text,
        date: compactJson.checkout.date._text,
      }
    };
  },
};
