import {
  TableSchema as ParentTableSchema,
} from "../tables/types.js";

export interface CustomizeTableSchema extends ParentTableSchema
{
  headStyles: ParentTableSchema['headStyles'] & {displayHeaderNames?: { [key: string]: string }};
}