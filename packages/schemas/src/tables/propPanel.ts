import { PropPanel, PropPanelWidgetProps } from '@pdfme/common';
import type { TableSchema } from './types';
import { getFallbackFontName, DEFAULT_FONT_NAME } from '@pdfme/common';
import {
  getDefaultCellStyles,
  getCellPropPanelSchema,
  getColumnStylesPropPanelSchema,
} from './helper.js';
import { HEX_COLOR_PATTERN } from '../constants.js';

const getDisplayHeaderNamesSchema = (head: string[]) => {
  return head.reduce((acc, cur, i) => Object.assign(acc, {
    [cur || 'Column ' + String(i + 1)]: {
      title: cur || 'Column ' + String(i + 1),
      type: 'string',
      props: {},
    },
  }), {});
};

export const propPanel: PropPanel<TableSchema> = {
  schema: ({ activeSchema, options, i18n }) => {
    // @ts-ignore
    const head = (activeSchema.head || []) as string[];
    const font = options.font || { [DEFAULT_FONT_NAME]: { data: '', fallback: true } };
    const fontNames = Object.keys(font);
    const fallbackFontName = getFallbackFontName(font);
    return {
      tableStyles: {
        title: i18n('schemas.table.tableStyle'),
        type: 'object',
        widget: 'Card',
        span: 24,
        properties: {
          borderWidth: {
            title: i18n('schemas.borderWidth'),
            type: 'number',
            widget: 'inputNumber',
            props: { min: 0, step: 0.1 },
            step: 1,
          },
          borderColor: {
            title: i18n('schemas.borderColor'),
            type: 'string',
            widget: 'color',
            rules: [{ pattern: HEX_COLOR_PATTERN, message: i18n('validation.hexColor') }],
          },
        },
      },
      headStyles: {
        title: i18n('schemas.table.headStyle'),
        type: 'object',
        widget: 'Card',
        span: 24,
        properties: getCellPropPanelSchema({ i18n, fallbackFontName, fontNames }),
      },
      bodyStyles: {
        title: i18n('schemas.table.bodyStyle'),
        type: 'object',
        widget: 'Card',
        span: 24,
        properties: getCellPropPanelSchema({ i18n, fallbackFontName, fontNames, isBody: true }),
      },
      columnStyles: {
        title: i18n('schemas.table.columnStyle'),
        type: 'object',
        widget: 'Card',
        span: 24,
        properties: getColumnStylesPropPanelSchema({ head, i18n }),
      },
      customStyles: {
        title: 'customStyle',
        type: 'object',
        widget: 'Card',
        span: 24,
        properties: {
          displayHeaderNames: {
            type: 'object',
            widget: 'lineTitle',
            title: 'display header name',
            column: 3,
            properties: getDisplayHeaderNamesSchema(head),
          },
        },
      },
    };
  },
  defaultSchema: {
    type: 'table',
    position: { x: 0, y: 0 },
    width: 150,
    height: 20,
    content: JSON.stringify([
      ['Alice', 'New York', 'Alice is a freelance web designer and developer'],
      ['Bob', 'Paris', 'Bob is a freelance illustrator and graphic designer'],
      ['Carry', 'Paris', 'Bob is a freelance illustrator and graphic designer'],
    ]),
    showHead: true,
    head: ['Name', 'City', 'Description'],
    headWidthPercentages: [30, 30, 40],
    tableStyles: {
      borderColor: '#000000',
      borderWidth: 0.3,
    },
    headStyles: Object.assign(getDefaultCellStyles(), {
      fontColor: '#ffffff',
      backgroundColor: '#2980ba',
      borderColor: '',
      borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
    }),
    bodyStyles: Object.assign(getDefaultCellStyles(), {
      alternateBackgroundColor: '#f5f5f5',
    }),
    columnStyles: {},
    customStyles: {
      displayHeaderNames: {
        Name: '',
        City: '',
        Description: '',
      }
    },
  },
};
