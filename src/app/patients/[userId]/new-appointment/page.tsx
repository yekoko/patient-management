import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient, getUser } from "@/lib/actions/patient.action";
import Image from "next/image";

const NewAppointment = async ({ params }: SearchParamProps) => {
  const { userId } = await params;
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-20 h-10 w-fit"
          />
          <AppointmentForm
            userId={userId}
            patientId={patient?.$id}
            type="create"
          />
          <p className="copyright py-12">©carepulse copyright</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};
export default NewAppointment;
