"use client";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MyTable from "./MyTable";
import page from "./agent-details-review/page";
import { compileFunction } from "vm";
import { useSearchParams } from "next/navigation";
import Emojis from "../../../components/emojis";
import ContextProvider from "@/components/context";
import CarDetails from './CarDetails';

export default function RootLayout({ children }) {
  // TODO: LORS DE L'INTEGRATION TRANFERER L'ID DU CHAUFFEUR PAR PARAMETRE GET EN UTILISANT L'ATTRIBUT "driverId" en GET
  // TODO: ACTUALISER LES ADRESSES DES SERVEURS AINSI QUE LES PATHS LORS DE L'INTEGRATION
  //const searchParams = useSearchParams();
  const driverId = "797d6b41-5b9a-41ba-93d3-4a56418e4294";
  console.log("=======================", driverId);
  let DRIVER_SERVICE_URL = "http://localhost:8086";
  let SEARCH_SERVICE_URL = "http://localhost:8086";
  const DRIVER_DISPONIBILITY_PATH = "/get-driver-disponibilities";
  const DRIVER_DATA_PATH = "/get-driver-data";
  const AVERAGE_RATING_PATH = "http://localhost:8000/api/reviews/driver/rating";

  const [refresh, setRefresh] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [nbReviews, setNbReviews] = useState(0);

  const [iconsNumber, setIconsNumber] = useState({
    hearts: 2,
    handUp: 1,
    handDown: 1,
    angry: 0,
  });

  let [driverData, setDriverData] = useState({
    driverPicture: "/img/chauffeur.png",
    driverName: "Christian",
    driverNumber: "6********",
    driverLocation: "Melen Yaounde",
    driverMail: "***@gmail.com",
    formationChauffeur: " 1990 Permis B à AUTO-ECOLE KASAP",
    ExperienceProfessionnelle:
      "De mars 2018 à juin 2020: conducteur indépendant",
    Description:
      "Je suis Christan, un chauffeur professionnel expérimenté qui s'engage à offrir un service de transport de qualité supérieure. Avec de nombreuses années d'expérience dans ce domaine, j'ai acquis des compétences de conduite avancées et une connaissance approfondie des routes de la région. Je suis reconnu pour mon excellent sens de l'orientation et ma capacité à naviguer avec aisance dans la circulation, en optimisant les itinéraires pour offrir à mes passagers des trajets rapides et sans encombre. Mes passagers apprécient ma conduite sûre et prudente, qui leur permet de voyager en toute tranquillité d'esprit. Au-delà de mes compétences de conduite, je me démarque par mon service attentionné et ma personnalité chaleureuse. J'accueille chaleureusement mes clients, je veille à leurs besoins et je m'engage à faire de chaque trajet une expérience agréable. Mes passagers me décrivent souvent comme un conducteur fiable, courtois et soucieux du bien-être de tous. Que ce soit pour un déplacement professionnel, un rendez-vous important ou un transport de loisir, je suis le choix idéal pour offrir un service de transport de qualité, en toute sécurité et dans une ambiance agréable.",
  });

  let [tableData, setTableData] = useState([
    { Jour: "28/06/2024", HeureDebut: "08h00", HeureFin: "18h00" },
    { Jour: "29/06/2024", HeureDebut: "08h00", HeureFin: "18h00" },
    { Jour: "30/06/2024", HeureDebut: "12h00", HeureFin: "02h00" },
    { Jour: "01/07/2024", HeureDebut: "08h00", HeureFin: "18h00" },
  ]);
  let [disponible, setDisponible] = useState(true); /*Cette variable permet de présenter les disponibilités du chauffeur lorsqu'il est disponible*/
  let [voiture_disponible, setVoiture_disponible] = useState(true); /*Cette variable permet de présenter le véhicule du chauffeur lorsqu'il en a un ou lorsque son véhicule est disponible*/
  /*Ce if est là pour rendre la voiture indisponible lorsque le chauffeur ne l'es pas*/ 
  if(disponible==false){
    voiture_disponible=false;
  }

  /* useEffect(() => {
    axios.get(SEARCH_SERVICE_URL+DRIVER_DISPONIBILITY_PATH+"?driverId="+driverId)
    .then(response => {
      if(response.data.length == 0){
        setDisponible(false)
      }else{
        setDisponible(true)
        setTableData(response.data)
      }
    }).catch(error => console.error(error))

    axios.get(DRIVER_SERVICE_URL+DRIVER_DATA_PATH+"?driverId="+driverId)
    .then(response =>{
      setDriverData(response.data)
    }).catch(error => console.error(error))

  }, []); */

  /* useEffect(() => {
    const interval = setInterval(() => {
      setRefresh((prevRefresh) => !prevRefresh);
    }, 1000);

    return () => clearInterval(interval);
  }, []); */

 

  useEffect(() => {
    const fetchIconsNumber = async () => {
      try {
        console.log("Dans le fetch..............................");
        const response = await axios.get(AVERAGE_RATING_PATH + "/" + driverId);
        if (response.data !== null) {
          console.log("response for average_rating_get", response.data);
          setAverageRating(response.data.averageRating);
          setNbReviews(response.data.totalReviews);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'average rating :",
          error
        );
      }
    };
    fetchIconsNumber();
  }, [refresh]);
  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <div className="container max-w-[1600px]">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 xl:col-span-4">
            <div className="bg-white rounded-2xl p-3 sm:p-4 lg:py-8 lg:px-6 mb-6">
              <div className="w-32 h-32 border ovenflow-hidden border-[var(--primary)] rounded-full bg-white p-4 grid place-content-center relative mx-auto mb-10">
                <Image
                  width={130}
                  height={130}
                  //TODO: decommenter la ligne de img lorsque le connexion au back du driver service sera fonctionnelle
                  //src={`${DRIVER_SERVICE_URL}/uploads/${driverData.driverPicture}`}
                  src={driverData.driverPicture}
                  alt="image"
                  className="rounded-full w-full h-full"
                />
              </div>
              <h4 className="text-center text-2xl font-semibold mb-4">
                Mr {driverData.driverName}
              </h4>
              <ul className="flex items-center justify-center flex-wrap mb-7">
                <li>
                  <p className="mb-0">
                    Contact:{" "}
                    <span className="text-primary">
                      {" "}
                      {driverData.driverNumber} | {driverData.driverLocation}{" "}
                    </span>
                  </p>
                </li>
              </ul>
              <ul className="flex items-center justify-center flex-wrap mb-7">
                <li>
                  <p className="mb-0">
                    Mail:{" "}
                    <span className="text-primary">
                      {driverData.driverMail}
                    </span>
                  </p>
                </li>
                <div className="flex min-w-full justify-evenly my-3">
                  <div className="flex items-center mr-3">
                    <span className="mr-1 text-2xl">
                      {averageRating.toFixed(1)}
                    </span>{" "}
                    <StarIcon className="w-6 h-6 text-[var(--tertiary)]" />
                    <span className="ml-2 pt-2 text-gray-500 text-s"> {nbReviews} avis</span>{" "}
                  </div>
                  <Emojis />
                </div>
                <li className="flex gap-4">
                  {disponible ? (
                    <div className="flex gap-4">
                      <Link
                        href="#"
                        className="inline-flex items-center gap-2 p-2 rounded-full bg-[#2D3A96] text-white :bg-primary-400 hover:text-white font-medium mt-2"
                      >
                        <span className="inline-block"> Contacter </span>
                      </Link>
                      <div
                        href="#"
                        className="inline-flex items-center gap-2 p-2 rounded-full bg-[#2AC144] text-white :bg-primary-400 hover:text-white font-medium mt-2"
                      >
                        <span className="inline-block"> Disponible </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      href="#"
                      className="inline-flex items-center gap-2 p-2 rounded-full bg-[#F84800] text-white :bg-primary-400 hover:text-white font-medium mt-2"
                    >
                      <span className="inline-block"> Indisponible </span>
                    </div>
                  )}
                </li>
              </ul>

              <div className="border border-dashed my-7"></div>
              <ul className="flex flex-col gap-4 mb-10 max-text-30 mx-auto">
                {disponible && (
                  <>
                    <li>
                      <div className="items-center gap-2 overflow-x-auto">
                        <MyTable
                          className="min-w-[500px]"
                          tableData={tableData}
                        />
                      </div>
                    </li>
                    <div className="border border-dashed my-2"></div>
                  </>
                )}

                <li>
                  <div className="items-center gap-2">
                    {/* <CalendarDaysIcon className="w-5 h-5 text-primary" /> */}
                    <div className="block text-1xl font-semibold clr-neutral-600 mb-4">
                      Formation
                    </div>
                    <div className="mb-0">{driverData.formationChauffeur}</div>
                  </div>
                </li>
                <div className="border border-dashed my-2"></div>
                <li>
                  <div className="items-center gap-2">
                    {/* <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-[var(--secondary)]" />
                    <p className="mb-0"> Response rate - 100% </p> */}
                    <div className="block text-1xl font-semibold clr-neutral-600 mb-4">
                      Expérience professionelle
                    </div>
                    <div className="mb-0">
                      {driverData.ExperienceProfessionnelle}
                    </div>
                  </div>
                </li>
              </ul>

              <div className="border border-dashed my-2"></div>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Convivialité</p>
                  <p className="mb-0 font-medium">Excellent</p>
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Politesse</p>
                  <p className="mb-0 font-medium">Moyen</p>
                </li>
                <li className="flex items-center justify-between flex-wrap">
                  <p className="mb-0">Patience</p>
                  <p className="mb-0 font-medium">Excellent</p>
                </li>
              </ul>
              <div className="border border-dashed my-6"></div>
              <span className="block text-2xl font-semibold clr-neutral-600 mb-4">
                Details
              </span>
              <div className="mb-0">{driverData.Description}</div>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-8">
            {voiture_disponible && (
              <div className="p-3 bg-white rounded-2xl mb-8">
                <CarDetails/>
              </div>
            )}
            <div className="grid grid-cols-12 gap-4 align-items-start">
              <ContextProvider setRefresh={setRefresh} refresh={refresh}>
                {children}
              </ContextProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
