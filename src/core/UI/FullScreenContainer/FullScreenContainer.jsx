export const FullScreenContainer = ({ children, styles }) => {
  console.log(styles);
  return (
    <div className="f-s" style={{ display: "flex", height: "100%", flex: 1, ...styles }}>
      {children}
    </div>
  );
};
