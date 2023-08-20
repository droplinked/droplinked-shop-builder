export class PFDesignMaker {
    par
    iframeNode;
    loadingNode;
    allLoaded = !1;
    messageListenerBinded;
    e = "/embedded-designer";
    s = "https://www.printful.com";
    t = {
        SET_PRODUCT: "setProduct",
        SAVE_DESIGN: "saveDesign",
        LOAD_TEMPLATE: "loadTemplate",
        SET_STYLE: "setStyle",
        SET_FEATURE_CONFIG: "setFeatureConfig",
        SET_DISABLED_PLACEMENTS: "setDisabledPlacements",
        SET_PRESELECTED_COLORS: "setPreselectedColors",
        SET_PRESELECTED_SIZES: "setPreselectedSizes",
        SET_DISABLED_COLORS: "setDisabledColors",
        SET_DISABLED_SIZES: "setDisabledSizes",
        SET_URL_IMAGE_LAYER: "setUrlImageLayer",
        INVALID_ORIGIN: "invalidOrigin",
        IFRAME_LOADED: "iframeLoaded",
        DESIGNER_LOADED: "designerLoaded",
        DESIGN_STATUS: "designStatus",
        RPC_ERROR: "rpcError",
    };
    i = "OK";
    a = "Failed";
    constructor(e) {
        (this.par = e),
            this.par.origin || (this.par.origin = this.s),
            (this.par.featureConfig = Object.assign(
                { clipart_layers: !0, file_layers: !0, text_layers: !0, embroidery_3d_puff: !0, has_color_group_inside_labels: !1, sub_technique_switcher: !1, has_external_user_file_library: !1, new_layout: !1 },
                this.par.featureConfig ?? {}
            )),
            (this.par.preselectedColors = this.par.preselectedColors || []),
            (this.par.preselectedSizes = this.par.preselectedSizes || []),
            this.par.debug && (this.par.debug = 1),
            this.r(() => {
                this.E(), this.d(), this.n();
            });
    }
    sendMessage(e) {
        this.par?.debug && console.log("sendMessage", e), (this.allLoaded = !1), this.showHideLoading(), this.iframeNode.contentWindow?.postMessage(e, this.par.origin);
    }
    removeEventListeners() {
        this.messageListenerBinded && window.removeEventListener("message", this.messageListenerBinded, !1);
    }
    r(e) {
        "complete" === document.readyState || "interactive" === document.readyState ? setTimeout(e, 1) : document.addEventListener("DOMContentLoaded", e);
    }
    d() {
        (this.messageListenerBinded = this.messageListener.bind(this)), window.addEventListener("message", this.messageListenerBinded, !1);
    }
    messageListener(e) {
        if ((console.log("messageListener", e.data.event), e.origin === this.par.origin))
            switch (((this.allLoaded = !0), this.showHideLoading(), e.data.event)) {
                case this.t.IFRAME_LOADED + this.i:
                    this.par.disabledPlacements?.length && this.sendMessage({ event: this.t.SET_DISABLED_PLACEMENTS, disabledPlacements: this.par.disabledPlacements }),
                        this.sendMessage({ event: this.t.SET_STYLE, style: this.par.style }),
                        this.sendMessage({ event: this.t.SET_FEATURE_CONFIG, featureConfig: this.par.featureConfig }),
                        this.par.preselectedColors?.length && this.sendMessage({ event: this.t.SET_PRESELECTED_COLORS, preselectedColors: this.par.preselectedColors }),
                        this.par.preselectedSizes?.length && this.sendMessage({ event: this.t.SET_PRESELECTED_SIZES, preselectedSizes: this.par.preselectedSizes }),
                        this.par.disabledColors?.length && this.sendMessage({ event: this.t.SET_DISABLED_COLORS, disabledColors: this.par.disabledColors }),
                        this.par.disabledSizes?.length && this.sendMessage({ event: this.t.SET_DISABLED_SIZES, disabledSizes: this.par.disabledSizes }),
                        this.par.initProduct ? this.sendMessage({ event: this.t.SET_PRODUCT, ...this.par.initProduct }) : this.sendMessage({ event: this.t.LOAD_TEMPLATE }),
                        this.par.onIframeLoaded && this.par.onIframeLoaded();
                    break;
                case this.t.DESIGNER_LOADED + this.i:
                    this.par.onProductChanged && e.data.productId && this.par.onProductChanged(e.data.productId);
                    break;
                case this.t.SAVE_DESIGN + this.i:
                    const s = e.data?.data?.response?.template?.id;
                    this.par.onTemplateSaved && s && this.par.onTemplateSaved(s);
                    break;
                case this.t.RPC_ERROR:
                    console.error("RPC ERROR", e.data), this.o(e);
                    break;
                case this.t.SET_STYLE + this.i:
                    console.log("styleChanged");
                    break;
                case this.t.INVALID_ORIGIN:
                    console.error("invalid origin", e.data), this.o(e);
                    break;
                case this.t.DESIGN_STATUS:
                    this.par.onDesignStatusUpdate && this.par.onDesignStatusUpdate(e.data?.data?.response);
                    break;
                case this.t.SET_PRODUCT + this.i:
                    this.par.applyImageFromUrl && this.sendMessage({ event: this.t.SET_URL_IMAGE_LAYER, imageUrl: this.par.applyImageFromUrl });
            }
        else console.error("Incorrect event origin - does not match the expected origin", e.origin, this.par.origin);
    }
    o(e) {
        this.par.onError && this.par.onError(e.data?.data?.response || e.data);
    }
    n() {
        this.iframeNode = document.createElement("iframe");
        const e = this.S();
        this.iframeNode.setAttribute("src", e),
            this.iframeNode.setAttribute("id", "design-maker-embed"),
            this.par.iframeClassName && this.iframeNode.setAttribute("class", this.par.iframeClassName),
            document.getElementById(this.par.elemId).appendChild(this.iframeNode);
    }
    S() {
        const e = [
            { urlKey: "nonce", parKey: "nonce" },
            { urlKey: "debug", parKey: "debug" },
        ];
        let s = this.par.origin + this.e;
        for (let t = 0; t < e.length; t++) {
            const i = this.par[e[t].parKey];
            i && ((s += 0 === t ? "?" : "&"), (s += e[t].urlKey + "=" + i));
        }
        return console.info(s), s;
    }
    E() {
        const e = document.createElement("span");
        e.setAttribute("class", "spinner");
        const s = document.createElement("div");
        s.setAttribute("class", "overlay__content"), s.appendChild(e);
        const t = document.createElement("div");
        t.setAttribute("class", "overlay__inner"),
            t.appendChild(s),
            (this.loadingNode = document.createElement("div")),
            this.loadingNode.setAttribute("class", "overlay"),
            this.loadingNode.appendChild(t),
            document.getElementById(this.par.elemId).appendChild(this.loadingNode),
            this.allLoaded || this.showHideLoading();
    }
    showHideLoading(e) {
        this.allLoaded
            ? (this.loadingNode.style.display = "none")
            : e
                ? (this.loadingNode.style.display = "block")
                : setTimeout(() => {
                    this.showHideLoading(!0);
                }, 200);
    }
};
