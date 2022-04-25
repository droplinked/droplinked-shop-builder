import "./crashpunks.scss";
import ProfileTopSection from "../../components/features/top section/ProfileTopSection";


export default function Crashpunks() {
  return (
    <>
      
        <ProfileTopSection />

        <div className="body-wrapper d-flex justify-content-center">
          <iframe
            src="https://blocksurvey.io/survey/t/6de8a3bb-08d4-46bc-b3db-fafc5e2697c3/r/o"
            className="frame col-12 col-md-8"
          ></iframe>
        </div>
      
    </>
  );
}



