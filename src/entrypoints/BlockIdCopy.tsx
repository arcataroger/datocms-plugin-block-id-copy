import React, { useState } from 'react';
import { Canvas, Section } from 'datocms-react-ui';
import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';

interface MCFBlock {
    title?: string | null;
    embedded_modular_content?: MCFBlock[];
    itemId: string;
    itemTypeId: string;
}

/**
 * A tiny component that displays "Copied!"
 * and transitions from green to black over one second.
 */
const CopiedIndicator = () => {
    return (
        <span style={{color: 'green'}}>
      &nbsp;Copied!
    </span>
    );
};

/**
 * Recursively renders a nested <ul>/<li> structure of MCFBlock items.
 * When a <li> is clicked, it calls `onClickItem(block.itemId)`.
 * If `clickedItemId` matches the current block, it shows the <CopiedIndicator>.
 */
const MCFNestedList: React.FC<{
    blocks: MCFBlock[];
    clickedItemId: string | null;
    onClickItem: (itemId: string) => void;
}> = ({ blocks, clickedItemId, onClickItem }) => {
    if (!blocks || blocks.length === 0) return null;

    return (
        <ul>
            {blocks.map((block) => {
                const hasChildren = !!block.embedded_modular_content?.length;

                return (
                    <li
                        key={block.itemId}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent clicks from bubbling up
                            onClickItem(block.itemId);
                        }}
                        style={{ cursor: 'pointer', margin: '4px 0' }}
                    >
                        {block.title ?? 'Untitled'} (<strong>{block.itemId}</strong>)
                        {/* Show "Copied!" if this item is the last clicked */}
                        {clickedItemId === block.itemId && <CopiedIndicator />}

                        {/* Recursively render children */}
                        {hasChildren && (
                            <MCFNestedList
                                blocks={block.embedded_modular_content!}
                                clickedItemId={clickedItemId}
                                onClickItem={onClickItem}
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

/**
 * Main component: Renders a nested list of blocks with a "Copied!" fade effect.
 */
export const BlockIdCopy = ({ ctx }: { ctx: RenderFieldExtensionCtx }) => {
    const { formValues, fieldPath } = ctx;
    const blocks = formValues[fieldPath] as MCFBlock[]; // Your top-level array of blocks

    const [clickedItemId, setClickedItemId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    /**
     * Handles clicking on a block by copying itemId and marking it as "clicked".
     */
    const handleClickItem = (itemId: string) => {
        navigator.clipboard.writeText(itemId).catch((err) => {
            console.error('Failed to copy:', err);
        });
        setClickedItemId(itemId);
    };

    return (
        <Canvas ctx={ctx}>
            <Section title="Block IDs for copying" collapsible={{isOpen: isOpen, onToggle: () => setIsOpen(!isOpen)}}>
                <MCFNestedList
                    blocks={blocks}
                    clickedItemId={clickedItemId}
                    onClickItem={handleClickItem}
                />
            </Section>
        </Canvas>
    );
};