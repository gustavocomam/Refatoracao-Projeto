import styled from "styled-components";

const Footer = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  max-width: 425px;
  background-color: var(--secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  position: fixed;
`;

function FooterComponent({ children }) {
  return <Footer>{children}</Footer>;
}
export default FooterComponent;
