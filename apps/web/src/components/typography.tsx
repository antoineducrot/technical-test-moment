const H1: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h1
    {...props}
    className={`${className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`}
  >
    {children}
  </h1>
);

const H2: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h2
    {...props}
    className={`${className} scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`}
  >
    {children}
  </h2>
);

const H3: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3
    {...props}
    className={`${className} scroll-m-20 text-2xl font-semibold tracking-tight`}
  >
    {children}
  </h3>
);

const H4: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h4
    {...props}
    className={`${className} scroll-m-20 text-xl font-semibold tracking-tight`}
  >
    {children}
  </h4>
);

const H5: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h5
    {...props}
    className={`${className} scroll-m-20 text-lg font-semibold tracking-tight`}
  >
    {children}
  </h5>
);

const H6: React.FunctionComponent<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h6
    {...props}
    className={`${className} scroll-m-20 text-base font-semibold tracking-tight`}
  >
    {children}
  </h6>
);

const P: React.FunctionComponent<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ children, className, ...props }) => (
  <p {...props} className={`${className} leading-7 [&:not(:first-child)]:mt-6`}>
    {children}
  </p>
);

export { H1, H2, H3, H4, H5, H6, P };
