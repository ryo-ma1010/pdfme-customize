import { PDFRenderProps } from "@pdfme/common";
import { CustomizeTableSchema } from "./types";
import { pdfRender as parentPdfRender } from "../tables/pdfRender";

export const pdfRender = async (arg: PDFRenderProps<CustomizeTableSchema>) => {
  const {schema, ...rest} = arg;

  // ヘッダー書き換え
  if (schema.headStyles.displayHeaderNames !== undefined) {
    for (const [key, head] of schema.head.entries()) {
      if (schema.headStyles.displayHeaderNames[head] === undefined) continue;
      if (schema.headStyles.displayHeaderNames[head] === '') continue;
      schema.head[key] = schema.headStyles.displayHeaderNames[head];
    }
  }

  console.dir(schema,{depth: null});

  const renderArgs = {schema, ...rest};

  await parentPdfRender(renderArgs);
};