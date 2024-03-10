import { Ubicacion } from "./models/ubicaciones";

export interface UbicacionesResponse {
    ok:          boolean;
    ubicaciones: Ubicacion[];
}