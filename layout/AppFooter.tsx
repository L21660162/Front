/* eslint-disable @next/next/no-img-element */
import logo from './images/logo-sepret.png';

const AppFooter = () => {
  return (
    <div className="layout-footer">
      <a></a>
      <img src={logo} alt="Logo" height="45" className="mr-2" />
      <span className="font-medium fount-conalep-small" style={{ fontSize: '15px' }}>
        Tecnológico Nacional de México, Sede Matehuala
      </span>
      <a></a>
    </div>
  );
};

export default AppFooter;
