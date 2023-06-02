"use client";

import { useState, useRef, useEffect } from "react";
import { post } from "@/app/api/api";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("subscribe");
  const [selected, setSelected] = useState({
    email: "",
    day: "",
    month: "",
    type: "",
    terms: false,
  });
  const [error, setError] = useState(false);
  const handleSubmit = async () => {
    const terms = document.getElementById("terms");
    if (!terms.checked) {
      toast.warn("Morate prihvatiti Politiku privatnosti", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (selected?.email === "") {
        setError(true);
      }
      return;
    } else {
      const res = await post("/newsletter", selected).then(
        (response) => response?.payload
      );
      toast.success(res?.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSelected({ email: "", day: "", month: "", type: "", terms: false });
    }
  };
  return (
    <>
      {view === "subscribe" && (
        <div className="w-full max-md:w-[95%] max-md:mx-auto flex flex-col items-center justify-center max-md:mt-[3rem] max-md:text-center md:mt-[6.25rem]">
          <h1 className="max-md:text-[1.5rem] text-[2.5rem] font-bold">
            Ostvari 10% popusta
          </h1>
          <p className="text-[1rem] max-md:text-[0.85rem] font-normal mt-[1.15rem]">
            Prijavi se na naš bilten i dobićeš 10% popusta na sledeću kupovinu,
            pristup ekskluzivnim promocijama i još mnogo toga!
          </p>

          <form className="mt-[3.125rem] max-md:mt-[2rem] relative">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Unesi svoj email"
              className={`${
                error ? `border-red-500` : `border-[#e0e0e0]`
              } peer border placeholder-transparent w-full 2xl:w-[40.25rem] focus:border-[#e0e0e0] max-md:w-full focus:outline-none focus:ring-0 h-[3.625rem]  rounded-lg  text-[#d1d1d1]`}
              onChange={(e) => {
                setSelected({ ...selected, email: e.target.value });
              }}
              onClick={() => setOpen(!open)}
              value={selected?.email}
            ></input>
            <label
              htmlFor="email"
              className={` absolute left-[1.25rem] text-[#d1d1d1] text-base transition-all duration-300 peer-placeholder-shown:text-base  peer-placeholder-shown:top-4 peer-placeholder-shown:text-[#d1d1d1] peer-focus:-top-[0.6rem] peer-focus:bg-white  peer-focus:text-[#e0e0e0] peer-focus:px-1 peer-focus:text-sm`}
            >
              Unesite svoj email
            </label>
            <div className="overflow-hidden">
              <div
                className={
                  open
                    ? `max-w-[40.25rem] flex flex-col items-start mt-0 duration-[850ms] transition-all opacity-100`
                    : `max-w-[40.25rem] flex flex-col items-start -mt-[50rem] duration-[850ms] transition-all opacity-0`
                }
              >
                <h1 className="text-[1rem] max-md:mt-[2rem] max-md:text-[0.85rem] font-normal mt-[1.15rem]">
                  Tvoj rođendan (nije obavezno)
                </h1>
                <div className="flex flex-row w-full items-center gap-6 mt-[1.15rem]">
                  <div className="relative w-1/2">
                    <select
                      id="day"
                      name="day"
                      placeholder="Dan"
                      className="peer border placeholder:text-base w-full placeholder-transparent  focus:border-[#e0e0e0] focus:outline-none focus:ring-0 h-[3.625rem] border-[#e0e0e0] rounded-lg  text-black"
                      onChange={(e) => {
                        setSelected({ ...selected, day: e.target.value });
                      }}
                      value={selected?.day}
                    >
                      <option value="" disabled selected hidden></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>
                    <label
                      htmlFor="day"
                      className={`absolute ${
                        selected.day === ""
                          ? `left-[1.25rem] top-[1.2rem]`
                          : `-top-[0.6rem] left-[1.25rem] bg-white px-1`
                      } text-[#d1d1d1] text-base transition-all duration-300 peer-placeholder-shown:text-base  peer-placeholder-shown:top-10 peer-placeholder-shown:text-[#d1d1d1] peer-focus:-top-[0.6rem] peer-focus:bg-white  peer-focus:text-[#e0e0e0] peer-focus:px-1 peer-focus:text-sm`}
                    >
                      Dan{" "}
                    </label>
                  </div>
                  <div className="relative w-1/2">
                    <select
                      id="month"
                      name="month"
                      placeholder="Mesec"
                      className={`peer border w-full placeholder-transparent focus:border-[#e0e0e0] focus:outline-none focus:ring-0 h-[3.625rem] border-[#e0e0e0] rounded-lg  text-black`}
                      onChange={(e) => {
                        setSelected({ ...selected, month: e.target.value });
                      }}
                      value={selected?.month}
                    >
                      {" "}
                      <option value="" disabled selected hidden></option>
                      <option value="1">Januar</option>
                      <option value="2">Februar</option>
                      <option value="3">Mart</option>
                      <option value="4">April</option>
                      <option value="5">Maj</option>
                      <option value="6">Jun</option>
                      <option value="7">Jul</option>
                      <option value="8">Avgust</option>
                      <option value="9">Septembar</option>
                      <option value="10">Oktobar</option>
                      <option value="11">Novembar</option>
                      <option value="12">Decembar</option>
                    </select>
                    <label
                      htmlFor="month"
                      className={`${
                        selected.month === ""
                          ? `left-[1.25rem] top-[1.2rem]`
                          : `-top-[0.6rem] left-[1.25rem] bg-white px-1`
                      } absolute  text-[#d1d1d1] text-base transition-all duration-300 peer-placeholder-shown:text-base  peer-placeholder-shown:top-10 peer-placeholder-shown:text-[#d1d1d1] peer-focus:-top-[0.6rem] peer-focus:bg-white  peer-focus:text-[#e0e0e0] peer-focus:px-1 peer-focus:text-sm`}
                    >
                      Mesec{" "}
                    </label>
                  </div>
                </div>
                <div className="flex items-center max-md:flex-col justify-between w-full flex-row mt-5 max-md:text-center">
                  <h1 className="text-[1rem] font-normal">
                    Želiš da se pretplatiš na bilten za:
                  </h1>
                  <div className="flex flex-row max-md:self-center self-end md:ml-auto max-md:mt-4 items-center gap-6">
                    <button
                      className={`${
                        selected.type === "zene"
                          ? `border-black  border font-medium text-black`
                          : `text-[#d1d1d1]`
                      } rounded-3xl px-10 py-2 w-[150px] border-[#e0e0e0] border  flex items-center justify-center`}
                      value={selected.type}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected({ ...selected, type: "zene" });
                      }}
                    >
                      Žene
                    </button>
                    <button
                      className={`${
                        selected.type === "muskarci"
                          ? `border-black border font-medium text-black`
                          : `text-[#d1d1d1]`
                      } rounded-3xl px-10 py-2 border-[#e0e0e0] border flex items-center justify-center `}
                      value={selected.type}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected({ ...selected, type: "muskarci" });
                      }}
                    >
                      Muškarci
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded text-green-500 focus:outline-none focus:ring-0"
                    required
                    value={selected.terms}
                    onChange={(e) => {
                      setSelected({ ...selected, terms: true });
                    }}
                    checked={selected.terms}
                  />
                  <label htmlFor="terms" className="text-black text-xs">
                    Pročitana je i prihvaćena Politika privatnosti i želim da
                    primam vesti, obaveštenja i promocije od Pazari Shop.
                  </label>
                </div>
                <div className="self-center flex flex-col justify-self-center mx-auto mt-7">
                  <button
                    className="bg-[#191919] px-5 py-2 text-white uppercase hover:bg-opacity-80 transition-all duration-300 rounded"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Pretplati me
                  </button>
                  <button
                    className="mt-10 text-sm font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      setView("unsubscribe");
                    }}
                  >
                    Želim da otkažem pretplatu na bilten
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {view === "unsubscribe" && (
        <div className="w-full max-md:text-center flex flex-col items-center justify-center mt-[6.25rem]">
          {" "}
          <h1 className="text-[2.5rem] max-md:text-[1.7rem] max-md:text-center font-semibold">
            Želim da otkažem pretplatu na bilten
          </h1>
          <h2 className="text-[1rem] max-md:text-[0.85rem] font-normal mt-5">
            Navedi email na koji želiš da prestaneš da primaš naš bilten.
          </h2>
          <form className="mt-[3.125rem]  relative flex flex-col">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Unesi svoj email"
              className={` peer border placeholder-transparent max-2xl:w-full 2xl:w-[38.25rem] focus:border-[#e0e0e0] focus:outline-none focus:ring-0 h-[3.625rem]  rounded-lg border-[#e0e0e0] text-[#d1d1d1]`}
            ></input>
            <label
              htmlFor="email"
              className="absolute left-[1.25rem] text-[#d1d1d1] text-sm transition-all duration-300 peer-placeholder-shown:text-base  peer-placeholder-shown:top-4 peer-placeholder-shown:text-[#d1d1d1] peer-focus:-top-[0.6rem] peer-focus:bg-white  peer-focus:text-[#e0e0e0] peer-focus:px-1 peer-focus:text-sm"
            >
              Unesite svoj email
            </label>
            <button
              className="bg-[#191919] max-md:w-full min-[1537px]:w-1/2 mx-auto mt-6 px-5 py-2 text-white uppercase hover:bg-opacity-80 transition-all duration-300 rounded"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Želim da otkažem pretplatu{" "}
            </button>
            <button
              className="mt-10 text-sm font-semibold"
              onClick={(e) => {
                e.preventDefault();
                setView("subscribe");
              }}
            >
              Želim da se pretplatim na bilten
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Newsletter;
