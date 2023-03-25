import BaseTemplate from '@/common/components/baseTemplate/BaseTemplate';
import UserTickets from '@/features/userTicketsPreview/components/UserTickets';
export default function TicketsPreview() {
  return (
    <>
      <BaseTemplate>
        <UserTickets />
      </BaseTemplate>
    </>
  );
}
