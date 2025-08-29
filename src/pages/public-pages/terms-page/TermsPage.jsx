import "./TermsPage-style.scss";
import { Link } from "react-router-dom";
import arLocale from "locales/public-pages/terms-page/ar.json";
import enLocale from "locales/public-pages/terms-page/en.json";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";

export function meta() {
  return [
    { title: "Terms of Service | Droplinked" },
    {
      name: "description",
      content:
        "Please read the Droplinked Terms of Service carefully. This agreement governs your use of the Droplinked platform and services.",
    },
    {
      name: "keywords",
      content: "terms of service, terms and conditions, user agreement, legal, service policy, rules",
    },
    {
      property: "og:title",
      content: "Terms of Service | Droplinked",
    },
    {
      property: "og:description",
      content:
        "Please read the Droplinked Terms of Service carefully. This agreement governs your use of the Droplinked platform and services.",
    },
  ];
}

function TermsPage() {
  const { t } = useLocaleResources("termsPage", {
    ar: arLocale,
    en: enLocale,
  });

  return (
    <div className="terms-wrap">
      <div className="terms-body">
        <div className="terms-title">
          <p>{t("title")}</p>{" "}
        </div>
        <div className="terms-text">
          <p>{t("intro.paragraph1")}</p>
          <p>{t("intro.paragraph2")}</p>
          <p>{t("intro.paragraph3")}</p>
          <p>{t("intro.paragraph4")}</p>
          <p>{t("intro.paragraph5")}</p>
          <p>
            <span>{t("notice.title")}</span>
            {t("notice.description")}
          </p>
          <p>
            <span>{t("bindingEffect.title")}</span>
            {t("bindingEffect.description")}
          </p>
          <p>
            <span>{t("accessingServices.title")}</span>
            {t("accessingServices.description")}
          </p>
          <p>{t("reverseEngineering")}</p>
          <p>{t("updatesAndRequirements")}</p>
          <p>
            <span>{t("yourCard.title")}</span>
            {t("yourCard.description")}
          </p>
          <p>{t("thirdPartyInfo")}</p>
          <p>{t("scopeOfService")}</p>
          <p>
            <span>{t("noAdvice.title")}</span>
            {t("noAdvice.description")}
          </p>
          <p>{t("accuracyDisclaimer")}</p>
          <p>{t("reportErrors")}</p>
          <p>{t("thirdPartyIntegration")}</p>
          <p>{t("notMoneyTransmitter")}</p>
          <p>
            <span>{t("rightsGrant.title")}</span>
          </p>
          <p>{t("rightsGrant.paragraph1")}</p>
          <p>{t("rightsGrant.paragraph2")}</p>
          <p>{t("rightsGrant.paragraph3")}</p>
          <p>{t("rightsGrant.paragraph4")}</p>
          <p>
            <span>{t("useSection.title")}</span>
            {t("useSection.paragraph1")}
          </p>
          <p>{t("useSection.paragraph2")}</p>
          <p>{t("useSection.paragraph3")}</p>
          <p>{t("useSection.paragraph4")}</p>
          <p>
            <span>{t("accountSecurity.title")}</span>
            {t("accountSecurity.description")}
          </p>
          <p>{t("innovationAndPartners")}</p>
          <p>
            <span>{t("mobileAlerts.title")}</span>
            {t("mobileAlerts.description")}
          </p>
          <p>
            <span>{t("privacyPolicySection.title")}</span>
            {t("privacyPolicySection.description")}
          </p>
          <p>
            <span>{t("regionalConcerns.title")}</span>
            {t("regionalConcerns.description")}
          </p>
          <p>{t("regionalConcerns.access")}</p>
          <p>{t("regionalConcerns.embargo")}</p>
          <p>{t("regionalConcerns.changes")}</p>
          <p>
            <span>{t("appleSection.title")}</span>
            {t("appleSection.intro")}
          </p>
          <p>
            <span>{t("appleSection.acknowledgementTitle")}</span>
            {t("appleSection.acknowledgement")}
          </p>
          <p>{t("appleSection.maintenance")}</p>
          <p>{t("appleSection.warranty")}</p>
          <p>{t("appleSection.productClaims")}</p>
          <p>{t("appleSection.ipRights")}</p>
          <p>{t("appleSection.developer")}</p>
          <p>{t("appleSection.thirdPartyBeneficiary")}</p>
          <p>{t("appleSection.performance")}</p>
          <p>{t("appleSection.socialMedia")}</p>
          <p>{t("appleSection.consumerRights")}</p>
          <p>{t("appleSection.complaints")}</p>

          <p>
            <span>{t("limitationOfLiability.title")}</span>
          </p>
          <p>{t("limitationOfLiability.description")}</p>
          <p>{t("limitationOfLiability.reliance")}</p>
          <p>
            <span>{t("limitedWarranty.title")}</span>
          </p>
          <p>{t("limitedWarranty.description")}</p>
          <p>
            <span>{t("governingLaw.title")}</span>
            {t("governingLaw.description")}
            <br />
            {t("governingLaw.thirdPartySites")}
          </p>
          <p>{t("governingLaw.merchantInfo")}</p>
          <p>
            <span>{t("promotionCodes.title")}</span>
            {t("promotionCodes.description")}
          </p>
          <p>
            <span>{t("modifications.title")}</span>
            {t("modifications.description")}
          </p>
          <p>
            <span>{t("dmca.title")}</span>
          </p>
          <p>
            {t("dmca.intro")}
            <br />
            {t("dmca.point1")}
          </p>
          <p>{t("dmca.point2")}</p>
          <p>{t("dmca.point3")}</p>
          <p>{t("dmca.point4")}</p>
          <p>{t("dmca.point5")}</p>
          <p>{t("dmca.point6")}</p>
          <p>
            <br />
            {t("contactInfo")}
          </p>
          <p>{t("inappropriateContent")}</p>
          <p>{t("prohibitedUses")}</p>
          <p>{t("networkConduct")}</p>
          <p>{t("indemnity")}</p>
          <p>{t("terminationCard")}</p>
          <p>{t("deleteCard")}</p>
          <p>{t("severabilityWaiver")}</p>
          <p>{t("acknowledgement")}</p>
          <Link to="/privacy">
            <button className="terms-btn">
              <p>{t("privacyPolicyBtn")}</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
