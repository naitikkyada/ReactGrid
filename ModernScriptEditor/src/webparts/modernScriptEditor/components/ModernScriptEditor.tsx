import * as React from 'react';
import styles from './ModernScriptEditor.module.scss';
import { IModernScriptEditorProps } from './IModernScriptEditorProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class ModernScriptEditor extends React.Component<IModernScriptEditorProps, {}> {

  public constructor(props: IModernScriptEditorProps) {
    super(props);
  }

  public render(): React.ReactElement<IModernScriptEditorProps> {

    require('../assets/custom.js');
    return (
      <div>
        Hello there,
        this is the custom webpart to inject Chat Widget JS.
      </div>
    );
  }
}
