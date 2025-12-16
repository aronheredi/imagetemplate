import { FabricObject } from 'fabric';
declare module 'fabric' {
    interface FabricObject {
        name?: string;
        id?: string;
    }
}

FabricObject.customProperties = ['name', 'id'];