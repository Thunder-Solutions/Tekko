import React from 'react';
import css from './page.module.css';

type PageProps = React.PropsWithChildren

const Page = ({ children }: PageProps) => {
  return (
    <main className={css.page}>
      {children}
    </main>
  );
}

export default Page;
