import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/Logo/pazari-logo-dark.png";
import Image1 from "../../assets/Icons/master.png";
import Image2 from "../../assets/Icons/visa.png";
import Image3 from "../../assets/Icons/bancaIntesa.png";
import Image4 from "../../assets/Icons/img1.png";
import Image5 from "../../assets/Icons/img.png";
import Image6 from "../../assets/Icons/img3.png";
import Image7 from "../../assets/Icons/img4.png";
import Image8 from "../../assets/Icons/american.png";

const Footer = () => {
  return (
    <div className="mt-[7.75rem] bg-[#f7f7f7]">
      <div className="mx-[5rem] py-[2.625rem] flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white">
        <div>
          <Image src={Logo} width={214} height={45} alt="Pazari Logo" />
        </div>
        <div className="flex items-center gap-[5.625rem]">
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Besplatna dostava za
            </h1>
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Iznos preko <span className="text-[#e10000]">6.000 RSD</span>
            </h1>
          </div>{" "}
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Rok isporuke do
            </h1>
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              <span className="text-[#e10000]">2</span> radna dana
            </h1>
          </div>{" "}
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Povrat robe
            </h1>
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              U roku od <span className="text-[#e10000]">14</span> dana
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-[1.938rem]">
          <i className="fa-brands fa-instagram text-[#191919] font-bold text-3xl hover:text-[#c84d61] transition-all duration-300 hover:scale-110"></i>
          <i className="fa-brands fa-youtube text-[#191919] font-bold text-3xl hover:text-[#e10000] transition-all duration-300 hover:scale-110"></i>
          <i className="fa-brands fa-facebook-square text-[#191919] font-bold text-3xl hover:text-blue-500 transition-all duration-300 hover:scale-110"></i>
        </div>
      </div>
      <div className="mx-[5rem] py-[2.625rem] mt-[3.75rem] flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white text-[#191919]">
        <div className="flex items-center 2xl:gap-[150px] 3xl:gap-[220px]">
          <div className="flex flex-col self-start gap-[40px]">
            <h1 className="text-[1.063rem] font-bold">Korisnička podrška</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <span>Kako kupiti</span>
              <span>Reklamacije</span>
              <span>Povraćaj sredstava</span>
              <span>Zamena za isti artikal</span>
              <span>Zamena za drugi artikal</span>
              <span>Pravo na odustajanje</span>
            </div>
          </div>
          <div className="flex flex-col self-start gap-[40px]">
            <h1 className="text-[1.063rem] font-bold">O nama</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <span>Više o kompaniji Pazari</span>
              <span>Join Life</span>
              <span>Ponude za posao</span>
              <span>Štampa</span>
              <span>Naše prodavnice</span>
            </div>
          </div>
          <div className="flex flex-col self-start gap-[40px]">
            <h1 className="text-[1.063rem] font-bold">Možda te interesuje</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <span>StreetStyle</span>
              <span>Farmerice</span>
              <span>Trenerke</span>
              <span>Zimske jakne</span>
              <span>Obuća</span>
              <span>Outlet</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col self-start gap-[1.25rem] 2xl:max-w-[450px] 3xl:max-w-[578px]">
          <div className="flex items-center gap-1 ">
            <div>
              <Image
                src={Image1}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image2}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image3}
                width={200}
                height={70}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image4}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image5}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image6}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image7}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image8}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
          </div>
          <p className="text-[0.813rem] font-normal text-[#191919]">
            Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a
            plaćanje se vrši isključivo u dinarima. Isporuka se vrši SAMO na
            teritoriji Republike Srbije.
          </p>
          <p className="text-[0.813rem] font-normal text-[#191919]">
            Nastojimo da budemo što precizniji u opisu proizvoda, prikazu slika
            i samih cena, ali ne možemo garantovati da su sve informacije
            kompletne i bez grešaka. Svi artikli prikazani na sajtu su deo naše
            ponude i ne podrazumeva da su dostupni u svakom trenutku.
          </p>
        </div>
      </div>
      <div className="mx-[5rem] py-[1.25rem] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[0.813rem] font-normal text-[#191919]">
            Uslovi korišćenja •
          </p>
          <p className="text-[0.813rem] font-normal text-[#191919]">
            Zaštita privatnosti •
          </p>
          <p className="text-[0.813rem] font-normal text-[#191919]">
            Isporuka •
          </p>
          <p className="text-[0.813rem] font-normal text-[#191919]">
            Najčešća pitanja •
          </p>
          <p className="text-[0.813rem] font-normal text-[#191919]">
            Politika o 'Kolačićima'
          </p>
        </div>
        <p className="text-[0.813rem] font-normal text-[#191919]">
          &copy; 2023 Pazari.rs | Sva prava zadržana. Powered by{" "}
          <a href="https://www.croonus.com" target={"_blank"}>
            Croonus Technologies
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
