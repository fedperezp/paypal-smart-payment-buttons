/* @flow */

export const VENMO_BLUE : string = '#3D93CE';
export const EVENT : {| RENDER : string, ERROR : string |} = {
    RENDER: 'qrcode_render',
    ERROR:  'qrcode_error'
};
export const VENMO_DESKTOP_EXP : {| VENMO_DESKTOP_CTRL : string, VENMO_DESKTOP_TRMT : string |} = {
    VENMO_DESKTOP_CTRL: 'Ctrl_Venmo_QR_Code',
    VENMO_DESKTOP_TRMT: 'Trmt_Venmo_QR_Code'
};

export const QR_VARIANT : { [key : $Values<typeof VENMO_DESKTOP_EXP>] : string } = {
    Trmt_Venmo_QR_Code: 'dark',
    Ctrl_Venmo_QR_Code: 'light'
};
