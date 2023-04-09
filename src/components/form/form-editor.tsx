/* eslint-disable react/display-name */
import React, { useImperativeHandle, forwardRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import { Box, Typography } from '@mui/material';
import 'suneditor/dist/css/suneditor.min.css';

interface Props {
  rules?: any;
  style?: any;
  name: string;
  value?: any;
  onChange?: any;
  label?: string;
}

const defaultFonts = [
  'Arial',
  'Comic Sans MS',
  'Courier New',
  'Impact',
  'Georgia',
  'Tahoma',
  'Trebuchet MS',
  'Verdana',
];

const CustomFormEditor = forwardRef(
  ({ rules, style, name, value, onChange, label }: Props, ref: any) => {
    const [err, setErr] = useState<string>('');

    const sortedFontOptions = [
      ...defaultFonts,
      'Logical',
      'Salesforce Sans',
      'Garamond',
      'Sans-Serif',
      'Serif',
      'Times New Roman',
      'Helvetica',
    ].sort();

    const validate = (inputValue: any) => {
      let isOk = true;
      Array.isArray(rules) &&
        rules.every((validate) => {
          const { error, message } = validate(inputValue);
          if (error) {
            isOk = false;
            setErr(message);
            return false;
          } else {
            setErr('');
            return true;
          }
        });
      return isOk;
    };

    const handleOnchangeEditor = (content: any) => {
      onChange({
        [name]: content,
      });
      validate(content);
    };

    useImperativeHandle(ref, () => ({
      verifyAgain() {
        return validate(value);
      },
    }));

    return (
      <Box>
        <Typography>{label}</Typography>
        <SunEditor
          setDefaultStyle=''
          setContents={value}
          onChange={handleOnchangeEditor}
          setOptions={{
            buttonList: [
              ['undo', 'redo'],
              ['font', 'fontSize'],
              // ['paragraphStyle', 'blockquote'],
              ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
              ['fontColor', 'hiliteColor'],
              ['align', 'list', 'lineHeight'],
              ['outdent', 'indent'],

              ['table', 'horizontalRule', 'link'],
              // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
              // ['imageGallery'], // You must add the "imageGalleryUrl".
              ['codeView'],
              // ['preview', 'print'],
              ['removeFormat'],

              // ['save', 'template'],
              // '/', Line break
            ], // Or Array of button list, eg. [['font', 'align'], ['image']]
            defaultTag: 'div',
            minHeight: '300px',
            showPathLabel: false,
            font: sortedFontOptions,
          }}
        ></SunEditor>
      </Box>
    );
  },
);

export default CustomFormEditor;
