import React from "react";
import Card from "react-credit-cards";
import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";
import { CardInput } from "./CreditCard-style";
import "react-credit-cards/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./creditcard-utils";
import { Box, Flex } from "@chakra-ui/react";

export default class CreditCard extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
    let firstName = formData.name.substring(0, formData.name.indexOf(" "));
    let lastName = formData.name.substring(formData.name.indexOf(" ") + 1);

    let month = formData.expiry.substring(0, formData.expiry.indexOf("/"));
    let year = formData.expiry.substring(formData.expiry.indexOf("/") + 1);

    let cardData = {
      number: formData.number.replace(/\s/g, ""),
      first_name: firstName,
      last_name: lastName,
      month: month,
      year: year,
      verification_value: formData.cvc,
    };

    this.props.setCard(cardData);
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    return (
      <div id="PaymentForm">
        {/* <Flex flexDir={{ base: "column", md: "row" }}> */}
        {/* <Flex justifyContent='center' alignItem='center' w='45%' h='100%'> */}
        {/* <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          /> */}
        {/* </Flex> */}
        {/* <Box mb="30px"></Box> */}
        <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            py="40px"
            px={{ base: "20px", md: "20px", lg: "60px" }}
            bgColor="#242424"
            borderRadius="8px"
            mb="20px"
          >
            <Box
              w={{ base: "100%", md: "50%" }}
              // mb={{ base: "30px", md: "30px" }}
              overflow="hidden"
              mb="20px"
            >
              <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={this.handleCallback}
              />
            </Box>
            <Box w={{ base: "100%", md: "50%" }} mb="-20px">
              <CardInput
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small style={{ color: "#aaa" }}>
                E.g.: 49..., 51..., 36..., 37...
              </small>

              <CardInput
                mt="20px"
                mb="20px"
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />

              <div className="row" style={{ marginBottom: "20px" }}>
                <div className="col-6">
                  <CardInput
                    type="tel"
                    name="expiry"
                    className="form-control"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="col-6">
                  <CardInput
                    type="tel"
                    name="cvc"
                    className="form-control"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </div>
            </Box>
          </Flex>
          {/* <Box>
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
            <CardInput
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <small style={{ color: "#aaa" }}>
              E.g.: 49..., 51..., 36..., 37...
            </small>

            <div className="form-group">
              <CardInput
                mt="20px"
                mb="20px"
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row" style={{ marginBottom: "20px" }}>
              <div className="col-6">
                <CardInput
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <CardInput
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
          </Box> */}
          <div
            className="form-actions d-flex justify-content-between w-100 "
            style={{ padding: "0px" }}
          >
            <Box w="45%">
              <BasicButton
                click={this.props.backToShipping}
                disable={this.props.loading}
                w="100%"
                cancelType={true}
              >
                Back
              </BasicButton>
            </Box>
            <Box w="45%">
              <BasicButton type="submit" disable={this.props.loading} w="100%">
                {this.props.buttonText}
              </BasicButton>
            </Box>
          </div>
        </form>
        {/* </Flex> */}
      </div>
    );
  }
}
