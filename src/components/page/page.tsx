import React from 'react';
import { Scope, css } from 'react-shadow-scope';

const stylesheet = css`
.page {
  background-color: var(--color-site-1);
}
`;

type PageProps = React.PropsWithChildren

const Page = ({ children }: PageProps) => {
  return (
    <Scope stylesheet={stylesheet}>
      <main className="page">
        {children}
      </main>
    </Scope>
  );
}

export default Page;
