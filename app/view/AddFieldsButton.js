/**
 * Button to dynamically add fields to a form panel.
 */
Ext.define('IconTest.view.AddFieldsButton', {
    extend: 'Ext.Button',
    requires: [
        'Ext.Button'
    ],
    statics: {
        /**
         * Counter for all instances of this class. It is merely used for memory
         * leak detection. It gets incremented in the constructor and
         * decremented in the destructor.
         */
        instanceCount: 0
    },
    xtype: 'AddFieldsButton',
    config: {
        iconMask: true,
        ui: 'plain',
        iconCls: 'add',
        iconAlign: 'right',
        text: 'Add Wavelength',
        /**
         * The configs for all fields to be added in one add-handling event. If
         * labelTpl and nameTpl are present, they will be used to create the
         * label and name property values of the new field. The placeholder
         * {index} is replaced by the sequence number of the field group that
         * was added in one handling.
         */
        fields: [
            {
                xtype: 'textfield',
                labelTpl: 'Text {index}',
                labelWidth: '30%'
            }
        ],
        /**
         * Places a button with the herein specified config after this button
         * to allow deletion of all dynamically added fields. Should deletion
         * be enabled on a per-field-basis by setting the component property
         * of such fields to { xtype: 'DeletableInput' }, the delete button is
         * best suppressed by setting this config property to false.
         */
        deleteButton: {
            xtype: 'DeleteFieldsButton'
        },
        deleteLabelTpl: 'Delete Text {index}',
        /**
         * Defines the index of the field after which all the newly added fields
         * should be placed. This index is zero-based. To place a new field
         * after the first existing form field you need to set start to 0. To
         * place a new field before the first field, -1 should be set.
         */
        start: 0,
        /**
         * This method is called when this button is pressed. It adds as many
         * fields to its containing panel as are listed with their config in
         * the fields property. The fields are added after the field whose index
         * was specified in the start property value.
         */
        handler: function() {
                                                                                //console.log('AddFieldsButton.addField() ________________________________________');
            var start = this.config.start;
                                                                                //console.log('AddFieldsButton.addField() start=' + start);
            var addButton = this;
            var parameters = addButton.up('main');
                                                                                //console.log('AddFieldsButton.addField() parameters=' + parameters);
                                                                                //console.log('AddFieldsButton.addField() parameters.getXTypes()=' + parameters.getXTypes());
            addButton.index = addButton.index || 1;
                                                                                //console.log('AddFieldsButton.addField() addButton.index=' + addButton.index);
            /* indicator = parseInt(((index - 1) / length) + 2)
                    index   length  indicator
                    1       1       2
                    2       1       3
                    3       1       4
                    4       1       5

                    1       2       2
                    3       2       3
                    5       2       4
                    7       2       5
             */
            var length = addButton.config.fields.length;
                                                                                //console.log('AddFieldsButton.addField() length=' + length);
            var offset = addButton.index - 1;
                                                                                //console.log('AddFieldsButton.addField() offset=' + offset);
            var factor = offset / length;
                                                                                //console.log('AddFieldsButton.addField() factor=' + factor);
            var result = factor + 2;
                                                                                //console.log('AddFieldsButton.addField() result=' + result);
            var indicator = parseInt(result);
                                                                                //console.log('AddFieldsButton.addField() indicator=' + indicator);
            var newFields = [];
            for (var i = 0; i < length; i++) {
                var field = addButton.config.fields[i];
                var labelTpl = field.items[0].labelTpl;
                var nameTpl = field.nameTpl;
                var label = labelTpl
                    ? labelTpl.replace('{index}', ('' + indicator))
                    : field.label;
                var name = nameTpl
                    ? nameTpl.replace('{index}', ('' + indicator))
                    : field.name;
                                                                                //console.log('AddFieldsButton.addField() field=' + Ext.encode(field));
                var configItem = Ext.apply(field.items[0], {
                    label: label,
                    name: name
                });

                                                                               //console.log('AddFieldsButton.addField() configItem=' + Ext.encode(configItem));
                var at = start + addButton.index + i;
                                                                                //console.log('AddFieldsButton.addField() at=' + at);
                var newField = parameters.insert(at, field);
                                                                                //console.log('AddFieldsButton.addField() newField.config=' + Ext.encode(newField.config));
                newFields.push( newField );
                newField.newFields = newFields;
                newField.hideClearIcon = Ext.emptyFn;
                newField.element.addCls( Ext.baseCSSPrefix + 'field-clearable' );
            }
            addButton.index += length;
                                                                                //console.log('AddFieldsButton.addField() addButton.fireEvent("fieldsadded", addButton, newFields);');
                                                                                //console.log('AddFieldsButton.addField() addButton.config.deleteButton=' + addButton.config.deleteButton);
            if (!addButton.config.deleteButton) {
                return;
            }
            var buttonAt = start + addButton.index
                                                                                //console.log('AddFieldsButton.addField() buttonAt=' + buttonAt);
            var button = parameters.items.get(buttonAt);
                                                                                //console.log('AddFieldsButton.addField() button.getXTypes()=' + button.getXTypes());
            if (button.isXType('AddFieldsButton')) {
                var deleteFieldsButton = Ext.apply({
                    xtype: 'DeleteFieldsButton',
                    text: addButton.config.deleteLabelTpl.replace(
                        '{index}', '' + indicator),
                    handler: function() {
                        var length = addButton.config.fields.length;
                        for (var i = 0; i < length; i++) {
                            var lastField = parameters.items.get(
                                start + addButton.index - 1);
                                                                                //console.log('AddFieldsButton.deleteField() lastField.getXTypes()=' + lastField.getXTypes());
                                                                                //console.log('AddFieldsButton.deleteField() lastField.getLabel()=' + lastField.getLabel());
                            parameters.remove(lastField, true);
                            addButton.index -= 1;
                        }
                        if (addButton.index == 1) {
                            var button = parameters.items.get(
                                start + addButton.index);
                                                                                //console.log('AddFieldsButton.deleteField() button.getIconCls()=' + button.getIconCls());
                            parameters.remove(button, true);
                        } else {
                            var button = parameters.items.get(
                                start + addButton.index);
                                                                                //console.log('AddFieldsButton.deleteField() button.getIconCls()=' + button.getIconCls());
                            var length = addButton.config.fields.length;
                                                                                //console.log('AddFieldsButton.deleteField() length=' + length);
                            var offset = addButton.index - 2;
                                                                                //console.log('AddFieldsButton.deleteField() offset=' + offset);
                            var factor = offset / length;
                                                                                //console.log('AddFieldsButton.deleteField() factor=' + factor);
                            var result = factor + 2;
                                                                                //console.log('AddFieldsButton.deleteField() result=' + result);
                            var indicator = parseInt(result);
                                                                                //console.log('AddFieldsButton.deleteField() indicator=' + indicator);
                            button.setText(
                                addButton.config.deleteLabelTpl.replace(
                                    '{index}', '' + indicator));
                        }
                    }
                }, addButton.config.deleteButton);
                                                                                //console.log('AddFieldsButton.addField() deleteFieldsButton=' + deleteFieldsButton);
                parameters.insert(start + addButton.index, deleteFieldsButton);
            } else {
                button.setText(addButton.config.deleteLabelTpl.replace(
                    '{index}', '' + indicator));
            }
        }
    },
    /**
     * Removes a field that was dynamically added by this button and also
     * removes all sibling fields that were added during the same add-handling.
     * That is, if more fields were listed by their config in the fields array
     * property, groups of such fields are removed together even if this method
     * was jsut called on one of them.
     *
     * @param field
     */
    removeField: function(field) {
                                                                                //console.log('AddFieldsButton.removeField() field=' + field);
        var addButton = this;
        var start = this.config.start;
                                                                                //console.log('AddFieldsButton.removeField() start=' + start);
        var parameters = addButton.up('panel');
                                                                                //console.log('AddFieldsButton.removeField() parameters=' + parameters);
        var container = addButton.up();
        if (field.newFields) {
            for (var j = 0; j < field.newFields.length; j++) {
                container.remove(field.newFields[j], true);
                addButton.index -= 1;
            }
        } else {
            container.remove(field, true);
            addButton.index -= 1;
        }
                                                                                //console.log('AddFieldsButton.removeField() addButton.index=' + addButton.index);
        var length = addButton.config.fields.length;
                                                                                //console.log('AddFieldsButton.removeField() length=' + length);
        var offset = 0;
                                                                                //console.log('AddFieldsButton.removeField() offset=' + offset);
        var factor = offset / length;
                                                                                //console.log('AddFieldsButton.removeField() factor=' + factor);
        var result = factor + 2;
                                                                                //console.log('AddFieldsButton.removeField() result=' + result);
        var indicator = parseInt(result);
                                                                                //console.log('AddFieldsButton.removeField() indicator=' + indicator);
        var loop = (addButton.index - 1) / length;
                                                                                //console.log('AddFieldsButton.removeField() loop=' + loop);
        var loop = parseInt(loop);
                                                                                //console.log('AddFieldsButton.removeField() loop=' + loop);
        for (var k = 0; k < loop; k++) {
            for (var i = 0; i < length; i++) {
                var field = addButton.config.fields[i];
                var labelTpl = field.items[i].labelTpl;
                var nameTpl = field.items[i].nameTpl;
                var label = labelTpl
                    ? labelTpl.replace('{index}', ('' + indicator))
                    : field.items[i].label;
                                                                                //console.log('AddFieldsButton.removeField() label=' + label);
                var name = nameTpl
                    ? nameTpl.replace('{index}', ('' + indicator))
                    : field.items[i].name;
                                                                                //console.log('AddFieldsButton.removeField() name=' + name);
                var at = start + i + (k * length) + 1;
                                                                                //console.log('AddFieldsButton.removeField() at=' + at);
                var panel = container.items.getAt(at);
                panel.innerItems[0].setLabel(label);
                panel.innerItems[0].setName(name);
            }
            indicator++;
        }
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
