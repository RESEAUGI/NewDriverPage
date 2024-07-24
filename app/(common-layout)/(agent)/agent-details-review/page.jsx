"use client";
import Link from "next/link";
import { comments } from "../layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewModal from "../../../../components/ReviewModal";
import Review from "../../../../components/Review";
import { v4 as uuidv4 } from "uuid";
import { randomUUID } from "crypto";
import { useContextProvider } from "@/components/context";

const driverId = "797d6b41-5b9a-41ba-93d3-4a56418e4294";
const userId = "b21ccd75-5be8-4129-bd14-f4837b935fa3";
const reservationId = uuidv4();
const userName = "Gerard";

export default function page() {
  // TODO: ACTUALISER LES ADRESSES DES SERVEURS AINSI QUE LES PATHS LORS DE L'INTEGRATION
  let REVIEW_SERVICE_URL = "http://localhost:8000";
  let DRIVER_COMMENTS_PATH = "/reviews";

  const {reload,setReload} = useContextProvider();

  const [comments, setcomments] = useState([
    {
      reviewId: uuidv4(),
      userId: uuidv4(),
      driverId: uuidv4(),
      reservationId: uuidv4(),
      userName: "William",
      comment:
        "Excellent chauffeur ! Christian était très professionnel et ponctuel. J'ai passé un trajet très agréable avec lui. Je le recommande vivement !",
      createdAt: "23/10/2024",
      updatedAt: "18h15",
      note: 3,
      likes: 3,
      dislikes: 4,
    },
    {
      reviewId: uuidv4(),
      userId: uuidv4(),
      driverId: uuidv4(),
      reservationId: uuidv4(),
      userName: "Lushai",
      comment:
        "Christian était un chauffeur sympathique et courtois. Il a pris le temps de discuter pendant le trajet et m'a fait me sentir à l'aise. Je le choisirai à nouveau pour mes prochains déplacements.",
      createdAt: "23/10/2024",
      updatedAt: "18h15",
      note: 5,
      likes: 10,
      dislikes: 1,
    },
  ]);

  useEffect(() => {
    console.log("tryyyyyyyyyyy1");
    const fetchData = async () => {
      console.log("tryyyyyyyyyyy");
      try {
        const response = await fetch(
          `${REVIEW_SERVICE_URL}/api/reviews/driver/${driverId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Try fetch");
        if (!response.ok) {
          console.error(
            "Response error:",
            response.status,
            response.statusText
          );
          const errorData = await response.json();
          console.error("Error data:", errorData);
          throw new Error(`Network response was not ok (${response.status})`);
        }

        const reviews = await response.json();
        setcomments([...reviews]);
        // Traiter les reviews retournées par le serveur
      } catch (error) {
        console.error("Error getting reviews:", error);
        // Gérer l'erreur
      }
    };
    fetchData();
  }, [reload]);
  console.log(comments.length);
  console.log("Reviews:", comments);

  return (
    <div className="col-span-12">
      <div className="p-3 bg-white rounded-2xl mb-8">
        <div className="bg-white rounded-2xl">
          {comments.map((comment, index) => {
            return <Review comment={comment} key={index} index={index} />;
          })}

          <ReviewModal
            userId={userId.toString()}
            driverId={driverId.toString()}
            reservationId={reservationId.toString()}
            userName={userName}
          />
        </div>
      </div>
    </div>
  );
}

