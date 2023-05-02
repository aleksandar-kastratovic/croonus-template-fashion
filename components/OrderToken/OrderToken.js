"use client";
import Image from "next/image";
import Image1 from "../../assets/uspesno.png";
import Link from "next/link";
const OrderSuccess = ({ order }) => {
  let conditions;
  if (order?.credit_card !== null && order) {
    if (order?.credit_card?.payment_status?.toLowerCase() === "approved") {
      conditions = (
        <div className="flex items-center justify-center py-10 text-center ">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-croonus-1 p-6">
            <div>
              <Image src={Image1} alt="404" width={130} height={130} />
            </div>
            <span className="text-lg font-medium">
              BROJ PORUDŽBENICE: {order?.order?.slug}
            </span>
            <span>
              Uspešno ste izvršili plaćanje, račun Vaše platne kartice je
              zadužen! SLEDI OBRADA PORUDŽBENICE NAKON ČEGA ĆETE DOBITI SVE
              POTREBNE INFORMACIJE PUTEM E-MAILA KOJIM STE SE REGISTROVALI.
            </span>
            <span>Podaci o transkciji:</span>
            <span className="text-lg font-medium">
              {" "}
              Autorizacioni kod:{" "}
              {order.credit_card.auth_code !== null
                ? order.credit_card.auth_code
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Status transakcije:{" "}
              {order.credit_card.payment_status !== null
                ? order.credit_card.payment_status
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Kod statusa transakcije:{" "}
              {order.credit_card.transaction_status_code !== null
                ? order.credit_card.transaction_status_code
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Datum transakcije:{" "}
              {order.credit_card.transaction_date !== null
                ? order.credit_card.transaction_date
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              Statusni kod 3D transakcije:{" "}
              {order.credit_card.status_code_3D_transaction !== null
                ? order.credit_card.status_code_3D_transaction
                : "-"}
            </span>
            <p className="mt-2 text-sm">
              Za sve dodatne informacije možete nas kontaktirati putem call
              centra {process.env.TELEPHONE} ili putem emaila{" "}
              {process.env.EMAIL}
            </p>
          </div>
        </div>
      );
    } else {
      conditions = (
        <div className="flex items-center justify-center py-10 text-center ">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-croonus-1 p-6">
            <div>
              <Image src={Image2} alt="404" width={130} height={130} />
            </div>

            <span className="text-lg font-medium">
              Plaćanje neuspešno, račun vaše platne kartice nije zadužen!
            </span>
            <span>
              Poštovani, Vaša kupovina je uspešno evidentirana ali plaćanje
              platnom karticom nije realizovano. Uskoro ćemo Vas kontaktirati
              radi realizacije Vaše kupovine.
            </span>

            <span className="text-lg font-medium">Podaci o transkciji:</span>
            <span className="text-lg font-medium">
              {" "}
              Autorizacioni kod:{" "}
              {order.credit_card.auth_code !== null
                ? order.credit_card.auth_code
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Status transakcije:{" "}
              {order.credit_card.payment_status !== null
                ? order.credit_card.payment_status
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Kod statusa transakcije:{" "}
              {order.credit_card.transaction_status_code !== null
                ? order.credit_card.transaction_status_code
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Datum transakcije:{" "}
              {order.credit_card.transaction_date !== null
                ? order.credit_card.transaction_date
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              Statusni kod 3D transakcije:{" "}
              {order.credit_card.status_code_3D_transaction !== null
                ? order.credit_card.status_code_3D_transaction
                : "-"}
            </span>
            <p className="mt-2 text-sm">
              Za sve dodatne informacije možete nas kontaktirati putem call
              centra {process.env.TELEPHONE} ili putem emaila{" "}
              {process.env.EMAIL}
            </p>
          </div>
        </div>
      );
    }
  } else {
    conditions = (
      <div className="mx-auto mt-5 w-[95%]   max-lg:text-center lg:mt-16 lg:w-[75%]">
        <div className="relative grid grid-cols-1 lg:grid-cols-1">
          <div className=" relative z-[50] col-span-1 place-self-center p-5">
            <Image src={Image1} width={600} height={600} />
          </div>
          <div className="relative -top-16 col-span-1 flex flex-col items-center justify-center rounded-lg bg-croonus-1 p-16">
            <h1 className="text-center text-xl font-semibold text-croonus-2">
              Uspešno ste kreirali porudžbenicu!
            </h1>{" "}
            <h1 className="text-center text-lg font-normal">
              Hvala Vam na ukazanom poverenju!{" "}
            </h1>
            <h2 className="mt-2.5 text-center text-lg font-medium ">
              Broj porudžbenice:{" "}
              <span className="uppercase">{order?.order?.slug}</span>
            </h2>
            <h2 className="mt-2.5 text-center text-lg font-medium">
              Status porudžbenice:{" "}
              <span className="font-semibold">Na čekanju</span>
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center">
              <p className="text-center text-base font-medium">
                Uskoro ćemo Vas kontaktirati u cilju dodatnog informisanja.
              </p>
              <p className="text-center text-base font-medium">
                Za sve dodatne informacije možete nas kontaktirati putem call
                centra ili putem e-maila.{" "}
              </p>
              <Link href="/">
                <button className="mt-10 place-self-center rounded-md bg-[#2bc48a] py-2 px-3  text-white hover:bg-opacity-80">
                  Nastavi kupovinu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className={["orderDataContainer"]}>{conditions}</div>;
};

export default OrderSuccess;
