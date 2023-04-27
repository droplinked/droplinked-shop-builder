import { useApi } from "hooks/useApi/useApi";
import { useEffect, useState } from "react";
import { RuleTypes } from "./rule-type";
import {
  postCreateRuleset,
  putUpdateRuleset,
} from "lib/apis/rulesetApiService";
import {
  ModalHeader,
} from "./RuleModal-style";
import { Box, HStack, VStack } from "@chakra-ui/react";
import BasicButton from "components/shared/BasicButton/BasicButton";
import LoadingComponent from "components/shared/loading-component/LoadingComponent";
import { ChainTypes } from "./chain-type";
import { toast } from "react-toastify";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AppModal from "components/shared/modal/AppModal";
import AppTextarea from "components/shared/form/textarea/AppTextarea";
import ruleModelContext from "./context";
import TextboxRule from "./components/textbox/TextboxRule";
import SelectRule from "./components/select/SelectRule";
import { useMutation } from "react-query";
import { getRuleService } from "lib/apis/rule/ruleServices";

// this modal use for add new rule or edit exsiting rule
const RuleModal = ({ show, collectionId, update, close, ruleId }) => {
  const [State, setState] = useState(null)
  const getRule = useMutation((params) => getRuleService(params))
  const { postApi, putApi } = useApi();

  useEffect(() => {
    if (ruleId) getRule.mutate({ ruleID: ruleId })
  }, [ruleId])


  useEffect(() => {
    if (getRule.data) setState(getRule.data.data.data)
  }, [getRule])

  const submit = async (data) => {
    const { tag, weburl, chain, rule, discount, address, counter } = data
    try {
      const requestBody = {
        collectionID: collectionId,
        gated: rule === RuleTypes.DISCOUNT,
        rules: [
          {
            addresses: address?.split(","),
            discountPercentage: +discount,
            nftsCount: +counter,
            type: chain,
            description: tag,
          },
        ],
        type: chain,
        webUrl: weburl,
        redeemedNFTs: [],
      };
      if (ruleId) {
        await putApi(putUpdateRuleset(ruleId, requestBody));
      } else {
        await postApi(postCreateRuleset(requestBody));
      }
      update();
      close();
      toast.success(`Rule ${ruleId ? "update" : "created"}`)
    } catch (error) {
      toast.error("Somthing wrong")
    }
  };

  const formSchema = Yup.object().shape({
    tag: Yup.string().required('Required'),
    weburl: Yup.string().required('Required'),
    chain: Yup.string().required('Required'),
    rule: Yup.string().required('Required'),
    discount: Yup.number().typeError("Please correct value").required('Required'),
    address: Yup.string().required('Required'),
    counter: Yup.number().typeError("Please correct value").required('Required'),
  });

  if (!show) return null;

  console.log("rule", ruleId);
  return (
    <AppModal
      open={show}
      close={close}
      contentProps={{ maxWidth: "700px", width: "95%", padding: "40px" }}
    >
      <ModalHeader>Make Rule</ModalHeader>
      {false ? (
        <LoadingComponent />
      ) : (
        <Formik
          initialValues={{
            tag: State ? State?.rules ? State?.rules[0].description : '' : '',
            weburl: State ? State?.webUrl : '',
            chain: State ? State?.type : 'ETH',
            rule: State ? State?.gated ? RuleTypes.DISCOUNT : RuleTypes.GATED : true,
            discount: State ? State?.rules ? State?.rules[0].discountPercentage : 0 : 0,
            address: State ? State?.rules ? State?.rules[0].addresses[0] : '' : '',
            counter: State ? State?.rules ? State?.rules[0].nftsCount : '' : ''
          }}
          enableReinitialize
          validateOnChange={false}
          validationSchema={formSchema}
          onSubmit={submit}
        >

          {({ errors, values, setFieldValue }) => (
            <ruleModelContext.Provider value={{ errors, values, setFieldValue }}>
              <Form>
                <VStack width={"100%"} align="stretch" spacing={8}>
                  <Box>
                    <TextboxRule element={"tag"} placeholder="tag" label={"Tag name"} />
                  </Box>
                  <Box>
                    <TextboxRule element={"weburl"} placeholder="url ..." label={"NFT source domain"} />
                  </Box>
                  <Box>
                    <SelectRule
                      element={"chain"}
                      placeholder="Select chain"
                      label={"Chain Type"}
                      items={Object.keys(ChainTypes).map((el) => {
                        return {
                          value: el,
                          caption: el
                        }
                      })}
                    />
                  </Box>
                  <HStack alignItems={"baseline"}>
                    <Box width={"100%"}>
                      <SelectRule
                        element={"rule"}
                        placeholder="Select rule"
                        label={"Rule Type"}
                        items={Object.keys(RuleTypes).map((el) => {
                          return {
                            value: el,
                            caption: el
                          }
                        })}
                      />
                    </Box>
                    {console.log("adad", Boolean(values.rule))}
                    {values.rule === RuleTypes.DISCOUNT && (
                      <Box width={"100%"}>
                        <TextboxRule element={"discount"} placeholder="%20" label={"Offer"} />
                      </Box>
                    )}
                  </HStack>
                  <Box>
                    <AppTextarea
                      name="address"
                      placeholder="you can separate nft links with ,"
                      label="NFT asset identifiers"
                      onChange={(e) => setFieldValue("address", e.target.value)}
                      value={values.address}
                      error={errors.address}
                      isRequired
                    />
                  </Box>
                  <Box width={"100%"}>
                    <TextboxRule element={"counter"} placeholder="number ..." label={"Minimum Requirement"} />
                  </Box>
                  <HStack justifyContent={"space-between"}>
                    <Box width={"35%"}><BasicButton width={"100%"} cancelType>Cancel</BasicButton></Box>
                    <Box width={"35%"}><BasicButton width={"100%"} type="submit">Save</BasicButton></Box>
                  </HStack>
                </VStack>
              </Form>
            </ruleModelContext.Provider>
          )}
        </Formik>
      )}
    </AppModal>
  );
};

export default RuleModal;
