export const emptyValue = {
    object: "value",
    document: {
        object: "document",
        data: {},
        nodes: [
            {
                object: "block",
                type: "paragraph",
                data: {},
                nodes: [
                    {
                        object: "text",
                        leaves: [{ object: "leaf", text: "", marks: [] }]
                    }
                ]
            }
        ]
    }
};

export const randomValue = {
    object: "value",
    document: {
        object: "document",
        data: {},
        nodes: [
            {
                object: "block",
                type: "heading-one",
                data: {},
                nodes: [
                    {
                        object: "text",
                        leaves: [{ object: "leaf", text: "Scribo document editor", marks: [] }]
                    }
                ]
            },
            {
                object: "block",
                type: "heading-two",
                data: {},
                nodes: [{ object: "text", leaves: [{ object: "leaf", text: "Marks", marks: [] }] }]
            },
            {
                object: "block",
                type: "paragraph",
                data: {},
                nodes: [
                    {
                        object: "text",
                        leaves: [
                            { object: "leaf", text: "You can ", marks: [] },
                            {
                                object: "leaf",
                                text: "bold",
                                marks: [{ object: "mark", type: "bold", data: {} }]
                            },
                            { object: "leaf", text: " text.", marks: [] }
                        ]
                    }
                ]
            },
            {
                object: "block",
                type: "paragraph",
                data: {},
                nodes: [
                    {
                        object: "text",
                        leaves: [
                            { object: "leaf", text: "You can ", marks: [] },
                            {
                                object: "leaf",
                                text: "italicize",
                                marks: [{ object: "mark", type: "italic", data: {} }]
                            },
                            { object: "leaf", text: " text.", marks: [] }
                        ]
                    }
                ]
            },
            {
                object: "block",
                type: "paragraph",
                data: {},
                nodes: [
                    {
                        object: "text",
                        leaves: [
                            { object: "leaf", text: "You can ", marks: [] },
                            {
                                object: "leaf",
                                text: "scratch",
                                marks: [{ object: "mark", type: "strikethrough", data: {} }]
                            },
                            { object: "leaf", text: " things off!", marks: [] }
                        ]
                    }
                ]
            },
            {
                object: "block",
                type: "paragraph",
                data: {},
                nodes: [
                    {
                        object: "text",
                        leaves: [
                            { object: "leaf", text: "You can add ", marks: [] },
                            {
                                object: "leaf",
                                text: "codeFences",
                                marks: [{ object: "mark", type: "code", data: {} }]
                            },
                            { object: "leaf", text: " to text.", marks: [] }
                        ]
                    }
                ]
            },
            {
                object: "block",
                type: "heading-two",
                data: {},
                nodes: [{ object: "text", leaves: [{ object: "leaf", text: "Blocks", marks: [] }] }]
            },
            {
                object: "block",
                type: "paragraph",
                data: {},
                nodes: [
                    {
                        object: "text",
                        leaves: [{ object: "leaf", text: "Want a link to google? ", marks: [] }]
                    },
                    {
                        object: "inline",
                        type: "link",
                        data: { href: "https://google.com" },
                        nodes: [
                            {
                                object: "text",
                                leaves: [{ object: "leaf", text: "Here you go!", marks: [] }]
                            }
                        ]
                    }
                ]
            },
            {
                object: "block",
                type: "paragraph",
                data: {},
                nodes: [
                    {
                        object: "text",
                        leaves: [{ object: "leaf", text: "Images work too! ", marks: [] }]
                    }
                ]
            },
            { object: "block", type: "paragraph", data: {}, nodes: [] },
            {
                object: "block",
                type: "image",
                data: { src: "https://via.placeholder.com/350x150", alt: "placeholder" },
                nodes: [{ object: "text", leaves: [{ object: "leaf", text: "", marks: [] }] }]
            },
            { object: "block", type: "paragraph", data: {}, nodes: [] },
            {
                object: "block",
                type: "bulleted-list",
                data: {},
                nodes: [
                    {
                        object: "block",
                        type: "list-item",
                        data: {},
                        nodes: [
                            {
                                object: "block",
                                type: "paragraph",
                                data: {},
                                nodes: [
                                    {
                                        object: "text",
                                        leaves: [
                                            { object: "leaf", text: "Here's a list", marks: [] }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        object: "block",
                        type: "list-item",
                        data: {},
                        nodes: [
                            {
                                object: "block",
                                type: "paragraph",
                                data: {},
                                nodes: [
                                    {
                                        object: "text",
                                        leaves: [
                                            {
                                                object: "leaf",
                                                text: "Yup, you can add more than one!",
                                                marks: []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                object: "block",
                                type: "bulleted-list",
                                data: {},
                                nodes: [
                                    {
                                        object: "block",
                                        type: "list-item",
                                        data: {},
                                        nodes: [
                                            {
                                                object: "block",
                                                type: "paragraph",
                                                data: {},
                                                nodes: [
                                                    {
                                                        object: "text",
                                                        leaves: [
                                                            {
                                                                object: "leaf",
                                                                text: "You can nest em too.",
                                                                marks: []
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        object: "block",
                                        type: "list-item",
                                        data: {},
                                        nodes: [
                                            {
                                                object: "block",
                                                type: "paragraph",
                                                data: {},
                                                nodes: [
                                                    {
                                                        object: "text",
                                                        leaves: [
                                                            {
                                                                object: "leaf",
                                                                text: "More nested things",
                                                                marks: []
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                object: "block",
                type: "numbered-list",
                data: {},
                nodes: [
                    {
                        object: "block",
                        type: "list-item",
                        data: {},
                        nodes: [
                            {
                                object: "block",
                                type: "paragraph",
                                data: {},
                                nodes: [
                                    {
                                        object: "text",
                                        leaves: [
                                            {
                                                object: "leaf",
                                                text: "Numbers work as well!",
                                                marks: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        object: "block",
                        type: "list-item",
                        data: {},
                        nodes: [
                            {
                                object: "block",
                                type: "paragraph",
                                data: {},
                                nodes: [
                                    {
                                        object: "text",
                                        leaves: [{ object: "leaf", text: "Nice?", marks: [] }]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
