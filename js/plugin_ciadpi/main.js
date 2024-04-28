import { util } from "../common/util.js";
import { LANG, LANG_TR } from "../common/translate.js";

import { ciadpi } from "./ciadpi.js";

// Init

export function nekoInit(b64Str) {
  let args = util.decodeB64Str(b64Str);

  LANG = args.lang;

  let plgConfig = {
    ok: true,
    reason: "",
    minVersion: 2,
    protocols: [
      {
        protocolId: "ByeDPI",
        links: [],
        haveStandardLink: false,
        canShare: true,
        canMux: false,
        canMapping: false,
        canTCPing: false,
        canICMPing: false,
        needBypassRootUid: true,
      }
    ],
  };
  return JSON.stringify(plgConfig);
}

export function nekoProtocol(protocolId) {
  if (protocolId == "ByeDPI") {
    return ciadpi;
  }
}

export function nekoAbout() {
  return "Local SOCKS proxy server to bypass DPI"
}

// export interface to browser
global_export("nekoInit", nekoInit)
global_export("nekoProtocol", nekoProtocol)
global_export("nekoAbout", nekoAbout)
