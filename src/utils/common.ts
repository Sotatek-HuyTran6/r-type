import { useDispatch } from 'react-redux';
import { AppDispatch } from 'types/redux';
import AxiosUtils from './axios-utils';
import { StorageKey, StorageUtils } from './session';
import { EventSourcePolyfill } from 'event-source-polyfill';

export const useAppdispatch: () => AppDispatch = useDispatch;

const uploadApi = (file: any, fileType: any) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const session = StorageUtils.getObject(StorageKey.SESSION);
    const progress = new EventSourcePolyfill('http://103.162.20.167/api/progress', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    progress.addEventListener('GUID', async (event: any) => {
      const guidValue = event.data;
      console.log('guid', guidValue);

      progress.addEventListener('progress', (event: any) => {
        const result = JSON.parse(event.data);
        if (result === '100') {
          console.log('100');
          progress.close();
        }
        progress.addEventListener('complete', (event: any) => {
          if (event.data === 'complete') {
            progress.close();
          }
        });
      });

      formData.append('GUID', guidValue);
      formData.append('file', file);
      formData.append('file_type', fileType);
      const res = await AxiosUtils.post('api/file', formData, {
        'Content-Type': 'multipart/form-data',
      });
      resolve(res);
    });
  });
};

export const handleUploadFile = async (file: any, fileType: any, limit?: string): Promise<any> => {
  // get progress
  const res = await uploadApi(file, fileType);
  return res;
};

export const handleDeleteFile = async (fileKey: any): Promise<any> => {
  // split file name
  const fileName = fileKey.split('/')[3];
  console.log(fileName);
  const res = await AxiosUtils.f_delete('api/file', { images: [fileName] });
  return res;
};
