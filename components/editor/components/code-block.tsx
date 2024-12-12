/*import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';

import { findLanguage } from '../lib/code-block-language-loader';

let copiedTimeout: any;

const CodeBlock = ({
  node: { attrs, textContent },
  editor,
  extension,
  updateAttributes
}: NodeViewProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    setCopied(true);

    navigator.clipboard.writeText(textContent);

    copiedTimeout = setTimeout(() => {
      setCopied(false);
    }, 2500);
  }, [textContent]);

  useEffect(() => {
    return () => {
      clearTimeout(copiedTimeout);
    };
  }, []);


  return (
    <NodeViewWrapper className='relative group'>
      <pre className='not-prose'>
        <NodeViewContent
          as={'code'}
          className={`hljs language-${attrs['language']}`}
        ></NodeViewContent>
      </pre>

      <div
        className='absolute top-2 right-4 h-8 flex items-center transition-all'
        contentEditable={false}
      >
        <div className='min-w-fit px-2 h-8 text-xs font-sans text-slate-300 flex items-center justify-center cursor-pointer'>
          {findLanguage(attrs['language'])?.label}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='min-w-fit px-2 h-8 text-sm font-sans rounded text-black/80 bg-transparent hover:bg-[#e2e4e6] transition-all flex items-center justify-center outline-none'>
              {attrs['language']}
              <Icon name='ChevronDown' className='size-3.5 ml-0.5' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='h-[50vh] overflow-scroll '
            onFocusOutside={(e) => e.preventDefault()}
          >
            {languages.map((item: any) => (
              <DropdownMenuItem
                key={item}
                className={'p-2 text-sm'}
                onSelect={() => onLanguageSelect(item)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          className='aspect-square h-full rounded hover:bg-slate-800 text-slate-400 transition-all flex items-center justify-center'
          disabled={copied}
          onClick={onCopy}
        >
          {copied ? (
            <Icon name='CheckCheck' className='size-4 text-green-700'></Icon>
          ) : (
            <Icon name='Copy' className='size-4'></Icon>
          )}
        </button>
      </div>
    </NodeViewWrapper>
  );
};


export default CodeBlock;*/
import './CodeBlockComponent.scss'

import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React,{useState} from 'react'
import { Icon } from '../ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
//@ts-ignore
export default function CodeBlock ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }) {
  const [lang, setLang] = useState<string>("");
  return <NodeViewWrapper className="code-block">
    <select contentEditable={false} defaultValue={defaultLanguage} onChange={(event)=>{ updateAttributes({ language: event.target.value }); setLang(event.target.value)}} className='not-prose'>
      <option value="null">
        auto
      </option>
      <option disabled>
        —
      </option>
      {extension.options.lowlight.listLanguages().map(
        //@ts-ignore
        (l, index) => (
        <option key={index} value={l}>
          {l}
        </option>
      ))}
    </select>
    <pre className='not-prose'>
      <NodeViewContent as="code" className={`hljs language-${lang}`}/>
    </pre>
  </NodeViewWrapper>
}