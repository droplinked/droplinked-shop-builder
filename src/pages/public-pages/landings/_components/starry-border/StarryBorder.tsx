import { Heading, Image, Show, Text } from '@chakra-ui/react';
import AppButton from 'components/redesign/button/AppButton';
import React from 'react';
import Container from '../container/Container';

interface Props {
    title: string
    description: string
    buttonText: string
    onButtonClick: () => void
}

function StarryBorder({ title, description, buttonText, onButtonClick }: Props) {
    return (
        <Container
            alignSelf="stretch"
            position="relative"
            alignItems="center"
            paddingBlock={12}
            sx={{ "img": { position: "absolute" } }}
        >
            <Heading paddingInline={{ base: 3 }} textAlign="center" fontSize={{ base: 24, lg: 32 }} color="#fff">{title}</Heading>

            <Text width={{ base: "80%", lg: "60%" }} textAlign="center" color="white">{description}</Text>

            <AppButton onClick={onButtonClick}>{buttonText}</AppButton>

            <Show above='lg'>
                <Image width="150px" top="35px" right="-3px" src='https://upload-file-droplinked.s3.amazonaws.com/e62fec9d1e1d4d0d415aea1074967ed1d076dc5e8aef5a534cb6176dc62568e8.png' />
                <Image width="150px" bottom={0} left="80px" src='https://upload-file-droplinked.s3.amazonaws.com/cc809f9d953509d5fc85053a09492565ec3c90535580a61840c79c4ca079c44f.png' />
                <Image width="150px" top="-75px" left="-2%" src='https://upload-file-droplinked.s3.amazonaws.com/6c87b9947740b4fcb3dbb9e7928479f49c534bc8b8c63de93d60967bc75b3400.png' />
                <Image width="40px" top="-30px" right="20%" src='https://upload-file-droplinked.s3.amazonaws.com/992c05ce75cc044891e7c082bdd0c903b3506d429d35d39908fe3af4f30bf0ef.png' />
                <Image width="40px" bottom="-10px" right="10%" src='https://upload-file-droplinked.s3.amazonaws.com/9a63e52fc21c7b69d14eea8a8fa47adb2e00a387b08d8103162e26a37119b503.png' />
                <Image width="40px" top="-10px" left="25%" src='https://upload-file-droplinked.s3.amazonaws.com/9a63e52fc21c7b69d14eea8a8fa47adb2e00a387b08d8103162e26a37119b503.png' />
                <Image width="150px" bottom="-75px" right="15%" src='https://upload-file-droplinked.s3.amazonaws.com/b845aa983a898aa6100fb17c897a9d0f4fe9f11b6c7cb3a5e5cc63eda7525301.png' />
                <Image width="40px" bottom="-15px" left="0" src='https://upload-file-droplinked.s3.amazonaws.com/094f521c3f6fc1125b3d5ef8fefb9f8ba7fdc8c45a4f467fd456ea1a7bfd2f63.png' />
            </Show>
        </Container>
    )
}

export default StarryBorder