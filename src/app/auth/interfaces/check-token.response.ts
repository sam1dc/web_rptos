export interface CheckTokenResponse{
    email_user:      string;
    distid:          string;
    role:            number;
    token:           string;
    additional_data: AdditionalData;
}

export interface AdditionalData {
    nombre:          string;
    apellido:        string;
    cedula:          string;
    fechaNacimiento: Date;
}