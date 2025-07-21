import { Divider, ModalBody, ModalFooter } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppButton from 'components/redesign/button/AppButton';
import AppInput from 'components/redesign/input/AppInput';
import MessageBox from 'components/redesign/message-box/MessageBox';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { sendInvitaionEmailService } from 'services/user/services';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
}

export default function InviteUserModal({ isOpen, onClose, refetch }: Props) {
    const [email, setEmail] = useState("");
    const { showToast } = useAppToast();
    const { t } = useLocaleResources('settings');
    const { mutateAsync, isLoading } = useMutation((email: string) => sendInvitaionEmailService(email));

    const handleSubmit = async () => {
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showToast({ message: t('UserManagement.inviteModal.invalidEmail'), type: "error" })
            return;
        }

        try {
            await mutateAsync(email);
            showToast({ type: "success", message: t('UserManagement.inviteModal.invitationSent') })
            setEmail("");
            refetch();
            onClose();
        } catch (e) {
            showToast({ message: e.response?.status === 409 ? e.response?.data?.data?.message : "Oops! Something went wrong.", type: "error" })
        }
    };

    return (
        <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "xl" }} modalContentProps={{ gap: 0, paddingBlock: 0, paddingBottom: "48px" }}>
            <ModalHeaderData
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
                title={t('UserManagement.inviteModal.title')}
                icon={<AppIcons.AddUser />}
                description={t('UserManagement.inviteModal.description')}
            />
            <ModalBody py={"48px !important"}>
                <AppInput
                    label={t('UserManagement.inviteModal.emailLabel')}
                    inputProps={{
                        isRequired: true,
                        placeholder: t('UserManagement.inviteModal.emailPlaceholder'),
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                    }}
                    inputContainerProps={{
                        mb: 4
                    }}
                    leftElement={<AppIcons.EmailSign />}
                />
                <MessageBox
                    theme='systemWarning'
                    title={t('UserManagement.inviteModal.accessWarning')}
                    description={t('UserManagement.inviteModal.accessWarningDesc')}
                />
            </ModalBody>
            <Divider borderColor={"neutral.gray.800"} />
            <ModalFooter pt={"36px !important"} display={"flex"} justifyContent={"space-between"}>
                <AppButton variant='secondary' onClick={onClose}>{t('cancel')}</AppButton>
                <AppButton onClick={handleSubmit} isLoading={isLoading} isDisabled={!email} >
                    {t('UserManagement.inviteModal.sendInvitation')}
                </AppButton>
            </ModalFooter>
        </AppModal>
    )
}
