const Header = () => {
  const header = document.createElement('header');
  const h1 = document.createElement('h1');
  h1.innerText = 'Weather';

  header.appendChild(h1);
  return header;
};

export default Header;