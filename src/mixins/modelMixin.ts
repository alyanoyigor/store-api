import { model, Schema } from 'mongoose';

const modelMixin = <T>(name: string, schema: Schema) => {
  class Base {
    protected Model = model<T>(name, schema);

    protected async findByParam(param: Partial<T>) {
      return await this.Model.findOne(param);
    }
  }

  return Base;
};

export default modelMixin;
