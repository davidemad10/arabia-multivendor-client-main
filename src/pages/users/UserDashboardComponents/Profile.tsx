import { t } from "i18next";

export default function Profile() {
  return (
    <div className="bg-white h-4/6 w-5/6 mx-auto my-16 p-10">
      <p className="text-gray-700 font-semibold">{t("PersonalInfo")}</p>
      {/* <form onSubmit={Formik}></form> */}
    </div>
  );
}
