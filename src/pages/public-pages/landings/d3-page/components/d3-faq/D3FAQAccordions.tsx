import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import { AppAccordion, AppAccordionItem, AppAccordionPanel, AppAccordionTrigger, useAppAccordionItemContext } from 'components/redesign/accordion/AppAccordion'
import React from 'react'
import D3Paragraph from '../common/D3Paragraph'

export default function D3FAQAccordions() {
    const questions = [
        { question: "What is droplinked", answer: "Lorem ipsum odor amet, consectetuer adipiscing elit. Sagittis faucibus maximus conubia viverra porttitor ridiculus. Sapien gravida velit adipiscing turpis ad aliquam elementum ut. Metus odio inceptos velit vel sodales vivamus tempor. Per consequat ipsum ultrices." },
        { question: "What is droplinked", answer: "Lorem ipsum odor amet, consectetuer adipiscing elit. Sagittis faucibus maximus conubia viverra porttitor ridiculus. Sapien gravida velit adipiscing turpis ad aliquam elementum ut. Metus odio inceptos velit vel sodales vivamus tempor. Per consequat ipsum ultrices." },
        { question: "What is droplinked", answer: "Lorem ipsum odor amet, consectetuer adipiscing elit. Sagittis faucibus maximus conubia viverra porttitor ridiculus. Sapien gravida velit adipiscing turpis ad aliquam elementum ut. Metus odio inceptos velit vel sodales vivamus tempor. Per consequat ipsum ultrices." },
        { question: "What is droplinked", answer: "Lorem ipsum odor amet, consectetuer adipiscing elit. Sagittis faucibus maximus conubia viverra porttitor ridiculus. Sapien gravida velit adipiscing turpis ad aliquam elementum ut. Metus odio inceptos velit vel sodales vivamus tempor. Per consequat ipsum ultrices." }
    ]

    return (
        <AppAccordion multiCollapse={true} display={"flex"} flexDirection={"column"} gap={2}>
            {questions.map((question, index) => (
                <AppAccordionItem
                    key={index}
                    display="flex"
                    flexDirection="column"
                    border="1px solid #222"
                    borderRadius={16}
                    padding={6}
                    background="#141414"
                    userSelect={"none"}
                    itemId={index.toString()}
                >
                    <AppAccordionTrigger>
                        <AppTypography fontSize={20} fontWeight={700} color={"white"}>
                            {question.question}
                        </AppTypography>
                        <AccordionPlus />
                    </AppAccordionTrigger>
                    <AppAccordionPanel paddingTop={"24px"}>
                        <D3Paragraph>{question.answer}</D3Paragraph>
                    </AppAccordionPanel>
                </AppAccordionItem>
            ))}
        </AppAccordion>
    )
}

function AccordionPlus() {
    const { isOpen } = useAppAccordionItemContext()

    return <AppIcons.PlusIcon width={20} height={20} style={{ transition: ".5s", transform: isOpen ? "rotate(135deg)" : "rotate(0deg)" }} />
}