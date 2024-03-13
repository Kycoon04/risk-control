export interface QueryOptions {
    offset?: number;
    limit?: number;
    orderBy?: string;
    order?: "asc" | "desc";
    filterBy?: string;
    filterValue?: string;
    filterCondition?:
    "lt"
    | "lte"
    | "gt"
    | "gte"
    | "content"
    | "startsWith"
    | "endsWith"
    | "equals"
    | "not"
    | "in"
    | "notIn"
    | "contains"
    | "notContains"
    | "like";
}