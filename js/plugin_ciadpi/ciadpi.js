import { util } from "../common/util.js"
import { commomClass } from "../common/common.js"
import { TR } from "../common/translate.js"

class ciadpiClass {
    constructor() {
        this.sharedStorage = {}
        this.defaultSharedStorage = {}
        this.common = new commomClass()
    }

    _initDefaultSharedStorage() {
        // start of default keys
        this.defaultSharedStorage.jsVersion = 1
        this.defaultSharedStorage.name = ""
        this.defaultSharedStorage.serverAddress = "127.0.0.1"
        this.defaultSharedStorage.serverPort = "1080"
        // end of default keys
        
        this.defaultSharedStorage.desyncManual = false
        this.defaultSharedStorage.desyncCommand = "--disorder 3 --auto --tlsrec 1+s"
        this.defaultSharedStorage.disableIPv6 = false
        this.defaultSharedStorage.disableUDP = false
        this.defaultSharedStorage.customTTL = ""
        
        this.defaultSharedStorage.desyncMethod = "disorder"
        this.defaultSharedStorage.desyncSplitPos = "3" 
        this.defaultSharedStorage.desyncSplitSNI = false
        this.defaultSharedStorage.desyncSplitEnd = false
        
        this.defaultSharedStorage.desyncFakeTTL = "5"
        this.defaultSharedStorage.desyncFakeData = ""
        this.defaultSharedStorage.desyncOOBData = ""
        
        this.defaultSharedStorage.desyncTLSRec = ""
        this.defaultSharedStorage.desyncTLSRecSNI = false
        
        this.defaultSharedStorage.desyncHTTPCase = false
        this.defaultSharedStorage.desyncHTTPRmSpace = false
        
        this.defaultSharedStorage.blacklist = false
        this.defaultSharedStorage.excludeHosts = ""
        this.defaultSharedStorage.excludeProtocol = false
        this.defaultSharedStorage.excludeTrigger = ""
        this.defaultSharedStorage.excludeTriggerCanc = false
        this.defaultSharedStorage.timeout = ""

        for (var k in this.defaultSharedStorage) {
            let v = this.defaultSharedStorage[k]
            this.common._setType(k, typeof v)

            if (!this.sharedStorage.hasOwnProperty(k)) {
                this.sharedStorage[k] = v
            }
        }

    }

    _onSharedStorageUpdated() {
        // not null
        for (var k in this.sharedStorage) {
            if (this.sharedStorage[k] == null) {
                this.sharedStorage[k] = ""
            }
        }
        this._setShareLink()
    }

    _setShareLink() { }

    // UI Interface

    requirePreferenceScreenConfig() {
        let sb = [
            {
                "title": TR("proxySettings"),
                "preferences": [
                    {
                        "type": "SwitchPreference",
                        "key": "desyncManual",
                        "icon": "ic_baseline_fingerprint_24",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "desyncCommand",
                        "icon": "ic_maps_directions_boat",    
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "disableIPv6",
                        "icon": "ic_baseline_texture_24",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "customTTL",
                        "icon": "ic_baseline_compare_arrows_24",
                        "EditTextPreferenceModifiers": "Port",
                    },
                ],
            },
            {
                "title": TR("desyncSettings"),
                "preferences": [
                    {
                        "type": "SimpleMenuPreference",
                        "key": "desyncMethod",
                        "icon": "ic_hardware_router",
                        "entries": {
                            "": "none",
                            "split": "split",
                            "disorder": "disorder",
                            "fake": "fake",
                            "oob": "oob",
                        },
                        //"summary": this.sharedStorage.desyncMethod,
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "desyncSplitPos",
                        "icon": "ic_baseline_layers_24",
                        "EditTextPreferenceModifiers": "Port",
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "desyncSplitEnd",
                        "icon": "baseline_wrap_text_24",
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "desyncSplitSNI",
                        "icon": "ic_baseline_add_road_24",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "desyncFakeTTL",
                        "icon": "ic_baseline_compare_arrows_24",
                        "EditTextPreferenceModifiers": "Port",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "desyncFakeData",
                        "icon": "ic_maps_directions_boat",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "desyncOOBData",
                    },
                ],
            },
            {
                "title": TR("packetSettings"),
                "preferences": [
                    {
                        "type": "EditTextPreference",
                        "key": "desyncTLSRec",
                        "icon": "ic_baseline_layers_24",
                        "EditTextPreferenceModifiers": "Port",
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "desyncTLSRecSNI",
                        "icon": "ic_baseline_add_road_24",
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "desyncHTTPCase",
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "desyncHTTPRmSpace",
                    }
                ]
            },
            {
                "title": TR("excludeSettings"),
                "preferences": [
                    {
                        "type": "SwitchPreference",
                        "key": "blacklist",
                        "icon": "ic_baseline_add_road_24",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "excludeHosts",
                        "icon": "ic_baseline_layers_24",
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "excludeProtocol",
                        "icon": "ic_baseline_legend_toggle_24",
                    },
                    {
                        "type": "SimpleMenuPreference",
                        "key": "excludeTrigger",
                        "icon": "ic_hardware_router",
                        "entries": {
                            "": "none",
                            "torst": "timeout_rst",
                            "redirect": "redirect_http",
                            "sid_inv": "sessionid_invalid",
                            "alert": "alert_tls",
                            "cl_err": "client_http_error",
                        },
                    },
                    {
                        "type": "SwitchPreference",
                        "key": "excludeTriggerCanc",
                        "icon": "ic_baseline_compare_arrows_24",
                    },
                    {
                        "type": "EditTextPreference",
                        "key": "timeout",
                        "icon": "ic_baseline_timelapse_24",
                        "EditTextPreferenceModifiers": "Port",
                    },
                ]
            }
        ]
        this.common._applyTranslateToPreferenceScreenConfig(sb, TR)
        return JSON.stringify(sb)
    }

    // 开启设置界面时调用
    setSharedStorage(b64Str) {
        this.sharedStorage = util.decodeB64Str(b64Str)
        this._initDefaultSharedStorage()
    }

    // 开启设置界面时调用
    requireSetProfileCache() {
        for (var k in this.defaultSharedStorage) {
            this.common.setKV(k, this.sharedStorage[k])
        }
    }

    // 设置界面创建后调用
    onPreferenceCreated() {
        let this2 = this

        function listenOnPreferenceChangedNow(key) {
            neko.listenOnPreferenceChanged(key)
            this2._onPreferenceChanged(key, this2.sharedStorage[key])
        }
        
        listenOnPreferenceChangedNow("desyncManual")
        listenOnPreferenceChangedNow("desyncMethod")
        listenOnPreferenceChangedNow("blacklist")
        listenOnPreferenceChangedNow("excludeTrigger")
    }

    // 保存时调用（混合编辑后的值）
    sharedStorageFromProfileCache() {
        for (var k in this.defaultSharedStorage) {
            this.sharedStorage[k] = this.common.getKV(k)
        }
        this._onSharedStorageUpdated()
        return JSON.stringify(this.sharedStorage)
    }

    //
    
    onPreferenceChanged(b64Str) {
        let args = util.decodeB64Str(b64Str)
        this._onPreferenceChanged(args.key, args.newValue)
    }

    _onPreferenceChanged(key, newValue) {
        if (key == "desyncMethod") {
            neko.setPreferenceTitle("desyncMethod", 
                TR("desyncMethod") + (newValue ? ":  " : "") + newValue)
        }
        if (key == "blacklist") {
            neko.setPreferenceTitle("blacklist", 
                TR("mode") + ": " + (newValue ? TR("blacklist") : TR("whitelist")))
        }
        if (key == "excludeTrigger") {
            neko.setPreferenceTitle("excludeTrigger", 
                TR("excludeTrigger") + (newValue ? ":  " : "") + newValue)
        }
        if (key == "desyncManual") {
            neko.setPreferenceVisibility("desyncCommand", newValue)
            
            const keys = ["desyncMethod", "disableUDP", "disableIPv6",
                "customTTL", "desyncSplitPos", "desyncSplitSNI", "desyncSplitEnd",
                "desyncFakeTTL", "desyncFakeData", "desyncOOBData", "desyncTLSRec",
                "desyncTLSRecSNI",  "desyncHTTPCase", "desyncHTTPRmSpace",
                "blacklist", "excludeHosts", "excludeProtocol", 
                "excludeTrigger", "excludeTriggerCanc", "timeout"]
            for (const k of keys) {    
                neko.setPreferenceVisibility(k, !newValue)
            }
        }
    }
    
    // Interface

    parseShareLink(b64Str) { }

    buildAllConfig(b64Str) {
        try {
            let args = util.decodeB64Str(b64Str)
            let ss = util.decodeB64Str(args.sharedStorage)

            let v = {}
            let cmd = ["%exe%", "--protect-path", "protect_path",
                "--ip", "127.0.0.1", "--port", "" + args.port, "--debug=2"];
            
            if  (ss.desyncManual) {
                cmd = cmd.concat(ss.desyncCommand.split(" "))
            }
            else {
                if (ss.disableIPv6) cmd.push("--no-ipv6")
                if (ss.disableUDP) cmd.push("--no-udp")
                
                if (ss.customTTL != "") {
                    cmd.push("--def-ttl=" + s.customTTL)
                }
                
                if (ss.excludeProtocol) {
                    cmd.push("--proto=tls,http")
                }
                if (ss.excludeTrigger != "" && !ss.excludeTriggerCanc) {
                    cmd.push("--auto=" + ss.excludeTrigger)
                }
                if (ss.excludeHosts != "") {
                    cmd.push("--hosts=:" + ss.excludeHosts)
                    if (ss.blacklist) cmd.push("--auto=none")
                }
                if (ss.timeout != "") {
                    cmd.push("--timeout=" + ss.timeout)
                }
                
                if (ss.desyncMethod != "") {
                    cmd.push("--" + ss.desyncMethod)
                    cmd.push((ss.desyncSplitEnd ? "-" : "") + (
                        ss.desyncSplitPos + (ss.desyncSplitSNI ? "+s" : "")))
                }
                if (ss.desyncFakeTTL != "") {
                    cmd.push("--ttl=" + ss.desyncFakeTTL)
                }
                if (ss.desyncFakeData != "") {
                    cmd.push("--fake-data=" + ":" + ss.desyncFakeData)
                }
                if (ss.desyncOOBData != "") {
                    cmd.push("--oob-data=" + ":" + ss.desyncOOBData)
                }
                if (ss.desyncTLSRec != "") {
                    cmd.push("--tlsrec")
                    cmd.push(ss.desyncTLSRec + (ss.desyncTLSRecSNI ? "+s" : ""))
                }
                if (ss.desyncHTTPCase || ss.desyncHTTPRmSpace) {
                    cmd.push("--mod-http");
                    cmd.push((ss.desyncHTTPCase ? "h,d" : "") + (
                        ss.desyncHTTPRmSpace ? (ss.desyncHTTPCase ? ",r" : "r") : ""))
                }
                if (ss.excludeTrigger != "" && ss.excludeTriggerCanc) {
                    cmd.push("--auto=" + ss.excludeTrigger)
                }
            }
            v.nekoCommands = cmd;

            return JSON.stringify(v)
        }
        catch (error) {
            neko.logError(error.toString())
        }
    }
}

export const ciadpi = new ciadpiClass()
