Ext.define('IconTest.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    config: {
        items: [
            {
                xtype: 'MyTextField'
            },
            {
                xtype: 'AddFieldsButton',
                text: 'Add Dye',
                fields: [
                    {
                        xtype:'panel',
                        style:{
                          backgroundColor:'White'
                        },
                        layout:'hbox',
                        items:[
                            {
                                xtype: 'MyTextField',
                                labelTpl: 'Text {index}',
                                label: 'text',
                                labelWidth:'31.6%',
                                width:'95%'
                            },
                            {
                                xtype:'button',
                                iconMask: true,
                                ui: 'plain',
                                iconCls: 'delete',
                                width:'5%',
                                handler: function(){
                                    var me = this;
                                    var myTextField = Ext.ComponentQuery.query('MyTextField')[0];
									console.log('bijay kanshi');
                                    myTextField.onDeleteIconTap(me);
                                }
                            }
                        ]
                    }
                ],
                deleteButton: false
            }
        ]
    }
});