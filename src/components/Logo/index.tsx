import logoImg from '@/assets/images/logo.svg';

function Logo() {
  return (
    <span className="logo">
      <span className="logo__shadow" />
      <img src={logoImg} className="logo__image" alt="" />
    </span>
  );
}

export default Logo;
