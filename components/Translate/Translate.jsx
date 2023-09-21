"use client";
import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const Translate = () => {
  const baseLanguage = "/auto/sr-Latn";
  const languages = [
    { label: `Srpski`, value: "/auto/sr-Latn", shortLabel: 'SRB'},
    { label: "Engleski", value: "/auto/en", shortLabel: 'EN' },
    { label: "Nemački", value: "/auto/de", shortLabel: 'DE' },
  ];
  const [selected, setSelected] = useState(baseLanguage);

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "auto",
          autoDisplay: false,
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
      const translateBar = document.querySelector(".skiptranslate");
      translateBar.style.display = "none";
      translateBar.style.visibility = "hidden";
      translateBar.style.height = "0px";
      translateBar.style.width = "0px";
      translateBar.style.overflow = "hidden";
      translateBar.style.position = "absolute";
      translateBar.style.left = "-9999px";
      translateBar.style.top = "-9999px";
    };
    if (hasCookie("googtrans")) {
      setSelected(getCookie("googtrans"));
    } else {
      setSelected(baseLanguage);
    }
    let addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const langChange = (value) => {
    if (value == baseLanguage) {
      setCookie("googtrans", "", { path: "/", domain: ".croonus.com" });
      setCookie("googtrans", "", { path: "/" });
      setSelected(value);
    } else {
      setCookie("googtrans", `${value}`, { path: "/", domain: ".croonus.com" });
      setCookie("googtrans", `${value}`, { path: "/" });
      setSelected(value);
    }
    window.location.reload();
  };

  return (
    <>
      <div
        id="google_translate_element"
        style={{
          width: "0px",
          height: "0px",
          position: "absolute",
          left: "50%",
          zIndex: -99999,
        }}
      ></div>{" "}
      <div className="notranslate flex items-center gap-5">
        <select
          className=" h-8 rounded-lg border-none text-sm font-bold uppercase text-black focus:ring-0 cursor-pointer"
          onChange={(e) => langChange(e.target.value)}
        >
          <option className=''>{selected?.split('/')[selected?.split('/').length - 1] || 'SRB'}</option>
          {languages.map((language) => (
            <option
              key={language.value}
              onChange={() => langChange(language.value)}
              value={language.value}
            >
              {language.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Translate;
