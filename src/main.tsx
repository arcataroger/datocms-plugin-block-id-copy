import {connect} from "datocms-plugin-sdk";
import "datocms-react-ui/styles.css";
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
    fieldDropdownActions(field) {
      if (field.attributes.field_type === 'rich_text') {
          return [
              {
                  id: 'menu1',
                  label: 'Menu 1',
                  icon: 'music',
                  actions: [
                      {
                          id: 'menu1-1',
                          label: 'Menu 1-1',
                          icon: 'music',

                      }
                  ]
              },
              {
                  id: 'menu2',
                  label: 'Menu 2',
                  icon: 'music',
                  actions: [
                      {
                          id: 'menu2-1',
                          label: 'Menu 2-1',
                          icon: 'music',

                      }
                  ]
              },
          ]
      }

      return []
    },
    async executeFieldDropdownAction(
        actionId,
        ctx
    ) {
        if (actionId === "menu1") {
            // Do something using ctx
            ctx.notice('Selected action A');
        } else if (actionId === "menu1-1") {
            // Do something else
            ctx.notice('Selected action B');
        } else if (actionId === "menu2") {
            // Do something else
            ctx.notice('Selected action C');
        }
    },

});
