import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, createEditor, $getSelection } from 'lexical';
import { JSDOM } from 'jsdom';

export function convertHtmlToLexical(htmlString: string, fieldName: string): { [key: string]: any; } {
  const editor = createEditor();

  editor.update(
    () => {
      const nodes = $generateNodesFromDOM(
        editor,
        new JSDOM(htmlString).window.document
      );

      $getRoot().select();
      const selection = $getSelection();
      selection?.insertNodes(nodes);
    },
    { discrete: true }
  );

  const lexicalJson = editor.getEditorState().toJSON();

  return {
    [fieldName]: lexicalJson,
  };
}
