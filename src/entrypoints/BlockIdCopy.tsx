import {Button, Canvas} from 'datocms-react-ui';
import type {RenderFieldExtensionCtx} from "datocms-plugin-sdk";


export const BlockIdCopy = ({ctx}: { ctx: RenderFieldExtensionCtx }) => {
    const {item} = ctx;
    return (
        <Canvas ctx={ctx}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
        </Canvas>
    );
};