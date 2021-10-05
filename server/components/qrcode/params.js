/* @flow */
import url from 'url';
import { ENV, DEFAULT_COUNTRY, COUNTRY_LANGS } from '@paypal/sdk-constants';

import type { ExpressRequest, ExpressResponse, LocaleType } from '../../types';
import { getCSPNonce } from '../../lib';

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
    clientID : string,
|};

function getClientIDFromQRPath(qrPath: string) {
    const query = url.parse(qrPath, true).query
    return query.clientID;
}

export function getParams(params : ParamsType, req : ExpressRequest, res : ExpressResponse) : RequestParams {
    const {
        env,
        qrPath,
        demo,
        locale = {},
        debug = false
    } = params;

    const {
        country = DEFAULT_COUNTRY,
        lang = COUNTRY_LANGS[country][0]
    } = locale;
    
    const cspNonce = getCSPNonce(res);
    const clientID = getClientIDFromQRPath(qrPath);

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
