import tw from "tailwind-styled-components";
import piano from "../../assets/Instrument/piano-svgrepo-com.svg";
import guitar from "../../assets/Instrument/guitar-svgrepo-com.svg";
import drum from "../../assets/Instrument/drum-svgrepo-com.svg";

const Container = tw.div`
  flex
  items-center
  justify-center
`;

const BaseButton = tw.button`
  text-lg
  font-bold
  text-gray-900
  bg-white
  border
  border-gray-200
  rounded-lg
  hover:bg-gray-100
  hover:text-blue-700
  focus:z-10
  focus:ring-2
  focus:ring-blue-700
  focus:text-blue-700
  my-2
`;

const Image = tw.img`
  w-7
  h-7
`;

const InstrumentVisualize = ({ instrument, changeVisualizeInstrument }) => {
  const renderContent = (instrument) => {
    if (instrument === "All") {
      return "All";
    } else {
      return (
        <Image
          src={
            instrument === "piano"
              ? piano
              : instrument === "guitar"
              ? guitar
              : drum
          }
          alt={instrument}
        />
      );
    }
  };

  return (
    <Container>
      <BaseButton onClick={() => changeVisualizeInstrument(instrument)}>
        {renderContent(instrument)}
      </BaseButton>
    </Container>
  );
};

export default InstrumentVisualize;
