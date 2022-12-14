'use strict';

const {
  utils: { stripTrailingHardline },
} = require('../document/index.js');
const { normalize } = require('./options.js');
const comments = require('./comments.js');

function printSubtree(path, print, options, printAstToDoc) {
  if (options.printer.embed && options.embeddedLanguageFormatting === 'auto') {
    return options.printer.embed(
      path,
      print,
      (text, partialNextOptions, textToDocOptions) =>
        textToDoc(
          text,
          partialNextOptions,
          options,
          printAstToDoc,
          textToDocOptions
        ),
      options
    );
  }
}

function textToDoc(
  text,
  partialNextOptions,
  parentOptions,
  printAstToDoc,
  // TODO: remove `stripTrailingHardline` in v3.0.0
  { stripTrailingHardline: shouldStripTrailingHardline = false } = {}
) {
  const nextOptions = normalize(
    {
      ...parentOptions,
      ...partialNextOptions,
      parentParser: parentOptions.parser,
      originalText: text,
    },
    { passThrough: true }
  );

  const result = require('./parser.js').parse(text, nextOptions);
  const { ast } = result;
  text = result.text;

  const astComments = ast.comments;
  delete ast.comments;
  comments.attach(astComments, ast, text, nextOptions);
  // @ts-expect-error -- Casting to `unique symbol` isn't allowed in JSDoc comment
  nextOptions[Symbol.for('comments')] = astComments || [];
  // @ts-expect-error -- Casting to `unique symbol` isn't allowed in JSDoc comment
  nextOptions[Symbol.for('tokens')] = ast.tokens || [];

  const doc = printAstToDoc(ast, nextOptions);
  comments.ensureAllCommentsPrinted(astComments);

  if (shouldStripTrailingHardline) {
    // TODO: move this to `stripTrailingHardline` function in `/src/document/doc-utils.js`
    if (typeof doc === 'string') {
      return doc.replace(/(?:\r?\n)*$/, '');
    }

    return stripTrailingHardline(doc);
  }

  /* istanbul ignore next */
  return doc;
}

module.exports = {
  printSubtree,
};
