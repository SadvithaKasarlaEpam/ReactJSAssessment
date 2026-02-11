import React, { type PropsWithChildren } from "react";

export interface titletype extends PropsWithChildren {
  title: string;
  footer: React.ReactNode;
}

const Title = ({ title, children, footer }: titletype) => {
  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p> {footer}</p>
      </footer>
    </>
  );
};

export default Title;
