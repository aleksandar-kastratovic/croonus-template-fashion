import Image from "next/image";
import Link from "next/link";
import Image1 from "../../assets/Icons/master (1).webp";
import Image2 from "../../assets/Icons/visa.webp";
import Image3 from "../../assets/Icons/bancaIntesa.webp";
import Image4 from "../../assets/Icons/img1.webp";
import Image5 from "../../assets/Icons/img.webp";
import Image6 from "../../assets/Icons/img3.webp";
import Image7 from "../../assets/Icons/img4.webp";
import Image8 from "../../assets/Icons/american.webp";
import Instagram from "../../assets/Icons/instagram.png";
import Youtube from "../../assets/Icons/youtube.png";
import Facebook from "../../assets/Icons/facebook.png";

const Footer = () => {
  return (
    <div className="max-md:mt-[3rem] mt-[7.75rem] bg-[#f7f7f7]">
      <div className="mx-[5rem] max-xl:flex-col py-[2.625rem] flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white">
        <div>
          <Link href={`/`}>
            <Image src={'/logo.png'} width={214} height={45} alt="Croonus Logo" />
          </Link>
        </div>
        <div className="flex max-xl:flex-col max-xl:gap-[2rem] max-xl:mt-10 items-center gap-[5.625rem]">
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Besplatna dostava za
            </h1>
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Iznos preko <span className="text-[#04b400]">6.000 RSD</span>
            </h1>
          </div>{" "}
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Rok isporuke do
            </h1>
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              <span className="text-[#04b400]">2</span> radna dana
            </h1>
          </div>{" "}
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Povrat robe
            </h1>
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              U roku od <span className="text-[#04b400]">14</span> dana
            </h1>
          </div>
        </div>
        <div className="flex max-xl:mt-10 items-center gap-[1.938rem]">
          <a
            href="https://www.instagram.com/lifeatcroonus/"
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
            href="https://www.youtube.com/channel/UCTCxl3sqxPqafMhOsKVVEMQ/videos?view_as=subscriber"
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
          <a href="https://www.facebook.com/Croonus/" target={"_blank"}>
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
      <div className="mx-[5rem] max-md:w-[95%] max-md:mx-auto py-[2.75rem] mt-[1.75rem] max-xl:flex-col flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white text-[#191919]">
        <div className="flex items-center max-md:justify-between max-md:flex-wrap max-md:w-full md:gap-[100px] 2xl:gap-[150px] 3xl:gap-[220px]">
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
                href="/povracaj-sredstava"
              >
                Povraćaj sredstava
              </Link>
              <Link
                className="cursor-pointer hover:text-[#e10000]"
                href="/zamena-za-isti-artikal"
              >
                Zamena za isti artikal
              </Link>
              <Link
                className="cursor-pointer hover:text-[#e10000]"
                href="/zamena-za-drugi-artikal"
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
              <Link
                href={`/stranica-u-izradi`}
                className="cursor-pointer hover:text-[#e10000]"
              >
                Više o kompaniji Croonus
              </Link>

              <Link
                href={`/stranica-u-izradi`}
                className="cursor-pointer hover:text-[#e10000]"
              >
                Ponude za posao
              </Link>

              <Link
                href={`/stranica-u-izradi`}
                className="cursor-pointer hover:text-[#e10000]"
              >
                Naše prodavnice
              </Link>
            </div>
          </div>
          <div className="flex max-[493px]:mt-10 flex-col self-start gap-[40px]">
            <h1 className="text-[1.063rem] font-bold">Možda te interesuje</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                href={`/kategorije/muska-odeca/farmerice`}
                className="cursor-pointer hover:text-[#e10000]"
              >
                Farmerice
              </Link>
              <Link
                href={`/kategorije/muska-odeca/komplet-trenerke`}
                className="cursor-pointer hover:text-[#e10000]"
              >
                Trenerke
              </Link>
              <Link
                href={`/kategorije/muska-odeca/zimske-jakne`}
                className="cursor-pointer hover:text-[#e10000]"
              >
                Zimske jakne
              </Link>
              <Link
                href={`/kategorije/muska-obuca`}
                className="cursor-pointer hover:text-[#e10000]"
              >
                Obuća
              </Link>
              {/*<span className="cursor-pointer hover:text-[#e10000]">*/}
              {/*  Outlet*/}
              {/*</span>*/}
            </div>
          </div>
        </div>
        <div className="flex max-xl:mt-5 flex-col max-md:mt-10 self-start gap-[1.25rem] max-xl:w-full xl:max-w-[450px] 2xl:max-w-[450px] 3xl:max-w-[578px]">
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
          &copy; {new Date().getFullYear()} Croonus.com | Sva prava zadržana.
          Powered by{" "}
          <a
            href="https://www.croonus.com"
            target={"_blank"}
            className="hover:text-[#e10000] cursor-pointer bganimatethumb relative"
          >
            Croonus Technologies
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
