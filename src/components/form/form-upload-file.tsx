/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { FormControl, IconButton, FormHelperText, Typography, Button, Box } from '@mui/material';
import { IValidator } from 'utils/validate';
import { handleDeleteFile, handleUploadFile } from 'utils/common';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';

interface Props {
  rules?: ((value: any) => IValidator)[];
  style?: any;
  name: string;
  maxFileSize: any;
  onChange?: any;
  type: 'image' | 'audio' | 'video';
  preId?: string;
  label: string;
  value?: any;
  previewStyle?: any;
}

const CustomFormUploadFile = forwardRef(
  (
    { rules, style, name, onChange, type, preId, maxFileSize, label, value, previewStyle }: Props,
    ref: any,
  ) => {
    const fileAccept = () => {
      switch (type) {
        case 'image':
          return 'image/png, image/jpeg, image/jpg';
        case 'audio':
          return 'audio/*';
        case 'video':
          return 'video/*';
        default:
          return 'image/png, image/jpeg, image/jpg';
      }
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>('');
    const uploadInputRef = useRef<HTMLInputElement>(null);

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

    const getFileExtension = (fileName: string) => {
      const lastDot = fileName.lastIndexOf('.');
      return fileName.substring(lastDot + 1);
    };

    const renderPreview = (fileUrl: string) => {
      if (fileUrl) {
        switch (type) {
          case 'image':
            return (
              <img
                onClick={() => window.open(fileUrl)}
                style={{ width: '100%', borderRadius: 8 }}
                src={fileUrl}
              ></img>
            );
          case 'video':
            return <ReactPlayer width={500} height={'100%'} controls url={fileUrl}></ReactPlayer>;
        }
      } else {
        return;
      }
    };

    const handleInputOnChange = async (e: any) => {
      const { name } = e.target;
      try {
        if (!e.target.files || e.target.files.length === 0) return;
        const fileDetail = e.target.files[0];
        const fileExtension = getFileExtension(fileDetail.name);
        const fileName = fileDetail.name;
        const newFile = new File([fileDetail], fileName, {
          type: fileDetail.type,
          lastModified: fileDetail.lastModified,
        });
        const fileSize = fileDetail.size;
        const fileSizeMb = fileSize / (1024 * 1024);
        setLoading(true);
        const fileUploaded = await handleUploadFile(newFile, type, String(maxFileSize));
        onChange({
          [name]: {
            fileKey: fileUploaded.data,
            fileUrl: fileUploaded.data,
          },
        });
      } catch (err) {
        onChange({
          [name]: {
            fileKey: '',
            fileUrl: '',
          },
        });
      }
      validate(e.target.value);
    };

    useImperativeHandle(ref, () => ({
      verifyAgain() {
        return validate(value);
      },
    }));

    const handleClickDelete = async (fileKey: string | number) => {
      try {
        await handleDeleteFile(fileKey);
        onChange({
          [name]: {
            fileKey: '',
            fileUrl: '',
          },
        });
      } catch (err: any) {
        console.log(err);
        setErr(err);
      }
    };

    const handleClickUpload = async () => {
      uploadInputRef?.current?.click();
    };

    const renderFileItem = () => {
      return (
        <Box
          sx={{
            border: `1px solid ${err ? '#d32f2f' : 'rgb(240, 240, 240)'}`,
            padding: '8px',
            borderRadius: '6px',
            minWidth: '260px',
            backgroundColor: 'rgb(240, 240, 240)',
            position: 'relative',
          }}
        >
          <Box sx={{ width: '100px', height: '100px' }}>
            {value?.fileUrl && (
              <div
                style={
                  previewStyle
                    ? previewStyle
                    : {
                        width: 120,
                        borderRadius: 8,
                        cursor: 'pointer',
                        position: 'relative',
                      }
                }
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    zIndex: 999999,
                    backgroundColor: 'white',
                    padding: 0.5,
                    '&:hover': {
                      backgroundColor: '#cccccc',
                    },
                  }}
                  color='secondary'
                  onClick={() => handleClickDelete(value.fileKey)}
                >
                  <DeleteOutlineIcon sx={{ fontSize: '1.1rem' }} />
                </IconButton>
                {renderPreview(value.fileUrl)}
              </div>
            )}
          </Box>

          <Box sx={{ marginTop: '32px' }}>
            <input
              style={{ display: 'none' }}
              name={name}
              type='file'
              onChange={(e) => handleInputOnChange(e)}
              onClick={(e: any) => (e.target.value = null)}
              id={`${preId}_${name}`}
              accept={fileAccept()}
              ref={uploadInputRef}
            ></input>
            <IconButton onClick={() => handleClickUpload()}>
              <UploadFileIcon></UploadFileIcon>
            </IconButton>
          </Box>
        </Box>
      );
    };

    return (
      <FormControl error={err ? true : false} style={style}>
        <Typography style={{ color: '#8be9fd' }}>{label}</Typography>
        {renderFileItem()}
        <FormHelperText id='my-helper-text'>{err}</FormHelperText>
      </FormControl>
    );
  },
);

export default CustomFormUploadFile;
