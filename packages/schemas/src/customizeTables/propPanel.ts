import { propPanel as parentPropPanel } from "../tables/propPanel.js";
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { CustomizeTableSchema } from './types.js';
import tableSchema from '../tables/index.js';


export const propPanel: PropPanel<CustomizeTableSchema>  = {
  schema: ({ activeSchema, options, i18n }) => {
    const propPanelProps = {activeSchema, options, i18n};
    // @ts-ignore
    const parentSchema = parentPropPanel.schema(propPanelProps);
    const parentHeadStyles = parentSchema.headStyles;
    const headProperties = parentSchema.headStyles.properties;
    // @ts-ignore
    const head = activeSchema.head;
    return {
      ...parentSchema,
      headStyles: {
        ...parentHeadStyles,
        properties: {
          ...headProperties,
          // これを追加したかった
          '---': { type: 'void', widget: 'Divider' },
          displayHeaderNames: {
            // title: propPanelProps.i18n('schemas.padding'),
            title: 'display header name',
            type: 'object',
            widget: 'lineTitle',
            column: 3,
            properties: getDisplayHeaderNamesSchema(head),
          },
        }
      },
    }
  },
  // custmizeTableの初期表示
  defaultSchema: {
    ...tableSchema.propPanel.defaultSchema,
    // CustomizeTableSchema extends TableSchema extends Schema
    // @ts-ignore
    type: 'customizeTable',
    content: JSON.stringify([
      ['Apple', '1', '100'],
      ['Banana', '10', '2000'],
      ['Chocolate', '2', '300'],
    ]),
    head: ['Name', 'Quantity', 'Price'],
    headStyles: {
      ...tableSchema.propPanel.defaultSchema.headStyles,
      displayHeaderNames: {
        'Name': '商品名',
        'Quantity': '数量',
        'Price': '価格',
      },
    },
  },
};

const getDisplayHeaderNamesSchema = (head: string[]) => {
  return head.reduce((acc, cur, i) => Object.assign(acc, {
    [cur || 'Column ' + String(i + 1)]: {
      title: cur || 'Column ' + String(i + 1),
      type: 'string',
      props: {},
    },
  }), {});
};