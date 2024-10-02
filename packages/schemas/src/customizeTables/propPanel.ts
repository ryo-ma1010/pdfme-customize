import { propPanel as parentPropPanel } from "../tables/propPanel";
import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import { CustomizeTableSchema } from './types';


export const propPanel: PropPanel<CustomizeTableSchema>  = {
  schema: (propPanelProps: Omit<PropPanelWidgetProps, 'rootElement'>) => {
    if (typeof parentPropPanel.schema !== 'function') {
      throw Error('Oops, is customizeTable schema no longer a function?');
    }
    const parentSchema = parentPropPanel.schema(propPanelProps);
    const parentHeadStyles = parentSchema.headStyles;
    const headProperties = parentSchema.headStyles.properties;

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
            properties: getDisplayHeaderNamesSchema(propPanelProps.activeSchema.head),
          },
        }
      },
    }
  },
  // custmizeTableの初期表示
  defaultSchema: {
    ...parentPropPanel.defaultSchema,
    type: 'customizeTable',
    content: JSON.stringify([
      ['Apple', '1', '100'],
      ['Banana', '10', '2000'],
      ['Chocolate', '2', '300'],
    ]),
    head: ['Name', 'Quantity', 'Price'],
    headStyles: {
      ...parentPropPanel.defaultSchema.headStyles,
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