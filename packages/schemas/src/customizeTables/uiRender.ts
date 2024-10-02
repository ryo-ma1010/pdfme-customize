// @ts-nocheck
import type { UIRenderProps, Mode } from "@pdfme/common";
import type { CustomizeTableSchema, CellStyle, Styles } from "./types";
import { uiRender as parentUiRender } from "../tables/uiRender";

export const uiRender = async (arg: UIRenderProps<CustomizeTableSchema>) => {
  console.dir(arg, {depth: null});
  await parentUiRender(arg);
};