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
    }
});
