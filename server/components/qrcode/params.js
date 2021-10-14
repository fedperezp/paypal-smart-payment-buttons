/* @flow */

import { ENV, DEFAULT_COUNTRY, COUNTRY_LANGS } from '@paypal/sdk-constants';

import type { ExpressRequest, ExpressResponse, LocaleType } from '../../types';
import { getCSPNonce } from '../../lib';

import { QR_VARIANT, VENMO_DESKTOP_EXP } from './constants';

type ParamsType = {|
    env : $Values<typeof ENV>,
    qrPath : string,
    demo? : boolean,
    locale? : LocaleType,
    debug? : boolean,
    clientID : string
|};

type RequestParams = {|
    env : $Values<typeof ENV>,
    cspNonce : string,
    qrPath : string,
    demo : boolean,
    locale : LocaleType,
    debug : boolean,
    clientID : string
|};

export function getQRVariant(experiment : $Values<typeof VENMO_DESKTOP_EXP>) : string {
    return QR_VARIANT[experiment];
}

export function getParams(params : ParamsType, req : ExpressRequest, res : ExpressResponse) : RequestParams {
    const {
        env,
        qrPath,
        demo,
        locale = {},
        debug = false,
        clientID
    } = params;

    const {
        country = DEFAULT_COUNTRY,
        lang = COUNTRY_LANGS[country][0]
    } = locale;
    
    const cspNonce = getCSPNonce(res);

    return {
        env,
        cspNonce,
        qrPath,
        demo:   Boolean(demo),
        debug:  Boolean(debug),
        locale: { country, lang },
        clientID
    };
}
