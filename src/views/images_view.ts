import Image from "../models/Image";
import 'dotenv/config';

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: image.path,
    };
  },

  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  }
};
