import { Divider, ModalBody, ModalFooter } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import Input from 'components/redesign/input/Input';
import ModalHeaderIconWrapper from 'components/redesign/modal-header-icon-wrapper/ModalHeaderIconWrapper';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { sendInvitaionEmailService } from 'lib/apis/user/services';
import Button from 'components/redesign/button/Button';
import useAppToast from 'functions/hooks/toast/useToast';
import MessageBox from 'components/redesign/message-box/MessageBox';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
}

export default function InviteUserModal({ isOpen, onClose, refetch }: Props) {
    const [email, setEmail] = useState("");
    const { showToast } = useAppToast()
    const { mutateAsync, isLoading } = useMutation((email: string) => sendInvitaionEmailService(email));

    const handleSubmit = async () => {
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showToast({ message: "Please enter a valid email address", type: "error" })
            return;
        }

        try {
            await mutateAsync(email);
            showToast({ type: "success", message: "An invitation has been sent to this email." })
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
                descriptionColor='#B1B1B1 !important'
                title='Invite New Member'
                icon={
                    <ModalHeaderIconWrapper>
                        <AppIcons.AddUser />
                    </ModalHeaderIconWrapper>
                }
                description='Add a new member by entering their email address below.'
            />
            <ModalBody py={"48px !important"}>
                <Input
                    label='Email Address'
                    inputProps={{
                        isRequired: true,
                        placeholder: "Enter email address",
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
                    title='Access Warning'
                    description='The following user will have access to all sections of the account. Invite with caution!'
                />
            </ModalBody>
            <Divider borderColor={"#292929"} />
            <ModalFooter pt={"36px !important"} display={"flex"} justifyContent={"space-between"}>
                <Button fontWeight={500} onClick={onClose} fontSize={14} variant='secondary'>Discard</Button>
                <Button
                    fontWeight={500}
                    fontSize={14}
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    isDisabled={!email}
                >
                    Send Invitation
                </Button>
            </ModalFooter>
        </AppModal>
    )
}
