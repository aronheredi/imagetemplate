export type QueryObjectType =
    'number'
    | 'string'
    | 'boolean'
    | 'color';
type valueTypeMap = {
    'number': number;
    'string': string;
    'boolean': boolean;
    'color': string;
}
export type QueryProperty = {
    key: string
    label: string
    type: QueryObjectType
    value?: valueTypeMap[QueryObjectType]
}