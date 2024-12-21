import React, { memo, useCallback } from 'react';
import { Toolbar } from '../ui/toolbar';
import { Icon } from '../ui/icon';
import { useActive } from '../hooks/use-active';
import { Editor } from '@tiptap/core';

interface MenuButtonQuoteProps {
  editor: Editor;
}

const MenuButtonBlockquote = ({ editor }: MenuButtonQuoteProps) => {
  const isCodeActive = useActive(editor, 'code');
  const onCode= useCallback(
    () => editor.chain().focus().toggleCode().run(),
    [editor]
  );

  return (
    <Toolbar.Button
      tooltip='Code'
      //tooltipShortcut={['Mod', 'Shift', 'B']}
      active={isCodeActive}
      onClick={onCode}
    >
      <Icon name='Code' />
    </Toolbar.Button>
  );
};

export default memo(MenuButtonBlockquote, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
