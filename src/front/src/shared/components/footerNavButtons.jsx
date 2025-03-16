import styled from "styled-components";
import NextButton from "./nextButton";
import PrevButton from "./prevButton";

const Footer = styled.div`
  width: 100%;
  height: 60px;
  max-width: 425px;
  background-color: var(--secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  position: fixed;
`;

function FooterNavButtons({ onClickNext, onClickPrev }) {
  return (
    <Footer>
      {onClickPrev && <PrevButton onClick={onClickPrev} />}
      {onClickNext && <NextButton onClick={onClickNext} />}
    </Footer>
  );
}
export default FooterNavButtons;
