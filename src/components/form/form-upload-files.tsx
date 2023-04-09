/* eslint-disable react/display-name */
import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { handleUploadFile, handleDeleteFile } from 'utils/common';
import { IValidator } from 'utils/validate';
import { FormControl, IconButton, FormHelperText, Typography, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';

interface fileDir {
  fileKey: string;
  fileUrl: string;
}

interface Props {
  rules?: ((value: any) => IValidator)[];
  style?: any;
  name: string;
  maxFileSize: any;
  onChange?: any;
  type?: string;
  preId?: string;
  label: string;
  value?: fileDir[];
  previewStyle?: any;
}

interface InputButtonProps {
  name: string;
  index: number;
  type?: string;
  onChange: any;
  preId?: string;
}

const InputButton = ({ name, index, type, onChange, preId }: InputButtonProps) => {
  const inputRef = useRef<any>(null);
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

  const handleInputOnChange = (e: any, index: number) => {
    onChange(e, index);
  };

  const handleClickUpload = async () => {
    inputRef.current.click();
  };

  return (
    <Box sx={{ marginTop: '32px' }}>
      <input
        style={{ display: 'none' }}
        name={name}
        type='file'
        onChange={(e) => handleInputOnChange(e, index)}
        onClick={(e: any) => (e.target.value = null)}
        id={`${preId}_${name}_${index}`}
        accept={fileAccept()}
        ref={inputRef}
      ></input>
      <IconButton onClick={() => handleClickUpload()}>
        <UploadFileIcon></UploadFileIcon>
      </IconButton>
    </Box>
  );
};

const CustomFormUploadFiles = forwardRef(
  (
    {
      rules,
      style,
      name,
      onChange,
      type,
      preId,
      maxFileSize,
      label,
      value = [{ fileKey: '', fileUrl: '' }],
      previewStyle,
    }: Props,
    ref: any,
  ) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>('');

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
        const link = fileUrl;
        return (
          <img
            onClick={() => window.open(link)}
            style={{ width: '100%', borderRadius: 8 }}
            src={link}
          ></img>
        );
      } else {
        return;
      }
    };

    const handleInputOnChange = async (e: any, index: number) => {
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

        const newArray = value;
        newArray[index] = {
          fileKey: fileUploaded.data,
          fileUrl: fileUploaded.data,
        };
        onChange({
          [name]: newArray,
        });
      } catch (err) {
        const newArray = value;
        newArray[index] = {
          fileKey: '',
          fileUrl: '',
        };
        onChange({
          [name]: newArray,
        });
      }
    };

    useImperativeHandle(ref, () => ({
      verifyAgain() {
        return validate(value);
      },
    }));

    const handleClickDelete = async (index: number) => {
      try {
        await handleDeleteFile(value[index].fileKey);
        const newArray = value;
        newArray[index] = {
          fileKey: '',
          fileUrl: '',
        };
        onChange({
          [name]: newArray,
        });
      } catch (err: any) {
        setErr(err);
      }
    };

    const handleAddFile = () => {
      onChange({
        [name]: [
          ...value,
          {
            fileKey: '',
            fileUrl: '',
          },
        ],
      });
    };

    const handleCloseFileUpload = async (index: number) => {
      if (value[index].fileKey) {
        await handleDeleteFile(value[index].fileKey);
      }
      const newArray = value;
      newArray.splice(index, 1);
      onChange({
        [name]: newArray,
      });
    };

    const renderUploadFileItem = () => {
      return value.map((item: any, index: any) => {
        return (
          <Box
            key={index}
            sx={{
              border: '1px solid #dadada',
              padding: '8px',
              borderRadius: '6px',
              minWidth: '260px',
              backgroundColor: 'rgb(230, 230, 230)',
              position: 'relative',
            }}
          >
            <IconButton
              sx={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => handleCloseFileUpload(index)}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
            <Box sx={{ width: '100px', height: '100px' }}>
              {value[index].fileUrl && (
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
                    onClick={() => handleClickDelete(index)}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: '1.1rem' }} />
                  </IconButton>
                  {renderPreview(value[index].fileUrl)}
                </div>
              )}
            </Box>

            <InputButton
              name={name}
              index={index}
              type={type}
              onChange={handleInputOnChange}
              preId={preId}
            ></InputButton>
          </Box>
        );
      });
    };

    return (
      <FormControl error={err ? true : false} style={style}>
        <Typography>{label}</Typography>
        <Box sx={{ border: '1px solid #dadada', borderRadius: '6px', padding: '12px 24px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '32px' }}>
            {renderUploadFileItem()}
          </Box>
          <FormHelperText id='my-helper-text'>{err}</FormHelperText>
          <Box>
            <IconButton
              sx={{
                top: 4,
                right: 4,
                zIndex: 999,
                backgroundColor: 'white',
                padding: 0.5,
                '&:hover': {
                  backgroundColor: '#cccccc',
                },
              }}
              color='secondary'
              onClick={handleAddFile}
            >
              <AddCircleIcon sx={{ fontSize: '1.8rem' }}></AddCircleIcon>
            </IconButton>
          </Box>
        </Box>
      </FormControl>
    );
  },
);

export default CustomFormUploadFiles;
