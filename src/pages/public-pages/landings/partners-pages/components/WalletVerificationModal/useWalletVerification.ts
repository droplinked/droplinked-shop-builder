import { useMutation } from 'react-query';
import { postUserVerifyD3, postUserVerifyUD } from 'lib/apis/user/services';
import { useSearchParams } from 'react-router-dom';
import { DropWeb3, Network } from 'droplinked-web3';
import { useContext } from 'react';
import PartnerContext from '../../context/partner.context';
import useAppToast from 'functions/hooks/toast/useToast';
import { appDevelopment } from 'lib/utils/app/variable';
import { IPostUserVerifyPartner } from 'lib/apis/user/interfaces';

export const useWalletVerification = () => {
  const { showToast } = useAppToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { partnerName, methods: { updateStates } } = useContext(PartnerContext);

  const mutation = useMutation(
    (props: IPostUserVerifyPartner) => {
      if (partnerName === 'D3') {
        return postUserVerifyD3(props);
      } else if (partnerName === 'Unstoppable Domains') {
        return postUserVerifyUD(props);
      } else {
        return Promise.reject(new Error('Unsupported partner'));
      }
    }
  );

  const connectWallet = () => {
    return new Promise((resolve, reject) => {
      updateStates({ key: 'currentStep', value: 'loading' });
      new DropWeb3(appDevelopment ? Network.TESTNET : Network.MAINNET)
        .getWalletInfo()
        .then(async (res) => {
          const walletType = partnerName === 'D3' ? 'EVM' : 'UNSTOPPABLEDOMAIN';

          await mutation.mutateAsync({
           walletAddress: res?.address,
            walletType: walletType,
          }).then((verifyRes) => {
            if (!verifyRes?.data?.data || verifyRes?.data?.data === 'false' || verifyRes?.data?.data === false) {
              updateStates({
                key: 'currentStep',
                value: 'error',
              });
              return;
            }

            const data = verifyRes?.data?.data;
            if (partnerName === 'D3') {
              searchParams.set('d3-id', data); 
            } else if (partnerName === 'Unstoppable Domains') {
              searchParams.set('ud-id', data); 
            }
            setSearchParams(searchParams);
        
            updateStates({
              key: 'currentStep',
              value: 'done',
            });
          }).catch((error) => {
            updateStates({
              key: 'currentStep',
              value: 'error',
            });
            reject(error);
          });

          resolve(res);
        })
        .catch((error) => {
          if (error?.message === 'No EVM Wallet is installed') {
            showToast({
              type: 'error',
              message: 'Metamask wallet is not installed!',
            });
            updateStates({
              key: 'currentStep',
              value: 'connect',
            });
          } else {
            updateStates({
              key: 'currentStep',
              value: 'error',
            });
          }
          reject(error);
        });
    });
  };

  return { connectWallet };
};
