import "./index.css";
import Single from "./single";
import TotalReview from "./total-review";

export default function PDCA() {
  return (
    <>
      <section className="single__wrapper">
        <Single title="Plan" placeholder="Planの内容" order={"Plan"} />
        <Single title="Do" placeholder="Doの内容" order={"Do"} />
        <Single title="Check" placeholder="Checkの内容" order={"Check"} />
        <Single title="Action" placeholder="Actionの内容" order={"Action"} />
      </section>

      <TotalReview />
    </>
  );
}
