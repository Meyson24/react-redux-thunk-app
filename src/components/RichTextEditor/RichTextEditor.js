import React from 'react';
import {rules} from './rules.js'
import { Editor } from 'slate-react'
import Html from 'slate-html-serializer'
import { isKeyHotkey } from 'is-hotkey'
import {Button, Icon, Toolbar} from "./components";

const DEFAULT_NODE = 'paragraph';
const html = new Html({ rules });
const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        const defaultText = this.props.taskDescription || '';

        this.state = {
            value: html.deserialize(defaultText),
        }
    }

    onChange = ({ value }) => {
        const valueEditor = html.serialize(value);

        this.props.getTextOfEditor(valueEditor)
        this.setState({ value })
    };

    hasMark = type => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type)
    };

    ref = editor => {
        this.editor = editor
    };

    hasBlock = type => {
        const { value } = this.state;

        return value.blocks.some(node => node.type === type)
    };

    renderNode = (props, editor, next) => {
        switch (props.node.type) {
            case 'code':
                return (
                    <pre {...props.attributes}>
            <code>{props.children}</code>
          </pre>
                );
            case 'paragraph':
                return (
                    <p {...props.attributes} className={props.node.data.get('className')}>
                        {props.children}
                    </p>
                );
            case 'quote':
                return <blockquote {...props.attributes}>{props.children}</blockquote>
            default:
                return next()
        }
    };

    renderMark = (props, editor, next) => {
        const { mark, attributes } = props;
        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{props.children}</strong>;
            case 'italic':
                return <em {...attributes}>{props.children}</em>;
            case 'underline':
                return <u {...attributes}>{props.children}</u>;
            default:
                return next()
        }
    };

    renderMarkButton = (type, icon) => {
        const isActive = this.hasMark(type);

        return (
            <Button
                active={isActive}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <Icon>{icon}</Icon>
            </Button>
        )
    };

    renderBlockButton = (type, icon) => {
        let isActive = this.hasBlock(type)

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { value: { document, blocks } } = this.state;

            if (blocks.size > 0) {
                const parent = document.getParent(blocks.first().key);
                isActive = this.hasBlock('list-item') && parent && parent.type === type
            }
        }

        return (
            <Button
                active={isActive}
                onMouseDown={event => this.onClickBlock(event, type)}
            >
                <Icon>{icon}</Icon>
            </Button>
        )
    };

    onKeyDown = (event, editor, next) => {
        let mark;

        if (isBoldHotkey(event)) {
            mark = 'bold'
        } else if (isItalicHotkey(event)) {
            mark = 'italic'
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined'
        } else if (isCodeHotkey(event)) {
            mark = 'code'
        } else {
            return next()
        }

        event.preventDefault();
        editor.toggleMark(mark)
    };

    onClickBlock = (event, type) => {
        event.preventDefault();

        const { editor } = this;
        const { value } = editor;
        const { document } = value;

        // Handle everything but list buttons.
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                editor
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                editor.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item')
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            });

            if (isList && isType) {
                editor
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                editor
                    .unwrapBlock(
                        type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type)
            } else {
                editor.setBlocks('list-item').wrapBlock(type)
            }
        }
    }

    onClickMark = (event, type) => {
        event.preventDefault();
        this.editor.toggleMark(type)
    };

    render() {
        return (
            <>
                <Toolbar>
                    {this.renderMarkButton('bold', 'format_bold')}
                    {this.renderMarkButton('italic', 'format_italic')}
                    {this.renderMarkButton('underline', 'format_underlined')}
                    {this.renderBlockButton('code', 'code')}
                    {/*{this.renderBlockButton('heading-two', 'looks_two')}*/}
                    {/*{this.renderBlockButton('block-quote', 'format_quote')}*/}
                    {/*{this.renderBlockButton('numbered-list', 'format_list_numbered')}*/}
                    {/*{this.renderBlockButton('bulleted-list', 'format_list_bulleted')}*/}
                </Toolbar>
                <Editor
                    spellCheck
                    autoFocus
                    placeholder="Enter some rich text..."
                    ref={this.ref}
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderBlock={this.renderNode}
                    renderMark={this.renderMark}
                />
            </>
        );
    }
}

export default RichTextEditor;