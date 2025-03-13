import "./ActionBlock.scss";
export const ActionBlock = ({ children, styles }) => (
  <div className="action" style={{ ...styles }}>
    <span className="action__text">{children}</span>
  </div>
);
