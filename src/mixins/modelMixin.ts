import { model, Schema } from 'mongoose';

const modelMixin = <T>(name: string, schema: Schema) => {
  class Base {
    protected Model = model<T>(name, schema);
  }

  return Base;
};

export default modelMixin;
