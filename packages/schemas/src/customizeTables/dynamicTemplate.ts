import { Schema, BasePdf, CommonOptions } from '@pdfme/common';
import { createSingleTable } from '../tables/tableHelper.js';
import { getBodyWithRange, getBody } from '../tables/helper.js';
import { CustomizeTableSchema } from './types.js';

export const getDynamicHeightsForCustomizeTable = async (
  value: string,
  args: {
    schema: Schema;
    basePdf: BasePdf;
    options: CommonOptions;
    _cache: Map<any, any>;
  }
): Promise<number[]> => {
  if (args.schema.type !== 'customizeTable') return Promise.resolve([args.schema.height]);
  const schema = args.schema as CustomizeTableSchema;
  const body =
    schema.__bodyRange?.start === 0 ? getBody(value) : getBodyWithRange(value, schema.__bodyRange);
  const table = await createSingleTable(body, args);
  return table.allRows().map((row) => row.height);
};