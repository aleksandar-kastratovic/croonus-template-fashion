"use client";
import { useState } from "react";

const Povracaj = () => {
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-[1.2rem] prose md:mt-[9rem] w-[95%] mx-auto md:w-[60%]">
      <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
        Pravo na odustajanje{" "}
      </h1>
      <section
        className=" elementor-section elementor-top-section elementor-element elementor-element-0a8acc7 elementor-section-full_width elementor-section-height-min-height elementor-section-height-default elementor-section-items-middle"
        data-id="0a8acc7"
        data-element_type="section"
      >
        <div className="elementor-container elementor-column-gap-no">
          <div
            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-a6a340b"
            data-id="a6a340b"
            data-element_type="column"
          >
            <div className="elementor-widget-wrap elementor-element-populated">
              <div
                className="elementor-element elementor-element-c66c04d elementor-widget elementor-widget-heading"
                data-id="c66c04d"
                data-element_type="widget"
                data-widget_type="heading.default"
              ></div>
              <div
                className="elementor-element elementor-element-7058982 elementor-widget elementor-widget-woocommerce-breadcrumb"
                data-id="7058982"
                data-element_type="widget"
                data-widget_type="woocommerce-breadcrumb.default"
              ></div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="elementor-section flex flex-col gap-3 elementor-top-section elementor-element elementor-element-3902c11 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
        data-id="3902c11"
        data-element_type="section"
      >
        <div className="elementor-container elementor-column-gap-no">
          <div
            className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-8d3493f"
            data-id="8d3493f"
            data-element_type="column"
          >
            <div className="elementor-widget-wrap elementor-element-populated">
              <div
                className="elementor-element elementor-element-6f411518 elementor-widget elementor-widget-text-editor"
                data-id="6f411518"
                data-element_type="widget"
                data-widget_type="text-editor.default"
              >
                <div className="elementor-widget-container">
                  <div className="page-title-wrapper">
                    <div className="container">
                      <div className="page-title-wrapper">
                        <div className="container">
                          <div className="page-title-wrapper">
                            <div className="container">
                              <p>
                                U slučaju odustanka od ugovora potro&scaron;ač
                                ima pravo na povraćaj novca ili na zamenu za
                                drugi proizvod. Iznos plaćene robe kupcu se
                                vraća po prijemu proizvoda koji vraća zbog
                                odustanka od ugovora, pod uslovom da se utvrdi
                                da je proizvod neo&scaron;tećen, tj. ispravan.
                              </p>
                              <p>
                                Trgovac je dužan da potro&scaron;aču bez
                                odlaganja vrati iznos koji je potro&scaron;ač
                                platio po osnovu ugovora, a najkasnije u roku od
                                14 dana od dana prijema izjave o odustanku,
                                odnosno od prijema proizvoda koji kupac vraća
                                zbog odustanka od ugovora.
                              </p>
                              <p>
                                Tro&scaron;kove vraćanja robe snosi kupac, osim
                                u slučajevima kada je kupac dobio neispravan ili
                                pogre&scaron;an artikal.
                              </p>
                              <p></p>
                              <h5>
                                <strong>Procedura za povraćaj sredstava</strong>
                              </h5>
                              <p>
                                Da bi se izvr&scaron;io povraćaj novčanih
                                sredstava potrebni su nam sledeći podaci:
                              </p>
                              <ul>
                                <li>Va&scaron;i lični podaci;</li>
                                <li>
                                  Broj kupovnog računa (račun ste dobili uz
                                  kupljeni proizvod);
                                </li>
                                <li>
                                  Broj dinarskog tekućeg računa, na koji će biti
                                  uplaćena novčana sredstva (u slučaju da je
                                  plaćanje izvr&scaron;eno pouzećem);
                                </li>
                                <li>Broj lične karte;</li>
                              </ul>
                              <p>
                                Tražene podatke možete nam dostaviti
                                popunjavanjem forme ispod teksta.
                                <br />
                                Povraćaj sredstava se vr&scaron;i isključivo
                                uplatom na dinarski tekući račun kada je
                                plaćanje izvr&scaron;eno pouzećem.
                                <br />U slučaju da je plaćanje izvr&scaron;eno
                                platnom karticom, povraćaj sredstava se
                                vr&scaron;i uplatom na račun sa kog je
                                izvr&scaron;eno plaćanje.
                                <br />
                                Povraćaj novčanih sredstava se ne može zahtevati
                                odlaskom u neki od maloprodajnih objekata
                                PAZARI-ja.
                              </p>
                              <p>
                                U slučaju vraćanja robe ili povraćaja sredstava
                                kupcu koji je prethodno izvr&scaron;io plaćanje
                                nekom od platnih kartica (delimično ili u
                                celosti), a bez obzira na razlog vraćanja,
                                PAZARI internet prodavnica je u obavezi da
                                povraćaj izvr&scaron;i isključivo putem VISA i
                                Mastercard metoda plaćanja, tako &scaron;to će
                                banka na zahtev prodavca obaviti povraćaj
                                sredstava na račun korisnika kartice.
                              </p>
                              <p>
                                Ukoliko iz nekog razloga ne možete poslati
                                zahtev za povraćaj novčanih sredstava preko
                                forme za povraćaj sredstava, možete nas
                                kontaktirati preko telefona 060/588 8564.
                                <br />
                                Takođe, ako imate dodatna pitanja, uvek nas
                                možete kontaktirati preko istog broja telefona.
                                <br />
                                Va&scaron; PAZARI
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`mt-10`}>
        <h1 className={`text-lg font-medium`}>Podaci o firmi</h1>
        <form
          className={`mt-10 grid max-md:grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-3`}
        >
          <div className={`col-span-1 flex flex-col items-start`}>
            <label className={`text-base font-light`}>Naziv firme</label>
            <input
              type={`text`}
              disabled
              value={`Pazari`}
              className={`mt-1 w-full border border-[#e0e0e0]`}
            />
          </div>
          <div className={`col-span-1 flex flex-col items-start`}>
            <label className={`text-base font-light`}>Adresa</label>
            <input
              type={`text`}
              disabled
              value={`Paralovo bb, 36300 Novi Pazar`}
              className={`mt-1 w-full border border-[#e0e0e0]`}
            />
          </div>
          <div className={`col-span-1 flex flex-col items-start`}>
            <label className={`text-base font-light`}>Broj telefona</label>
            <input
              type={`text`}
              disabled
              value={`+381 60 588 8564`}
              className={`mt-1 w-full border border-[#e0e0e0]`}
            />
          </div>
          <div className={`col-span-1 flex flex-col items-start`}>
            <label className={`text-base font-light`}>Email</label>
            <input
              type={`text`}
              disabled
              value={`info@pazari.rs`}
              className={`mt-1 w-full border border-[#e0e0e0]`}
            />
          </div>
          <div className={`col-span-1 md:col-span-2 text-left mt-5`}>
            <h1 className={`text-lg font-medium`}>Podaci o potrošaču</h1>
          </div>
          <div className={`mt-5 col-span-1 md:col-span-2 flex flex-col`}>
            <label className={`text-base font-light`}>
              Ovim obaveštavam da odustajem od ugovora o prodaji sledeće
              robe/usluge
            </label>
            <textarea
              type={`text`}
              disabled={false}
              name={`message`}
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`mt-1 w-full border border-[#e0e0e0]`}
            />
          </div>
          <div className={`col-span-1 flex flex-col items-start`}>
            <label className={`text-base font-light`}>
              Datum zaključenja ugovora{" "}
            </label>
            <input
              type={`date`}
              disabled={false}
              value={``}
              className={`mt-1 w-full border border-[#e0e0e0]`}
            />
          </div>
          <div className={`col-span-1 flex flex-col items-start`}>
            <label className={`text-base font-light`}>
              Datum zaključenja ugovora{" "}
            </label>
            <input
              type={`date`}
              disabled={false}
              value={``}
              className={`mt-1 w-full border border-[#e0e0e0]`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Povracaj;
