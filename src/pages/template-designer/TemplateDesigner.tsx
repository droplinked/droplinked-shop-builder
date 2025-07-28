import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CreateNewTemplateCard from './components/HomePage/CreateNewTemplateCard'
import PublicTemplateCard from './components/HomePage/PublicTemplateCard'
import Section from './components/HomePage/Section'
import UserTemplateCard from './components/HomePage/UserTemplateCard'
import { PublicTemplateCardProps, UserTemplateCardProps } from './types/types'

const mockTemplates: Omit<UserTemplateCardProps, 'isUserTemplate'>[] = [
    {
        id: '1',
        name: 'Minimalist',
        imageUrl: 'https://picsum.photos/200/300',
        status: 'live',
        lastEdited: '2 days ago',
    },
    {
        id: '2',
        name: 'Modern',
        imageUrl: 'https://picsum.photos/200/300',
        status: 'draft',
        lastEdited: '5 days ago',
    },
]

const popularTemplates: PublicTemplateCardProps[] = [
    {
        id: '3',
        name: 'E-commerce',
        imageUrl: 'https://picsum.photos/200/300',
        creator: 'John Doe',
        category: 'Business',
    },
    {
        id: '4',
        name: 'Portfolio',
        imageUrl: 'https://picsum.photos/200/300',
        creator: 'Jane Smith',
        category: 'Creative',
    },
]

function TemplateDesigner() {
    const navigate = useNavigate()

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Template Builder"
                description="Easily create, manage and view templates all in one place."
                actionButtons={[
                    {
                        title: 'New Template',
                        leftIcon: <PlusMd />,
                        onClick: () => navigate('create'),
                    }
                ]}
            />

            <PageGrid.Content gap={9}>
                <Section title="Templates">
                    <CreateNewTemplateCard />
                    {mockTemplates.map((template) => (
                        <UserTemplateCard key={template.id} {...template} isUserTemplate />
                    ))}
                </Section>

                <Section title="Popular Templates" link={{ text: 'Explore', href: '#' }}>
                    {popularTemplates.map((template) => (
                        <PublicTemplateCard key={template.id} {...template} />
                    ))}
                </Section>
            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default TemplateDesigner