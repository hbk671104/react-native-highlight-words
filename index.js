import React, {PropTypes} from 'react';
import {Text} from 'react-native';
import {findAll} from 'highlight-words-core';

Highlighter.defaultProps = {
    onSearchWordTap : () => {}
}
    
Highlighter.propTypes = {
    autoEscape: PropTypes.bool,
    highlightStyle: Text.propTypes.style,
    searchWords: PropTypes.arrayOf(PropTypes.string).isRequired,
    textToHighlight: PropTypes.string.isRequired,
    sanitize: PropTypes.func,
    style: Text.propTypes.style,
    onSearchWordTap : PropTypes.func
};

/**
* Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
* This function returns an array of strings and <Text> elements (wrapping highlighted words).
*/
export default function Highlighter({
    autoEscape,
    highlightStyle,
    searchWords,
    textToHighlight,
    sanitize,
    style,
    onSearchWordTap,
    ...props
}) {
    const chunks = findAll({textToHighlight, searchWords, sanitize, autoEscape});

    return (
        <Text style={style} {...props}>
            {chunks.map((chunk, index) => {
                const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);

                return (!chunk.highlight)
                    ? text
                    : (
                        <Text
                            key={index}
                            onPress={() => onSearchWordTap(text)}
                            style={chunk.highlight && highlightStyle}
                        >
                            {text}
                        </Text>
                    );
            })}
        </Text>
    );
}
