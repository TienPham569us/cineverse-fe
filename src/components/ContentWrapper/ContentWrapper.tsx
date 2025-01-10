import "./style.css";

const ContentWrapper = ({ children, className2 } : { children: React.ReactNode, className2?: string } ) => {
  return <div className={`contentWrapper ${className2 ? className2 : ''}`}>{children}</div>;
};

export default ContentWrapper;
