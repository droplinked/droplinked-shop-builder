import { Editor, EditorProps } from 'droplinked-designer-configs';
import 'droplinked-designer-configs/dist/droplinked-designer-configs.css';
import { Data } from 'droplinked-designer-core';
import "droplinked-designer-core/dist/index.css";
import React from 'react';
import useAppStore from 'stores/app/appStore';

function TemplateCreatePage() {
    const { shop: { name } } = useAppStore()

    const initialData: Data = {
        "root": {
            "props": {}
        },
        "content": [
            {
                "type": "headerComponent",
                "props": {
                    "linkManagement": [
                        {
                            "link": {
                                "label": "Example Link",
                                "url": "#"
                            }
                        }
                    ],
                    "id": "headerComponent-012746f3-cc7f-4e4e-baf3-ebc4c6369a18"
                }
            },
            {
                "type": "productGridList",
                "props": {
                    "filters": {
                        "visibility": "visible"
                    },
                    "searchBar": {
                        "visibility": "visible"
                    },
                    "sort": {
                        "visibility": "visible"
                    },
                    "padding": {
                        "top": 32,
                        "bottom": 32
                    },
                    "id": "productGridList-eb8afa59-3ead-4a50-8c3c-166a9220f450"
                }
            },
            {
                "type": "footerComponent",
                "props": {
                    "linkManagement": {
                        "firstColumn": {
                            "name": "Useful Links",
                            "links": [
                                {
                                    "list": {
                                        "label": "Collections",
                                        "url": "#"
                                    }
                                },
                                {
                                    "list": {
                                        "label": "Landing Page",
                                        "url": "#"
                                    }
                                }
                            ]
                        },
                        "secondColumn": {
                            "name": "Site Links",
                            "links": [
                                {
                                    "list": {
                                        "label": "Home",
                                        "url": "/"
                                    }
                                },
                                {
                                    "list": {
                                        "label": "Blogs",
                                        "url": "/blogs"
                                    }
                                }
                            ]
                        }
                    },
                    "id": "footerComponent-012746f3-cc7f-4e4e-baf3-ebc4c6369a18",
                    "description": {
                        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et"
                    },
                    "socialChannels": [
                        {
                            "links": {
                                "type": "social",
                                "channel": "discord",
                                "url": "#"
                            }
                        },
                        {
                            "links": {
                                "type": "social",
                                "channel": "linkedin",
                                "url": "#"
                            }
                        },
                        {
                            "links": {
                                "type": "social",
                                "channel": "twitter",
                                "url": "#"
                            }
                        }
                    ]
                }
            }
        ],
        "zones": {},
        "shopDefaultData": {
            "backgroundColor": "#141414",
            "headerIcon": "",
            "logo": "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/46be9343e7aedf68e24c6cdefbd4937ad66d1eaa7abb0285da9926545ae5ad48.png_or.png",
            "shopDesign": {
                "fontfamily": "Nunito Sans",
                "backgroundBody": "#141414",
                "foreground": "#222222",
                "textColorParagraphs": "#fff",
                "iconHeaderColor": "#fff",
                "isLogoAsFavicon": false,
                "faviconURL": ""
            },
            "launchDate": null
        }
    };
    const editorProps: EditorProps = {
        initialData: initialData,
        shopName: name,
        onUpdate: (data: Data) => console.log("Data updated:", data),
        iframe: { enabled: false }
    }

    return (
        <Editor {...editorProps} />
    )
}

export default TemplateCreatePage