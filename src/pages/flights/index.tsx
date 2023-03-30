import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import Flights from '@/features/flights/components/Flights';

const FlightsPage = () => {
  return (
    <>
      <BaseTemplate>
        <Flights />
      </BaseTemplate>
    </>
  );
};

export default FlightsPage;
