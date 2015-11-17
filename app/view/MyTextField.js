Ext.define('IconTest.view.MyTextField',{
    extend :'Ext.field.Text',
    xtype: 'MyTextField',
    requires: [
        'Ext.field.Text'
    ],
    statics: {
        instanceCount: 0
    },
    config:{
        label:'Text'
    },

    onDeleteIconTap: function(me, e) {
        var container = this.up('main');
        var ref = me.parent;
        container.remove(ref);
        var count = container.items.length;
        for (var i = 0; i < count; i++) {
            var item = container.items.getAt(i);
            if (item.isXType('AddFieldsButton')) {
                var addButton = item;
                addButton.removeField(ref);
                break;
            }
        }
        return;
    }

})
