import "./MgContainer.css";
export const MgContainer = ({ children, href, style }) => {
  let styles = {};
  if (href) {
    styles = {
        backgroundImage: `url(${href})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };
  }
  return (
    <div className="mg-container" style={{ ...styles, ...style }}>
      {children}
    </div>
  );
};
