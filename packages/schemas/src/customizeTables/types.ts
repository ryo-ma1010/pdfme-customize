import {
  // CellStyle as ParentCellStyle,
  // Styles as ParentStyles,
  TableSchema as ParentTableSchema,
} from "../tables/types";

// export interface CellStyle extends ParentCellStyle
// {
//   displayHeaderNames?: { [key: string]: string };
// }

// export interface Styles extends ParentStyles
// {
//   displayHeaderNames: {[key: string]: string};
// }

export interface CustomizeTableSchema extends ParentTableSchema
{
  headStyles: ParentTableSchema['headStyles'] & {displayHeaderNames?: { [key: string]: string }};
}