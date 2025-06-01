import "../terms-page/TermsPage-style.scss";
import { Link } from "react-router-dom";
import arLocale from "locales/public-pages/privacy-page/ar.json";
import enLocale from "locales/public-pages/privacy-page/en.json";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React from "react";

export default function PrivacyPage() {
  const { t } = useLocaleResources("privacyPage", {
    ar: arLocale,
    en: enLocale,
  });

  return (
    <div className="terms-wrap">
      <div className="terms-body">
        <div className="terms-title">
          <p>{t("privacyPageTitle")}</p>
        </div>
        <div className="terms-text">
          <p> {t("termsTextPart1")} </p>
          <p> {t("termsTextPart2")} </p>
          <p>
            <span>{t("agreementPart.title")}</span>
            <br /> {t("agreementPart.descriptionPart1")}{" "}
          </p>
          <p> {t("agreementPart.descriptionPart2")} </p>
          <p>
            {" "}
            {t("agreementPart.descriptionPart3")}
            <br />
            {t("agreementPart.descriptionPart4")}{" "}
          </p>
          <p>
            <span>{t("effectiveDate.title")}</span>
            <br />
            {t("effectiveDate.description")}{" "}
          </p>
          <p>
            <span>{t("whatWeCollect.title")}</span>
            <br />
            {t("whatWeCollect.descriptionPart1")}
          </p>
          <p> {t("whatWeCollect.descriptionPart2")} </p>
          <p>
            <span>{t("infoYouGiveUs.title")}</span>
            <br /> {t("infoYouGiveUs.description1")}{" "}
          </p>
          <p> {t("infoYouGiveUs.description2")} </p>
          <p> {t("infoYouGiveUs.description3")} </p>
          <p>
            <span>{t("infoCollectedOnSiteMobileApps.title")}</span>
            <br /> {t("infoCollectedOnSiteMobileApps.description1")}{" "}
          </p>
          <p> {t("infoCollectedOnSiteMobileApps.description2")} </p>
          <p> {t("infoCollectedOnSiteMobileApps.description3")} </p>
          <p>
            <span>{t("infoCollectedElsewhere.title")}</span>
            <br /> {t("infoCollectedElsewhere.description")}{" "}
          </p>
          <p>
            <span>{t("howWeCollectInfo.title")}</span>
            <br /> {t("howWeCollectInfo.description1")}{" "}
          </p>
          <p> {t("howWeCollectInfo.description2")} </p>
          <p> {t("howWeCollectInfo.description3")} </p>
          <p> {t("howWeCollectInfo.description4")} </p>
          <p>
            <span>{t("howWeUseInfo.title")}</span>
            <br /> {t("howWeUseInfo.mainDescription")}{" "}
          </p>
          <p> {t("howWeUseInfo.use1")} </p>
          <p> {t("howWeUseInfo.use2")} </p>
          <p> {t("howWeUseInfo.use3")} </p>
          <p> {t("howWeUseInfo.use4")} </p>
          <p> {t("howWeUseInfo.use5")} </p>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {t("howWeUseInfo.additionalUses")}{" "}
          </p>
          <p>
            <span>{t("disclosureReasons.title")}</span>
            <br />
            {t("disclosureReasons.reasons", { returnObjects: true })[0]}
            <br />
            {t("disclosureReasons.reasons", { returnObjects: true })[1]}
            <br />
            {t("disclosureReasons.reasons", { returnObjects: true })[2]}
            <br />
            {t("disclosureReasons.reasons", { returnObjects: true })[3]}
            <br />
            {t("disclosureReasons.reasons", { returnObjects: true })[4]}
            <br />
            {t("thirdParties.title")}
            <br />
            {t("thirdParties.description1")}
          </p>
          <p> {t("thirdParties.description2")} </p>
          <p> {t("thirdParties.description3")} </p>
          <p> {t("thirdParties.description4")} </p>
          <p> {t("thirdParties.description5")} </p>
          <p>
            <span>{t("infoProtection.title")}</span>
            <br />
            {t("infoProtection.description")}
          </p>
          <p>
            <span>{t("riskOfInterceptions.title")} </span>
            {t("riskOfInterceptions.description")}
            <br />
            {t("dataModification.title")}
            <br />
            {t("dataModification.description")}
          </p>
          <p>
            <span>{t("ageRequirement.title")}</span>
            <br />
            {t("ageRequirement.description")}
          </p>
          <p>
            <span>{t("retentionAndLegal.title")}</span>
            <br />
            {t("retentionAndLegal.description")}
          </p>
          <p>
            <span>{t("securityPractices.title")}</span>
            <br />
            {t("securityPractices.description")}
          </p>
          <p>
            {" "}
            {t("securityPractices.practices", { returnObjects: true }).map(
              (practice, index) => (
                <React.Fragment key={index}>
                  {practice}
                  <br />
                </React.Fragment>
              )
            )}
            {t("globalReality.title")}
            <br />
            {t("globalReality.description")}
          </p>
          <p> {t("californiaLaw.description")} </p>
          <p>
            <span>{t("contactInfo.title")}</span>
            <br />
            {t("contactInfo.mainDescription")}
          </p>
          <p>
            {" "}
            {t("contactInfo.additionalInfo")}
            <br />
            {t("contactInfo.postalAddress")}
            <br />
            {t("contactInfo.email")}
          </p>
          <Link to="/terms">
            <button className="terms-btn">
              <p>{t("contactInfo.termsButtonText")}</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
