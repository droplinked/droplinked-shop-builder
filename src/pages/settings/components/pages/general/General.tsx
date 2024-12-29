import * as React from "react";
import { Link } from "react-router-dom";
import AppIcons from "assest/icon/Appicons";
import SectionContainer from "../../SectionContainer";
import SectionContent from "../../SectionContent";
import Input from "components/redesign/input/Input";
import AlertProduct from "pages/product/single/parts/modules/alert/AlertProduct";

function General() {
    return (
        <SectionContainer
            title="Store Details"
            badge={<div style={{ background: "red" }}>Premium</div>}
            description="Add or remove team members by entering their email addresses. An invite with the required instructions to join the account will be sent."
            rightContent={
                <Link to={"#"}>
                    <AppIcons.AddIcon style={{ width: "1rem", height: "1rem" }} /> New User
                </Link>
            }
        >
            <SectionContent badge={<div style={{ background: "red" }}>Premium</div>} rightContent={<Input inputProps={{ placeholder: "Alireza Shop" }} />} title="Shop Name" description="Enter the store’s name that will appear on the landing page." >
                <AlertProduct text="Hiiii" />
            </SectionContent>
        </SectionContainer>
    );
}

export default General;
