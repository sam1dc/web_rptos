export interface NotaReponse {
    ok:       boolean;
    detalles: DetallesNota;
}

export interface DetallesNota {
    peso:           string;
    alto:           string;
    ancho:          string;
    largo:          string;
    precioEstimado: string;
    nota:           string;
}