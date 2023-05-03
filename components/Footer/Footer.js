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
import Instagram from "../../assets/Icons/instagram.png";
import Youtube from "../../assets/Icons/youtube.png";
import Facebook from "../../assets/Icons/facebook.png";
const Footer = () => {
  return (
    <div className="max-md:mt-[3rem] mt-[7.75rem] bg-[#f7f7f7]">
      <div className="mx-[5rem] max-md:flex-col py-[2.625rem] flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white">
        <div>
          <Image src={Logo} width={214} height={45} alt="Pazari Logo" />
        </div>
        <div className="flex max-md:flex-col max-md:gap-[2rem] max-md:mt-10 items-center gap-[5.625rem]">
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
        <div className="flex max-md:mt-10 items-center gap-[1.938rem]">
          <a
            href="https://www.instagram.com/pazarishop/?hl=en"
            target={"_blank"}
          >
            <Image
              src={Instagram}
              width={30}
              height={30}
              alt="Instagram"
              className="hover:scale-110 transition-all duration-300"
            />
          </a>
          <a
            href="https://www.youtube.com/channel/UCP3vHNQyS-6mJTX_l-VfaZw"
            target={"_blank"}
          >
            {" "}
            <Image
              src={Youtube}
              width={30}
              height={30}
              alt="Instagram"
              className="hover:scale-110 transition-all duration-300"
            />
          </a>
          <a href="https://www.facebook.com/pazarishop/" target={"_blank"}>
            <Image
              src={Facebook}
              width={30}
              height={30}
              alt="Instagram"
              className="hover:scale-110 transition-all duration-300"
            />
          </a>
        </div>
      </div>
      <div className="mx-[5rem] max-md:w-[95%] max-md:mx-auto py-[2.75rem] mt-[1.75rem] max-md:flex-col flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white text-[#191919]">
        <div className="flex items-center max-md:justify-between max-md:flex-wrap max-md:w-full 2xl:gap-[150px] 3xl:gap-[220px]">
          <div className="flex flex-col self-start gap-[40px]">
            <h1 className="text-[1.063rem] font-bold">Korisnička podrška</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                className="cursor-pointer hover:text-[#e10000]"
                href="/kako-kupiti"
              >
                Kako kupiti
              </Link>
              <Link
                className="cursor-pointer hover:text-[#e10000]"
                href="/reklamacije"
              >
                Reklamacije
              </Link>
              <Link
                className="cursor-pointer hover:text-[#e10000]"
                href="/kako-kupiti"
              >
                Povraćaj sredstava
              </Link>
              <Link
                className="cursor-pointer hover:text-[#e10000]"
                href="/kako-kupiti"
              >
                Zamena za isti artikal
              </Link>
              <Link
                className="cursor-pointer hover:text-[#e10000]"
                href="/kako-kupiti"
              >
                Zamena za drugi artikal
              </Link>
              <Link
                className="cursor-pointer hover:text-[#e10000]"
                href="/pravo-na-odustajanje"
              >
                Pravo na odustajanje
              </Link>
            </div>
          </div>
          <div className="flex flex-col self-start gap-[40px]">
            <h1 className="text-[1.063rem] font-bold">O nama</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <span className="cursor-pointer hover:text-[#e10000]">
                Više o kompaniji Pazari
              </span>
              <span className="cursor-pointer hover:text-[#e10000]">
                Join Life
              </span>
              <span className="cursor-pointer hover:text-[#e10000]">
                Ponude za posao
              </span>
              <span className="cursor-pointer hover:text-[#e10000]">
                Štampa
              </span>
              <span className="cursor-pointer hover:text-[#e10000]">
                Naše prodavnice
              </span>
            </div>
          </div>
          <div className="flex max-md:mt-10 flex-col self-start gap-[40px]">
            <h1 className="text-[1.063rem] font-bold">Možda te interesuje</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <span className="cursor-pointer hover:text-[#e10000]">
                StreetStyle
              </span>
              <span className="cursor-pointer hover:text-[#e10000]">
                Farmerice
              </span>
              <span className="cursor-pointer hover:text-[#e10000]">
                Trenerke
              </span>
              <span className="cursor-pointer hover:text-[#e10000]">
                Zimske jakne
              </span>
              <span className="cursor-pointer hover:text-[#e10000]">Obuća</span>
              <span className="cursor-pointer hover:text-[#e10000]">
                Outlet
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-md:mt-10 self-start gap-[1.25rem] 2xl:max-w-[450px] 3xl:max-w-[578px]">
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
          <p className="text-[0.813rem] font-normal text-[#191919] ">
            Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a
            plaćanje se vrši isključivo u dinarima. Isporuka se vrši SAMO na
            teritoriji Republike Srbije.
          </p>
          <p className="text-[0.813rem] font-normal text-[#191919] ">
            Nastojimo da budemo što precizniji u opisu proizvoda, prikazu slika
            i samih cena, ali ne možemo garantovati da su sve informacije
            kompletne i bez grešaka. Svi artikli prikazani na sajtu su deo naše
            ponude i ne podrazumeva da su dostupni u svakom trenutku.
          </p>
        </div>
      </div>
      <div className="mx-[5rem] max-md:flex-col max-md:gap-10 max-md:w-[95%] max-md:mx-auto py-[1.25rem] flex items-center justify-between">
        <div className="flex max-md:flex-wrap items-center gap-2">
          <Link
            href="/uslovi-koriscenja"
            className="text-[0.813rem] font-normal text-[#191919] hover:text-[#e10000] cursor-pointer"
          >
            Uslovi korišćenja •
          </Link>
          <Link
            href="/zastita-privatnosti"
            className="text-[0.813rem] font-normal text-[#191919] hover:text-[#e10000] cursor-pointer"
          >
            Zaštita privatnosti •
          </Link>
          <Link
            href="/isporuka"
            className="text-[0.813rem] font-normal text-[#191919] hover:text-[#e10000] cursor-pointer"
          >
            Isporuka •
          </Link>
          <Link
            href="/najcesca-pitanja"
            className="text-[0.813rem] font-normal text-[#191919] hover:text-[#e10000] cursor-pointer"
          >
            Najčešća pitanja •
          </Link>
          <Link
            href="/kolacici"
            className="text-[0.813rem] font-normal text-[#191919] hover:text-[#e10000] cursor-pointer"
          >
            Politika o 'Kolačićima'
          </Link>
        </div>
        <p className="text-[0.813rem] font-normal text-[#191919] ">
          &copy; {new Date().getFullYear()} Pazari.rs | Sva prava zadržana.
          Powered by{" "}
          <a
            href="https://www.croonus.com"
            target={"_blank"}
            className="hover:text-[#e10000] cursor-pointer"
          >
            Croonus Technologies
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
