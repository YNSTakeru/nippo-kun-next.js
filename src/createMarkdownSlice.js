import { createSlice } from '@reduxjs/toolkit';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const createMarkdownSlice = (name) => {
    return createSlice({
        name,
        initialState: { markdown: '', html: '' },
        reducers: {
            setMarkdown: (state, action) => {
                state.markdown = action.payload;
                const markedText = marked(action.payload, {
                    gfm: true,
                    breaks: true,
                });
                state.html = sanitizeHtml(markedText, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                    allowedAttributes: {
                        a: ['href', 'name', 'target'],
                        img: ['src', 'alt'],
                    },
                });
            },
            setHTML: (state, action) => {
                state.html = action.payload;
            }
        },
    });
};

const digressionSlice = createMarkdownSlice('digression');
const helpSlice = createMarkdownSlice('help');

export const { setMarkdown: setDigressionMarkdown, setHTML: setDigressionHTML } = digressionSlice.actions;
export const { setMarkdown: setHelpMarkdown, setHTML: setHelpHTML } = helpSlice.actions;

export const rootReducer = {
    digression: digressionSlice.reducer,
    help: helpSlice.reducer,
};
