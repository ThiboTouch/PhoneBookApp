export interface Patch {
    op: string;
    path: string;
    value: any;
}

export class PatchRequest {
    Request: Patch[];
}