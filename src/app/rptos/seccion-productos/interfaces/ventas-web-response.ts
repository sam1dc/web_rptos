import { FormasDePago } from "./models/formas_de_pago";
import { TiendasEnWeb } from "./models/tiendas_web";
import { UsuariosWeb } from "./models/usuarios_web";

export interface VentasWebResponse {
    ok:     boolean;
    ventas: Venta[];
}

export interface Venta {
    id:                    number;
    fecha_venta:           Date;
    nombre_cliente:        string;
    usuarios_mercadolibre: UsuariosWeb;
    tiendas_web:           TiendasEnWeb;
    formas_de_pago:        FormasDePago;
}

