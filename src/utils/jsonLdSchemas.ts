export const createBlogPostSchema = (blog: any) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${window.location.origin}/blogs/${blog.slug}`
    },
    "headline": blog.title,
    "description": blog.searchEngineSummary || blog.content?.replace(/<[^>]*>/g, '').substring(0, 155) + '...',
    "image": blog.image,
    "author": {
        "@type": "Person",
        "name": blog.writer
    },
    "publisher": {
        "@type": "Organization",
        "name": "Droplinked",
        "logo": {
            "@type": "ImageObject",
            "url": "https://droplinked.com/apple-touch-icon.png"
        }
    },
    "datePublished": new Date(blog.createdAt).toISOString().split('T')[0],
    "dateModified": new Date(blog.updatedAt).toISOString().split('T')[0],
    "keywords": blog.tags?.join(', '),
    "articleSection": blog.category
});

export const createContactPageSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us | Get In Touch with Droplinked",
    "url": "https://droplinked.com/contact-us",
    "mainEntity": {
        "@type": "Organization",
        "name": "Droplinked",
        "url": "https://droplinked.com/",
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "url": "https://droplinked.com/contact-us"
        }
    }
});

export const createHomePageSchema = () => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "name": "Droplinked",
            "url": "https://droplinked.com/",
            "logo": "https://droplinked.com/apple-touch-icon.png",
            "description": "Droplinked provides a no-code platform for Web3 commerce, enabling businesses to tokenize products, manage onchain inventory, and sell digital or physical goods with ease.",
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "url": "https://droplinked.com/contact-us"
            },
            "sameAs": [
                "https://x.com/droplinked",
                "https://www.linkedin.com/company/droplinked",
                "https://www.instagram.com/drop_linked",
                "https://t.me/droplinked",
                "https://discord.com/channels/1068939465025916959/1088500920406515763",
                "https://youtube.com/@droplinked-fj6nt",
                "https://www.tiktok.com/@droplinked",
                "https://bsky.app/profile/@droplinked.bsky.social"
            ]
        },
        {
            "@type": "WebSite",
            "url": "https://droplinked.com/",
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://droplinked.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
        }
    ]
});

export const createAboutPageSchema = () => [
    {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About Droplinked | Our Mission for Web3 Commerce",
        "url": "https://droplinked.com/about",
        "mainEntity": {
            "@type": "Organization",
            "name": "Droplinked",
            "url": "https://droplinked.com/"
        }
    },
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Droplinked?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Droplinked is a no-code platform for Web3 commerce that allows businesses to tokenize products, manage onchain inventory, and sell both digital and physical goods."
                }
            },
            {
                "@type": "Question",
                "name": "Is Droplinked a blockchain?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, Droplinked is not a blockchain itself. It is a blockchain-agnostic platform, meaning it integrates with and supports multiple blockchains to provide its services."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need to know how to code to use Droplinked?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, Droplinked is a no-code platform. You can access all its features for tokenization, sales, and inventory management without writing any code."
                }
            }
        ]
    }
];
