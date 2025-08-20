export interface TemplateCardBaseProps {
    id: string
    name: string
    imageUrl: string
}

export interface UserTemplateCardProps extends TemplateCardBaseProps {
    isUserTemplate: true
    status: 'live' | 'draft'
    lastEdited: string
}

export interface PublicTemplateCardProps extends TemplateCardBaseProps {
    isUserTemplate?: false
    creator: string
    category: string
}