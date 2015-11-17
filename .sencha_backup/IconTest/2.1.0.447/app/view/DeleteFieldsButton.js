/**
 *
 */
Ext.define('IconTest.view.DeleteFieldsButton', {
    extend: 'Ext.Button',
    requires: [
        'Ext.Button'
    ],
    statics: {
        instanceCount: 0
    },
    xtype: 'DeleteFieldsButton',
    config: {
        iconMask: true,
        ui: 'plain',
        iconCls: 'minus_black',
        iconAlign: 'right'
    },

    constructor: function() {
        this.callParent(arguments);
        this.self.instanceCount ++;

    },
    destroy: function() {
        this.callParent(arguments);
        this.self.instanceCount --;

    }
});
