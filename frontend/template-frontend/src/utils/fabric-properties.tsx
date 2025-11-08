import { FabricObject } from "fabric";
declare module "fabric" {
    interface FabricObject {
        name: string;
    }
}

FabricObject.customProperties = ['name'];