export const emptyValue = {
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          {
            object: 'text',
            text: '',
            marks: []
          }
        ]
      }
    ]
  }
};

export const randomValue = {
  object: 'value',
  document: {
    object: 'document',
    data: {},
    nodes: [
      {
        object: 'block',
        type: 'heading-one',
        data: {},
        nodes: [
          {
            object: 'text',
            text: 'Scribo document editor',
            marks: []
          }
        ]
      },
      {
        object: 'block',
        type: 'heading-two',
        data: {},
        nodes: [{ object: 'text', text: 'Marks', marks: [] }]
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          {
            object: 'text',
            text: 'You can ',
            marks: []
          },
          {
            object: 'text',
            text: 'bold',
            marks: [
              {
                object: 'mark',
                type: 'bold',
                data: {}
              }
            ]
          },
          {
            object: 'text',
            text: ' text.',
            marks: []
          }
        ]
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          { object: 'text', text: 'You can ', marks: [] },
          {
            object: 'text',
            text: 'italicize',
            marks: [{ object: 'mark', type: 'italic', data: {} }]
          },
          { object: 'text', text: ' text.', marks: [] }
        ]
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          { object: 'text', text: 'You can ', marks: [] },
          {
            object: 'text',
            text: 'scratch',
            marks: [{ object: 'mark', type: 'strikethrough', data: {} }]
          },
          { object: 'text', text: ' things off!', marks: [] }
        ]
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          { object: 'text', text: 'You can add ', marks: [] },
          {
            object: 'text',
            text: 'codeFences',
            marks: [{ object: 'mark', type: 'code', data: {} }]
          },
          { object: 'text', text: ' to text.', marks: [] }
        ]
      },
      {
        object: 'block',
        type: 'heading-two',
        data: {},
        nodes: [{ object: 'text', text: 'Blocks', marks: [] }]
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [
          {
            object: 'text',
            text: 'Want a link to google? ',
            marks: []
          },
          {
            object: 'inline',
            type: 'link',
            data: {
              href: 'https://google.com'
            },
            nodes: [
              {
                object: 'text',
                text: 'Here you go!',
                marks: []
              }
            ]
          }
        ]
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [{ object: 'text', text: 'Images work too! ', marks: [] }]
      },
      { object: 'block', type: 'paragraph', data: {}, nodes: [] },
      {
        object: 'block',
        type: 'image',
        data: {
          src: 'https://via.placeholder.com/350x150',
          alt: 'placeholder'
        },
        nodes: [{ object: 'text', text: '', marks: [] }]
      },
      { object: 'block', type: 'paragraph', data: {}, nodes: [] },
      {
        object: 'block',
        type: 'bulleted-list',
        data: {},
        nodes: [
          {
            object: 'block',
            type: 'list-item',
            data: {},
            nodes: [
              {
                object: 'block',
                type: 'paragraph',
                data: {},
                nodes: [{ object: 'text', text: "Here's a list", marks: [] }]
              }
            ]
          },
          {
            object: 'block',
            type: 'list-item',
            data: {},
            nodes: [
              {
                object: 'block',
                type: 'paragraph',
                data: {},
                nodes: [
                  {
                    object: 'text',
                    text: 'Yup, you can add more than one!',
                    marks: []
                  }
                ]
              },
              {
                object: 'block',
                type: 'bulleted-list',
                data: {},
                nodes: [
                  {
                    object: 'block',
                    type: 'list-item',
                    data: {},
                    nodes: [
                      {
                        object: 'block',
                        type: 'paragraph',
                        data: {},
                        nodes: [
                          {
                            object: 'text',
                            text: 'You can nest em too.',
                            marks: []
                          }
                        ]
                      }
                    ]
                  },
                  {
                    object: 'block',
                    type: 'list-item',
                    data: {},
                    nodes: [
                      {
                        object: 'text',
                        text: 'More nested things',
                        marks: []
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
        object: 'block',
        type: 'numbered-list',
        data: {},
        nodes: [
          {
            object: 'block',
            type: 'list-item',
            data: {},
            nodes: [
              {
                object: 'block',
                type: 'paragraph',
                data: {},
                nodes: [
                  {
                    object: 'text',
                    text: 'Numbers work as well!',
                    marks: []
                  }
                ]
              }
            ]
          },
          {
            object: 'block',
            type: 'list-item',
            data: {},
            nodes: [
              {
                object: 'block',
                type: 'paragraph',
                data: {},
                nodes: [{ object: 'text', text: 'Nice?', marks: [] }]
              }
            ]
          }
        ]
      }
    ]
  }
};
