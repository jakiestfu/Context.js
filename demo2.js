exampleMenuItemSource = function (selector) {
    if ($(selector).attr('id') == 'PNG_JPG') {
        return [
                {
                    header: 'Example Dynamic'
                },
                {
                    text: 'PNG',
                    action: function(e, selector) { alert('PNG clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
                },
                {
                    text: 'JPG',
                    action: function(e, selector) { alert('JPG clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
                },
                {   divider: true   },
                {
                    icon: 'glyphicon-list-alt',
                    text: 'Dynamic nested',
                    subMenu : [
                    {
                        text: 'More dynamic',
                        action: function(e, selector) { alert('More dynamic clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
                    },
                    {
                        text: 'And more...',
                        action: function(e, selector) { alert('And more... clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
                    }
                    ]
                }
            ]
    } else {
        return [
                {
                    icon: 'glyphicon-exclamation-sign',
                    text: 'No image types supported!'
                }
            ]
    }
}

test_menu = {
    id: 'TEST-MENU',
    data: [
        {
            header: 'Example'
        },
        {
            icon: 'glyphicon-plus',
            text: 'Create',
            action: function(e, selector) { alert('Create clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
        },
        {
            icon: 'glyphicon-edit',
            text: 'Edit',
            action: function(e, selector) { alert('Edit clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
        },
        {
            icon: 'glyphicon-list-alt',
            text: 'View Data As:',
            subMenu : [
            {
                text: 'Text',
                action: function(e, selector) { alert('Text clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
            },
            {
                text: 'Image',
                subMenu: [
                    {
                        menu_item_src : exampleMenuItemSource
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
            icon: 'glyphicon-trash',
            text: 'Delete',
            action: function(e, selector) { alert('Delete clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
        }
    ]
};

test_menu2 = [
    {
        header: 'Example'
    },
    {
        icon: 'glyphicon-plus',
        text: 'Create',
        action: function(e, selector) { alert('Create clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
    },
    {
        icon: 'glyphicon-edit',
        text: 'Edit',
        action: function(e, selector) { alert('Edit clicked on ' + selector.prop("tagName") + ":" + selector.attr("id")); }
    }
];
