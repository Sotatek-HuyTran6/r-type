import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Category } from 'types/category';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'types/redux';
import { useSelector } from 'react-redux';
import { getCategoryDetail } from 'redux/category/category-detail/actions';
import CustomForm from 'components/form/form';
import FormInput from 'components/form/form-input';
import { Validators } from 'utils/validate';
import CustomFormUploadFile from 'components/form/form-upload-file';
import CustomFormSelect from 'components/form/form-select';
import CustomFormTextArea from 'components/form/form-text-area';
import CustomFormGroupButton from 'components/form/form-group-button';
import CustomFormDatePicker from 'components/form/form-date-picker';
import moment from 'moment';
import { createAdmin } from 'redux/sub-admin/create-admin/actions';
import './style.scss';

interface Props {
  _id?: string;
}

function CreateAdmin() {
  const { loading: detailLoading, data: dataDetail } = useSelector(
    (state: RootState) => state.cateogryDetail,
  );
  const { loading: createLoading } = useSelector((state: RootState) => state.createCategory);
  const { loading: editLoading } = useSelector((state: RootState) => state.editCategory);
  const { _id } = useParams();

  const categoryList = useSelector((state: RootState) => state.categoryList);
  const { data: categoryListSearch } = categoryList;

  const loading = detailLoading || createLoading || editLoading;
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    email: '',
    firstName: '',
    lastName: '',
    gender: null,
    image: '',
    birthDate: null,
    intro: '',
    phoneNumber: '',
    password: '',
  });

  const handleSubmit = () => {
    const newSubAdmin = {
      ...form,
      image: form.image.fileKey,
      registerAt: new Date(),
    };

    if (_id) {
      console.log('edit');
    } else {
      dispatch(createAdmin(newSubAdmin, navigate));
    }
  };

  useEffect(() => {
    _id && dispatch(getCategoryDetail(_id));
  }, [_id, dispatch]);

  useEffect(() => {
    if (dataDetail._id && _id) {
      setForm({
        name: dataDetail.name,
        age: false,
        age1: false,
        age2: false,
      });
    }
  }, [_id, dataDetail]);

  return (
    <div className='create-sub-admin'>
      <Typography variant='h4' sx={{ marginBottom: '72px', color: '#bd93f9', fontWeight: '500' }}>
        {_id ? 'Edit category' : 'Create Admin'}
      </Typography>
      <div className='form-container'>
        <CustomForm
          submitForm={handleSubmit}
          initialState={form}
          setForm={setForm}
          style={{ display: 'flex', flexDirection: 'column' }}
          submitStyleButton={{ fontSize: '1rem' }}
          name='basic'
        >
          <FormInput
            type='text'
            label='Email'
            rules={[Validators.required, Validators.getMaxLength(50), Validators.email]}
            name='email'
            value={form.email}
            style={{ width: '50%' }}
          />
          <FormInput
            type='password'
            label='password'
            rules={[Validators.required, Validators.getMaxLength(50)]}
            name='password'
            value={form.password}
            style={{ width: '50%' }}
          />
          <FormInput
            type='text'
            label='First name'
            rules={[Validators.required, Validators.getMaxLength(50)]}
            name='firstName'
            value={form.firstName}
            style={{ width: '50%' }}
          />
          <FormInput
            type='text'
            label='Last name'
            rules={[Validators.required, Validators.getMaxLength(50)]}
            name='lastName'
            value={form.lastName}
            style={{ width: '50%' }}
          />
          <CustomFormUploadFile
            name='image'
            maxFileSize={500}
            label='Avatar'
            type='image'
            rules={[Validators.required]}
            style={{ width: '50%' }}
          />
          <FormInput
            type='number'
            label='Phone number'
            rules={[Validators.required, Validators.getMaxLength(50)]}
            name='phoneNumber'
            value={form.phoneNumber}
            style={{ width: '50%' }}
          />
          <CustomFormTextArea
            name='intro'
            value={form.intro}
            label='Introduce'
            style={{ width: '50%' }}
            rules={[Validators.getMaxLength(200)]}
          />
          <CustomFormGroupButton
            name='gender'
            label='Gender'
            buttonItems={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' },
            ]}
            value={form.gender}
            rules={[Validators.required]}
          />
          <CustomFormDatePicker
            name='birthDate'
            value={form.birthDate}
            label='Birth date'
            style={{ width: '50%' }}
            rules={[Validators.required]}
          />
        </CustomForm>
      </div>
    </div>
  );
}

export default CreateAdmin;
