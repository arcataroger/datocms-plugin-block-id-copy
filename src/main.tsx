import {connect} from "datocms-plugin-sdk";
import "datocms-react-ui/styles.css";
import ConfigScreen from "./entrypoints/ConfigScreen";
import {render} from "./utils/render";
import {BlockIdCopy} from "./entrypoints/BlockIdCopy.tsx";

connect({
    manualFieldExtensions() {
        return [
            {
                id: 'blockIdCopy',
                name: 'Block ID Copy',
				type: 'addon',
				fieldTypes: ['rich_text', 'structured_text']
            }
        ]
    },
    renderFieldExtension(id, ctx) {
        if (id === 'blockIdCopy') {
            render(<BlockIdCopy ctx={ctx}/>)
        }
    },
    fieldDropdownActions(field, ctx) {
      if (field.attributes.field_type === 'rich_text') {
          return [
              {
                  id: 'blockIdCopy',
                  label: 'Copy block ID',
                  icon: 'music',
                  actions: [
                      {
                          id: 'test2',
                          label: 'Copy block ID',
                          icon: 'music',

                      }
                  ]
              },
              {
                  id: 'test3',
                  label: 'Test2',
                  icon: 'music',
                  actions: [
                      {
                          id: 'test5',
                          label: 'Copy block ID',
                          icon: 'music',

                      }
                  ]
              },
          ]
      }

      return []
    }

});
