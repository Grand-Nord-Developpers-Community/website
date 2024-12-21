import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import cpp from "highlight.js/lib/languages/cpp";

// load all languages with "all" or common languages with "common"
import { all, createLowlight } from "lowlight";

// eslint-disable-next-line
import CodeBlockComponent from "./editor/components/code-block";

// create a lowlight instance
const lowlight = createLowlight(all);

// you can also register individual languages
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
lowlight.register("cpp", cpp);

const codeBlockComponentElement = () => {
	return CodeBlockLowlight.extend({
		addNodeView() {
			//@ts-ignore
			return ReactNodeViewRenderer(CodeBlockComponent);
		},
	}).configure({ lowlight });
};

export default codeBlockComponentElement;
