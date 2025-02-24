export const FullScreenContainer = ({ children, styles }) => (
  <div className="f-s" style={{ display: "flex", height: "100%", flex: 1, ...styles }}>
    {children}
  </div>
);
