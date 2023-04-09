import React from 'react';
import Header from './components/header';
import Menu from './components/menu';
import './style.scss';

interface Props {
  children: any;
}

function HeaderLayout({ children }: Props) {
  return (
    <div className='layout'>
      <Menu />
      <Header />
      <div className='children'>{children}</div>
    </div>
  );
}

export default HeaderLayout;
