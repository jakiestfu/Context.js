exampleMenuItemSource = function (selector) {
    if ($(selector).attr('id') == 'PNG_JPG' || $(selector).attr('id') == 'NO_OPTIONS') {
        return [
                {
                    header: 'Example Dynamic'
                },
                {
                    text: 'PNG',
                    id: 'pngid',
                    action: function(e, selector) { alert('PNG clicked on ' + selector.text + ": " + selector.id); }
                },
                {
                    text: 'JPG',
                    id: 'jpfid',
                    action: function(e, selector) { alert('JPG clicked on ' + selector.text + ": " + selector.id); }
                },
                {   divider: true   },
                {
                    icon: 'glyphicon glyphicon-list-alt',
                    text: 'Dynamic nested',
                    subMenu : [
                    {
                        text: 'More dynamic',
                        id: 'moreid',
                        action: function(e, selector) { 
                          alert('More dynamic clicked on ' + selector.text + ": " + selector.id); 
                        }
                    },
                    {
                        text: 'And more...',
                        id: 'andmoreid',
                        action: function(e, selector) { alert('And more... clicked on ' + selector.text + ": " + selector.id); }
                    }
                    ]
                }
            ];
    } else {
        return [
                {
                    icon: 'glyphicon glyphicon-exclamation-sign',
                    text: 'No image types supported!',
                    id: 'noimageid'
                }
            ];
    }
};

test_menu = {
    id: 'TEST-MENU',
    data: [
        {
            header: 'Example'
        },
        {
            'icon': 'ui-icon ui-icon-plus',
            'text': 'Create',
            'id': 'createid',
            'action': function(e, selector) { 
              alert('Create clicked on ' + selector.text + ": " + selector.id);
              }
        },
        {
            icon: 'ui-icon ui-icon-pencil',
            text: 'Edit',
            id: 'editid',
            action: function(e, selector) { alert('Edit clicked on '+ selector.text + ": " + selector.id); }
        },
        {
            icon: 'ui-icon ui-icon-arrowthick-1-n',
            text: 'View Data As:',
            subMenu : [
            {
                text: 'Text',
                id:'textid',
                action: function(e, selector) { alert('Text clicked on ' + selector.text + ": " + selector.id); }
            },
            {
                text: 'Image',
                subMenu: [
                    {
                        menu_item_src : "exampleMenuItemSource"
                    }
                ]
            }
            ]
        },
        {
            divider: true
        },
        {
            header: 'Another Example'
        },
        {
            icon: 'ui-icon ui-icon-arrowthick-1-n',
            text: 'Delete',
            id:'deleteid',
            action: function(e, selector) { 
              alert('Delete clicked on ' + selector.text + ": " + selector.id);
            }
        }
    ]
};

test_menu2 = [
    {
        icon: 'glyphicon glyphicon-plus',
        text: 'Create',
        id: 'create2id',
        action: function(e, selector) { alert('Create clicked on ' + selector.text + ":" + selector.id); }
    },
    {
        icon: 'glyphicon glyphicon-edit',
        text: 'Edit',
        id:'edit2id',
        action: function(e, selector) { 
          alert('Edit clicked on ' + selector.text + ":" + selector.id); 
        }
    }
];
